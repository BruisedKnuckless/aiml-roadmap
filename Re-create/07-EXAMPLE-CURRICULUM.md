# 07 · Example curriculum (AI/ML) — the quality bar

The full, link-verified AI/ML curriculum (45 nodes, 8 phases, ~1,250 hours, 240+ resources, 130+ alternatives) is in `example-curriculum/`. This excerpt shows the expected **format and depth**. Match it for any new topic: exact course sections, concrete checklist items, a real project, probing self-test questions, honest notes ("Free to audit", "PDF").

## `phases.js` (all 8 phases)

````js
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
````

## `nodes-foundations.js` (first 3 nodes of phase 0)

````js
// Phases 0–2: Setup & Programming, Mathematics, Data Wrangling
ROADMAP_NODES.push(
  // ───────────────────────── PHASE 0 ─────────────────────────
  {
    id: 'mac-setup', phase: 0, title: 'Mac Dev Setup & Command Line', hours: 10, prereqs: [],
    summary: 'Turn your Mac into a working ML machine: terminal fluency, a package manager, an editor, and isolated Python environments.',
    why: 'Every later step assumes you can install tools, navigate the filesystem, and run scripts without friction. An hour lost to setup every week compounds into months.',
    subtopics: ['Terminal & zsh', 'Homebrew', 'VS Code', 'Python envs (uv/venv)', 'Jupyter'],
    guide: [
      'Do Missing Semester (2026) lecture 1, "Course Overview + Introduction to the Shell", following along in Terminal.app — type every command yourself.',
      'Install Homebrew from brew.sh, then `brew install python git` and confirm with `python3 --version`.',
      'Install VS Code + the Python and Jupyter extensions; open a folder, create a .py file, run it with the play button.',
      'Learn environments: create one with `python3 -m venv .venv` (or `uv venv`), activate it, pip-install numpy, deactivate.',
      'Install JupyterLab inside an environment and run a notebook. Learn when to use notebooks (exploration) vs scripts (reusable code).',
    ],
    resources: [
      r('The Missing Semester of Your CS Education (MIT)', 'https://missing.csail.mit.edu/', 'course', '2026 edition · lectures 1–3: the shell, command-line environment, development environment & tools'),
      r('Homebrew', 'https://brew.sh/', 'tool', 'macOS package manager'),
      r('VS Code: Python tutorial', 'https://code.visualstudio.com/docs/python/python-tutorial', 'docs'),
      r('Python venv documentation', 'https://docs.python.org/3/library/venv.html', 'docs'),
      r('uv — fast Python package & env manager', 'https://docs.astral.sh/uv/', 'docs', 'Modern alternative to pip+venv'),
      r('JupyterLab docs', 'https://jupyterlab.readthedocs.io/en/latest/', 'docs'),
    ],
    checklist: [
      'Missing Semester lecture 1 (Introduction to the Shell) + its exercises',
      'Practice: cd, ls -la, pwd, mkdir, mv, cp, rm, cat, less, grep, find, | pipes, > redirects',
      'Install Homebrew, Python 3 and Git via brew',
      'Install VS Code + Python, Jupyter, and Pylance extensions',
      'Create, activate and delete a virtual environment; install a package into it',
      'Install JupyterLab in an env and run a notebook with a markdown + code cell',
      'Write a shell alias in ~/.zshrc (e.g. `alias ll="ls -la"`) and reload the shell',
      'Create a ~/code folder structure you will keep for the whole journey',
    ],
    project: 'Write a `setup.sh` script that creates a project folder, a virtual environment, installs numpy/pandas/jupyter, and prints the versions. Run it from scratch to prove it works.',
    mastery: ['What is the difference between a global Python install and a virtual environment?', 'What do `|`, `>` and `>>` do in a shell?', 'How do you find which python binary is active?'],
  },
  {
    id: 'git', phase: 0, title: 'Git & GitHub', hours: 10, prereqs: ['mac-setup'],
    summary: 'Version control for every line of code and every notebook you write from here on. Your GitHub becomes your public portfolio.',
    why: 'Recruiters look at GitHub. Teams expect branches, PRs, and clean history. You also need it to clone course code and contribute to open source.',
    subtopics: ['commit / branch / merge', 'remotes & push', 'Pull requests', '.gitignore', 'Conflicts'],
    guide: [
      'Read Pro Git chapters 1–3 (Getting Started, Basics, Branching).',
      'Play Learn Git Branching levels "Introduction Sequence" and "Ramping Up" to visualise branches.',
      'Create a GitHub account, set up SSH keys, push your first repo.',
      'Do the GitHub Skills "Introduction to GitHub" course to practice PRs.',
      'From now on: one repo per project, commit small and often, write meaningful messages.',
    ],
    resources: [
      r('Pro Git book (free)', 'https://git-scm.com/book/en/v2', 'book', 'Chapters 1–3 are essential'),
      r('Learn Git Branching (interactive)', 'https://learngitbranching.js.org/', 'practice'),
      r('GitHub Skills: Introduction to GitHub', 'https://github.com/skills/introduction-to-github', 'course', 'Hands-on course that runs inside a GitHub repo'),
      r('Missing Semester: Version Control and Git', 'https://missing.csail.mit.edu/2026/version-control/', 'video', '2026 lecture + notes'),
      r('GitHub: Connecting with SSH', 'https://docs.github.com/en/authentication/connecting-to-github-with-ssh', 'docs'),
    ],
    checklist: [
      'Read Pro Git ch.1–2 and configure user.name / user.email',
      'Read Pro Git ch.3 (Branching)',
      'Complete Learn Git Branching: Introduction Sequence',
      'Complete Learn Git Branching: Ramping Up + Push & Pull remote levels',
      'Create GitHub account, add an SSH key, push a repo',
      'Create a branch, open a PR, merge it on GitHub',
      'Deliberately create and resolve a merge conflict',
      'Write a Python .gitignore (venv, __pycache__, .ipynb_checkpoints, data/)',
      'Write a profile README.md on GitHub',
    ],
    project: 'Create a public `ml-journey` repo. Add a README with your roadmap, and commit your notes/code from every node into it as you go.',
    mastery: ['What is the difference between `git fetch` and `git pull`?', 'When would you rebase instead of merge?', 'How do you undo the last commit but keep the changes?'],
  },
  {
    id: 'python-basics', phase: 0, title: 'Python Fundamentals', hours: 45, prereqs: ['mac-setup'],
    summary: 'Core Python: variables, types, control flow, functions, data structures, files, exceptions and modules.',
    why: 'Python is the language of ML. Fluency here means you think about the model, not the syntax.',
    subtopics: ['Types & control flow', 'Functions', 'Lists / dicts / sets', 'Files & exceptions', 'Modules & pip'],
    guide: [
      'Work through Harvard CS50P lectures 0–4 (Functions, Conditionals, Loops, Exceptions, Libraries). Do every problem set.',
      'Use the official Python tutorial as a reference for anything unclear (sections 3–8).',
      'Do Exercism Python track exercises daily (aim for 2–3 per day) to build muscle memory.',
      'Continue CS50P lectures 5–8 (Unit tests, File I/O, Regex, OOP intro).',
      'Automate one boring task of your own with Automate the Boring Stuff techniques.',
    ],
    resources: [
      r('CS50P: Introduction to Programming with Python (Harvard)', 'https://cs50.harvard.edu/python/', 'course', 'Best structured free Python course'),
      r('The Python Tutorial (official)', 'https://docs.python.org/3/tutorial/', 'docs'),
      r('Automate the Boring Stuff with Python', 'https://automatetheboringstuff.com/', 'book', 'Free online'),
      r('Exercism Python track', 'https://exercism.org/tracks/python', 'practice', 'Free mentored exercises'),
      r('Corey Schafer — Python tutorials', 'https://www.youtube.com/@coreyms', 'video'),
    ],
    checklist: [
      'CS50P Lecture 0 (Functions, Variables) + problem set',
      'CS50P Lecture 1 (Conditionals) + problem set',
      'CS50P Lecture 2 (Loops) + problem set',
      'CS50P Lecture 3 (Exceptions) + problem set',
      'CS50P Lecture 4 (Libraries) + problem set',
      'CS50P Lecture 5 (Unit Tests) + problem set',
      'CS50P Lecture 6 (File I/O) + problem set',
      'CS50P Lecture 7 (Regular Expressions) + problem set',
      'Master list/dict/set comprehensions — write 10 of your own',
      'Solve 15 Exercism Python exercises',
      'Read & write CSV and JSON files with the standard library',
      'Write a script that uses argparse to take command-line arguments',
    ],
    project: 'Build a command-line expense tracker: add/list/delete expenses stored in a JSON file, monthly summary by category, with unit tests.',
    mastery: ['Mutable vs immutable types — give two examples of each', 'What does `*args, **kwargs` do?', 'When is a dict lookup O(1) and why?'],
  }
);
````

