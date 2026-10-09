// Curriculum skeleton. Node files push into window.ROADMAP_NODES.
window.ROADMAP_PHASES = [
  { id: 0, title: 'Setup & Programming', tag: 'Foundations', color: '#007aff' },
  { id: 1, title: 'Mathematics', tag: 'Foundations', color: '#5856d6' },
  { id: 2, title: 'Data Wrangling', tag: 'Core', color: '#30b0c7' },
  { id: 3, title: 'Classical ML', tag: 'Core', color: '#34c759' },
  { id: 4, title: 'Deep Learning', tag: 'Advanced', color: '#ff9500' },
  { id: 5, title: 'Specializations', tag: 'Advanced', color: '#ff2d55' },
  { id: 6, title: 'ML Engineering', tag: 'Professional', color: '#af52de' },
  { id: 7, title: 'Mastery', tag: 'Master', color: '#a2845e' },
];
window.ROADMAP_NODES = [];
// r(title, url, type, note) -> resource. Types: video, course, book, docs, practice, article, tool
window.r = (title, url, type, note) => ({ title, url, type, note: note || '' });
