// Verifies every resource URL in the roadmap responds. Usage: node scripts/check-links.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataDir = path.join(__dirname, '..', 'public', 'js', 'data');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['phases.js', 'nodes-foundations.js', 'nodes-core.js', 'nodes-advanced.js', 'alternatives.js']) {
  // Data files reference globals both as window.X and bare X
  const src = fs.readFileSync(path.join(dataDir, f), 'utf8');
  vm.runInContext(src + '\n;Object.assign(this, window);', ctx);
}
const nodes = ctx.window.ROADMAP_NODES;
const links = [];
const alts = ctx.window.ROADMAP_ALTERNATIVES || {};
for (const n of nodes) for (const res of n.resources) links.push({ node: n.id, ...res });
for (const [id, list] of Object.entries(alts)) {
  if (!nodes.some((n) => n.id === id)) console.log(`Unknown node in alternatives.js: ${id}`);
  for (const res of list) links.push({ node: `${id} (alt)`, ...res });
}
const unique = [...new Map(links.map((l) => [l.url, l])).values()];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

async function check(url) {
  // YouTube always returns 200, so use oEmbed to verify videos/playlists exist
  const isYT = /youtube\.com\/(watch|playlist)/.test(url);
  const target = isYT ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}` : url;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(target, { redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } });
    // oEmbed 401 = video exists but embedding is disabled
    if (isYT && res.status === 401) return { status: 200, final: url };
    const title = isYT && res.ok ? (await res.json()).title : undefined;
    return { status: res.status, final: res.url, title };
  } catch (e) {
    return { status: 0, error: e.cause?.code || e.name };
  } finally {
    clearTimeout(t);
  }
}

(async () => {
  const results = [];
  const queue = [...unique];
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const l = queue.shift();
      results.push({ ...l, ...(await check(l.url)) });
    }
  }));
  // 403/429 are usually bot protection (Coursera, Kaggle, Medium) rather than dead links
  const bad = results.filter((r) => r.status === 0 || (r.status >= 400 && ![403, 429].includes(r.status)));
  const soft = results.filter((r) => [403, 429].includes(r.status));
  // --titles: show what each YouTube link actually points to, to catch right-ID-wrong-video mistakes
  if (process.argv.includes('--titles')) for (const r of results.filter((r) => r.title)) console.log(`  ${r.title.padEnd(60)} ← listed as "${r.title === undefined ? '' : r.node + ': ' + links.find((l) => l.url === r.url).title}"`);
  console.log(`Checked ${results.length} unique URLs across ${nodes.length} nodes.`);
  if (soft.length) console.log(`\nBlocked by bot protection (verify manually):\n` + soft.map((r) => `  ${r.status}  ${r.url}`).join('\n'));
  if (bad.length) {
    console.log(`\nBROKEN:\n` + bad.map((r) => `  ${r.status || r.error}  [${r.node}] ${r.url}`).join('\n'));
    process.exit(1);
  }
  console.log('\nAll links OK.');
})();