## `alternatives.js` (excerpt)

````js
window.ROADMAP_ALTERNATIVES = {
  'mac-setup': [
    r('The Linux Command Line (William Shotts)', 'https://linuxcommand.org/tlcl.php', 'book', 'Free book · works for macOS zsh too'),
    r('Apple: Terminal User Guide', 'https://support.apple.com/guide/terminal/welcome/mac', 'docs'),
    r('Missing Semester 2020: The Shell', 'https://missing.csail.mit.edu/2020/course-shell/', 'article', 'Older edition, excellent written notes'),
  ],
  'git': [
    r('Atlassian Git tutorials', 'https://www.atlassian.com/git/tutorials', 'article', 'Written, beginner → advanced'),
    r('GitHub Docs: Getting started with Git', 'https://docs.github.com/en/get-started/getting-started-with-git', 'docs'),
    r('Oh Shit, Git!?! — fixing common mistakes', 'https://ohshitgit.com/', 'article'),
  ],
  'python-basics': [
    r('Think Python, 3rd ed. (Allen Downey)', 'https://allendowney.github.io/ThinkPython/', 'book', 'Free online, runs in notebooks'),
    r('Python for Everybody (Dr. Chuck)', 'https://www.py4e.com/', 'course', 'Book + videos + exercises'),
    r('Google\'s Python Class', 'https://developers.google.com/edu/python', 'course', 'Written lessons + exercises'),
  ],
  // …every node has 2–4 entries
};
````

