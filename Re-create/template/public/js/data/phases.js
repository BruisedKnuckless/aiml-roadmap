// PLACEHOLDER CURRICULUM — replace everything in public/js/data/ with the real topic.
// Format and quality rules: Re-create/03-ARCHITECTURE.md and 04-CURRICULUM-AUTHORING.md.
// Phase colours (keep this order): #007aff #5856d6 #30b0c7 #34c759 #ff9500 #ff2d55 #af52de #a2845e
window.ROADMAP_PHASES = [
  { id: 0, title: 'Setup & Foundations', tag: 'Foundations', color: '#007aff' },
  { id: 1, title: 'Core Skills', tag: 'Core', color: '#5856d6' },
];
window.ROADMAP_NODES = [];
// r(title, url, type, note) -> resource. Types: video, course, book, docs, practice, article, tool
window.r = (title, url, type, note) => ({ title, url, type, note: note || '' });
