// Zero-dependency local server for the AI/ML Roadmap.
// Serves ./public and persists progress to ./data/progress.json
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 4747;
const HOST = '127.0.0.1';
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const PROGRESS = path.join(DATA_DIR, 'progress.json');
const MAX_BACKUPS = 30;
const MAX_BODY = 20 * 1024 * 1024;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

fs.mkdirSync(BACKUP_DIR, { recursive: true });

function localDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function backupIfNeeded() {
  if (!fs.existsSync(PROGRESS)) return;
  const target = path.join(BACKUP_DIR, `progress-${localDate()}.json`);
  if (fs.existsSync(target)) return;
  fs.copyFileSync(PROGRESS, target);
  const files = fs.readdirSync(BACKUP_DIR).filter((f) => f.startsWith('progress-')).sort();
  while (files.length > MAX_BACKUPS) fs.unlinkSync(path.join(BACKUP_DIR, files.shift()));
}

function writeProgress(json) {
  backupIfNeeded();
  const tmp = PROGRESS + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(json, null, 2));
  fs.renameSync(tmp, PROGRESS);
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

function handleApi(req, res) {
  if (req.method === 'GET') {
    if (!fs.existsSync(PROGRESS)) return send(res, 200, 'null');
    return send(res, 200, fs.readFileSync(PROGRESS));
  }
  if (req.method === 'PUT' || req.method === 'POST') {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try {
        const json = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (!json || typeof json !== 'object' || json.version == null) throw new Error('invalid progress');
        writeProgress(json);
        send(res, 200, JSON.stringify({ ok: true, savedAt: new Date().toISOString() }));
      } catch (e) {
        send(res, 400, JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }
  send(res, 405, JSON.stringify({ error: 'method not allowed' }));
}

function handleStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (urlPath === '/') urlPath = '/index.html';
  const file = path.normalize(path.join(PUBLIC, urlPath));
  if (!file.startsWith(PUBLIC)) return send(res, 403, 'forbidden', 'text/plain');
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'not found', 'text/plain');
    send(res, 200, data, MIME[path.extname(file)] || 'application/octet-stream');
  });
}

http
  .createServer((req, res) => {
    if (req.url.startsWith('/api/progress')) return handleApi(req, res);
    handleStatic(req, res);
  })
  .listen(PORT, HOST, () => {
    console.log(`\n  AI/ML Roadmap running at http://${HOST}:${PORT}`);
    console.log(`  Progress file: ${PROGRESS}\n  Press Ctrl+C to stop.\n`);
  })
  .on('error', (e) => {
    if (e.code === 'EADDRINUSE') console.log(`Port ${PORT} already in use — the app is probably already running: http://${HOST}:${PORT}`);
    else console.error(e);
    process.exit(1);
  });