## Phase/node list of the full AI/ML roadmap (for structure reference)

- **Phase 0 · Setup & Programming** — Mac Dev Setup & Command Line (10h) · Git & GitHub (10h; needs mac-setup) · Python Fundamentals (45h; needs mac-setup) · Python: OOP, Testing & Packaging (25h; needs python-basics) · Data Structures & Algorithms (40h; needs python-basics)
- **Phase 1 · Mathematics** — Linear Algebra (45h; needs python-basics) · Calculus & Gradients (30h; needs python-basics) · Probability & Statistics (45h; needs python-basics) · Optimization & Information Theory (20h; needs linear-algebra, calculus, prob-stats)
- **Phase 2 · Data Wrangling** — NumPy & Vectorized Thinking (15h; needs python-intermediate, linear-algebra) · Pandas & Data Manipulation (25h; needs numpy) · Data Visualization (12h; needs pandas) · SQL for Data Science (18h; needs python-basics) · Exploratory Data Analysis (15h; needs pandas, dataviz, prob-stats)
- **Phase 3 · Classical ML** — ML Foundations (40h; needs numpy, pandas, math-ml) · Regression & Classification (25h; needs ml-foundations) · kNN, SVM & Naive Bayes (15h; needs linear-models) · Trees, Random Forests & Boosting (30h; needs linear-models) · Unsupervised Learning (20h; needs ml-foundations) · Evaluation, Validation & Feature Engineering (20h; needs linear-models, eda) · Kaggle Competitions (35h; needs trees-ensembles, eval-fe)
- **Phase 4 · Deep Learning** — Neural Networks from Scratch (25h; needs ml-foundations, math-ml) · PyTorch (30h; needs nn-scratch) · Training Deep Nets Well (25h; needs pytorch) · Convolutional Networks & Vision (30h; needs dl-training) · Sequence Models & Language Modeling (25h; needs dl-training) · Practical Deep Learning (fast.ai) (25h; needs cnn)
- **Phase 5 · Specializations** — Attention & Transformers (35h; needs sequence-models) · NLP with Hugging Face (25h; needs transformers) · LLMs: Pretraining, Fine-tuning & Alignment (40h; needs nlp-hf, dl-training) · Building LLM Apps & RAG (30h; needs nlp-hf) · Modern Computer Vision (30h; needs cnn, transformers) · Generative Models & Diffusion (30h; needs cnn, math-ml) · Reinforcement Learning (35h; needs dl-training, prob-stats)
- **Phase 6 · ML Engineering** — Reproducible ML & Experiment Tracking (15h; needs pytorch, git) · Model Serving & Deployment (25h; needs repro-ml) · MLOps & ML System Design (30h; needs deployment) · GPUs, Performance & Distributed Training (20h; needs pytorch, transformers)
- **Phase 7 · Mastery** — Reading Research Papers (20h; needs transformers) · Reproduce a Paper (40h; needs papers, repro-ml) · AI Agents & Evaluation (25h; needs rag-apps) · Responsible AI & Safety (12h; needs eval-fe, llms) · Open Source Contributions (25h; needs git, nlp-hf) · Portfolio & ML Interviews (30h; needs deployment, kaggle) · Master: Go Deep on a Frontier (80h; needs reproduce, agents, scaling)

