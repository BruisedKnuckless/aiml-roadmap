// PLACEHOLDER — sample nodes showing the format. Replace with the real curriculum.
ROADMAP_NODES.push(
  {
    id: 'example-setup', phase: 0, title: 'Example: Dev Setup', hours: 10, prereqs: [],
    summary: 'Sample node. Replace with the first real node of your topic (environment setup).',
    why: 'Explains why this node matters for the learner\'s career.',
    subtopics: ['Terminal', 'Package manager', 'Editor'],
    guide: [
      'Step 1: name the exact resource and the sections to do.',
      'Step 2: a hands-on step.',
      'Step 3: a consolidation step.',
    ],
    resources: [
      r('The Missing Semester of Your CS Education (MIT)', 'https://missing.csail.mit.edu/', 'course', 'Example resource'),
      r('Pro Git book (free)', 'https://git-scm.com/book/en/v2', 'book'),
    ],
    checklist: [
      'A concrete task of ~45–120 minutes',
      'Another concrete, checkable task',
      'A small hands-on build task',
    ],
    project: 'One portfolio-worthy deliverable with clear scope.',
    mastery: ['A self-test question?', 'Another one?', 'A third one?'],
  },
  {
    id: 'example-language', phase: 0, title: 'Example: Core Language', hours: 20, prereqs: ['example-setup'],
    summary: 'Sample node.', why: 'Sample why.',
    subtopics: ['Syntax', 'Functions', 'Data structures'],
    guide: ['Sample step.'],
    resources: [r('The Python Tutorial (official)', 'https://docs.python.org/3/tutorial/', 'docs')],
    checklist: ['Sample task 1', 'Sample task 2'],
    project: 'Sample project.',
    mastery: ['Sample question?'],
  },
);
