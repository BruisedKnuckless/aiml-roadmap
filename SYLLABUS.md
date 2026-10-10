# The Long Road — AI/ML Syllabus (Zero → Master)

The complete curriculum covered by the roadmap app, generated from the app's own data.

| | |
|---|---|
| Phases | 8 |
| Nodes (topics) | 45 |
| Estimated study time | ~1247 hours (about 249 days at 5 h/day, 416 days at 3 h/day) |
| Checklist tasks (incl. 45 projects) | 426 |
| Free resources (main + alternatives) | 370 unique links |

Hour figures are estimates. Every resource is free (some courses are "free to audit"). Each node ends with a project; a node is mastered when its whole checklist and project are done.

## Contents

- **[Phase 0 · Setup & Programming](#phase-0-setup-programming)** — 130 h
  - [Mac Dev Setup & Command Line](#mac-dev-setup-command-line) · 10 h
  - [Git & GitHub](#git-github) · 10 h
  - [Python Fundamentals](#python-fundamentals) · 45 h
  - [Python: OOP, Testing & Packaging](#python-oop-testing-packaging) · 25 h
  - [Data Structures & Algorithms](#data-structures-algorithms) · 40 h
- **[Phase 1 · Mathematics](#phase-1-mathematics)** — 140 h
  - [Linear Algebra](#linear-algebra) · 45 h
  - [Calculus & Gradients](#calculus-gradients) · 30 h
  - [Probability & Statistics](#probability-statistics) · 45 h
  - [Optimization & Information Theory](#optimization-information-theory) · 20 h
- **[Phase 2 · Data Wrangling](#phase-2-data-wrangling)** — 85 h
  - [NumPy & Vectorized Thinking](#numpy-vectorized-thinking) · 15 h
  - [Pandas & Data Manipulation](#pandas-data-manipulation) · 25 h
  - [Data Visualization](#data-visualization) · 12 h
  - [SQL for Data Science](#sql-for-data-science) · 18 h
  - [Exploratory Data Analysis](#exploratory-data-analysis) · 15 h
- **[Phase 3 · Classical ML](#phase-3-classical-ml)** — 185 h
  - [ML Foundations](#ml-foundations) · 40 h
  - [Regression & Classification](#regression-classification) · 25 h
  - [kNN, SVM & Naive Bayes](#knn-svm-naive-bayes) · 15 h
  - [Trees, Random Forests & Boosting](#trees-random-forests-boosting) · 30 h
  - [Unsupervised Learning](#unsupervised-learning) · 20 h
  - [Evaluation, Validation & Feature Engineering](#evaluation-validation-feature-engineering) · 20 h
  - [Kaggle Competitions](#kaggle-competitions) · 35 h
- **[Phase 4 · Deep Learning](#phase-4-deep-learning)** — 160 h
  - [Neural Networks from Scratch](#neural-networks-from-scratch) · 25 h
  - [PyTorch](#pytorch) · 30 h
  - [Training Deep Nets Well](#training-deep-nets-well) · 25 h
  - [Convolutional Networks & Vision](#convolutional-networks-vision) · 30 h
  - [Sequence Models & Language Modeling](#sequence-models-language-modeling) · 25 h
  - [Practical Deep Learning (fast.ai)](#practical-deep-learning-fastai) · 25 h
- **[Phase 5 · Specializations](#phase-5-specializations)** — 225 h
  - [Attention & Transformers](#attention-transformers) · 35 h
  - [NLP with Hugging Face](#nlp-with-hugging-face) · 25 h
  - [LLMs: Pretraining, Fine-tuning & Alignment](#llms-pretraining-fine-tuning-alignment) · 40 h
  - [Building LLM Apps & RAG](#building-llm-apps-rag) · 30 h
  - [Modern Computer Vision](#modern-computer-vision) · 30 h
  - [Generative Models & Diffusion](#generative-models-diffusion) · 30 h
  - [Reinforcement Learning](#reinforcement-learning) · 35 h
- **[Phase 6 · ML Engineering](#phase-6-ml-engineering)** — 90 h
  - [Reproducible ML & Experiment Tracking](#reproducible-ml-experiment-tracking) · 15 h
  - [Model Serving & Deployment](#model-serving-deployment) · 25 h
  - [MLOps & ML System Design](#mlops-ml-system-design) · 30 h
  - [GPUs, Performance & Distributed Training](#gpus-performance-distributed-training) · 20 h
- **[Phase 7 · Mastery](#phase-7-mastery)** — 232 h
  - [Reading Research Papers](#reading-research-papers) · 20 h
  - [Reproduce a Paper](#reproduce-a-paper) · 40 h
  - [AI Agents & Evaluation](#ai-agents-evaluation) · 25 h
  - [Responsible AI & Safety](#responsible-ai-safety) · 12 h
  - [Open Source Contributions](#open-source-contributions) · 25 h
  - [Portfolio & ML Interviews](#portfolio-ml-interviews) · 30 h
  - [Master: Go Deep on a Frontier](#master-go-deep-on-a-frontier) · 80 h

## Roadmap at a glance

| Phase | Level | Nodes | Hours | What you can do afterwards |
|---|---|---|---|---|
| 0 · Setup & Programming | Foundations | 5 | 130 | Set up a dev machine, write and test real Python programs, use Git/GitHub, solve interview-style algorithm problems |
| 1 · Mathematics | Foundations | 4 | 140 | Read ML math: linear algebra, gradients, probability, optimization and cross-entropy |
| 2 · Data Wrangling | Core | 5 | 85 | Load, clean, query, visualise and explore any tabular dataset (NumPy, Pandas, SQL) |
| 3 · Classical ML | Core | 7 | 185 | Build, validate and explain classical ML models end-to-end; compete on Kaggle |
| 4 · Deep Learning | Advanced | 6 | 160 | Build and train neural networks in PyTorch (MLPs, CNNs, sequence models) and debug training |
| 5 · Specializations | Advanced | 7 | 225 | Work with transformers and LLMs (fine-tuning, RAG), modern vision, generative models and RL |
| 6 · ML Engineering | Professional | 4 | 90 | Ship models: reproducible experiments, APIs, Docker, CI/CD, MLOps, monitoring, GPU performance |
| 7 · Mastery | Master | 7 | 232 | Read and reproduce papers, build agents, contribute to open source, pass interviews, specialise |

---

# Phase 0 · Setup & Programming

*Foundations · 5 nodes · 130 hours*

| Node | Hours | Requires |
|---|---|---|
| [Mac Dev Setup & Command Line](#mac-dev-setup-command-line) | 10 | — (start here) |
| [Git & GitHub](#git-github) | 10 | Mac Dev Setup & Command Line |
| [Python Fundamentals](#python-fundamentals) | 45 | Mac Dev Setup & Command Line |
| [Python: OOP, Testing & Packaging](#python-oop-testing-packaging) | 25 | Python Fundamentals |
| [Data Structures & Algorithms](#data-structures-algorithms) | 40 | Python Fundamentals |

## Mac Dev Setup & Command Line

**≈ 10 hours** · Requires: nothing — start here · Unlocks: Git & GitHub, Python Fundamentals

Turn your Mac into a working ML machine: terminal fluency, a package manager, an editor, and isolated Python environments.

**Why it matters:** Every later step assumes you can install tools, navigate the filesystem, and run scripts without friction. An hour lost to setup every week compounds into months.

**Topics:** Terminal & zsh · Homebrew · VS Code · Python envs (uv/venv) · Jupyter

### Study guide

1. Do Missing Semester (2026) lecture 1, "Course Overview + Introduction to the Shell", following along in Terminal.app — type every command yourself.
2. Install Homebrew from brew.sh, then `brew install python git` and confirm with `python3 --version`.
3. Install VS Code + the Python and Jupyter extensions; open a folder, create a .py file, run it with the play button.
4. Learn environments: create one with `python3 -m venv .venv` (or `uv venv`), activate it, pip-install numpy, deactivate.
5. Install JupyterLab inside an environment and run a notebook. Learn when to use notebooks (exploration) vs scripts (reusable code).

### Resources

- [The Missing Semester of Your CS Education (MIT)](https://missing.csail.mit.edu/) — *course* · 2026 edition · lectures 1–3: the shell, command-line environment, development environment & tools
- [Homebrew](https://brew.sh/) — *tool* · macOS package manager
- [VS Code: Python tutorial](https://code.visualstudio.com/docs/python/python-tutorial) — *docs*
- [Python venv documentation](https://docs.python.org/3/library/venv.html) — *docs*
- [uv — fast Python package & env manager](https://docs.astral.sh/uv/) — *docs* · Modern alternative to pip+venv
- [JupyterLab docs](https://jupyterlab.readthedocs.io/en/latest/) — *docs*

**Alternatives** (different format or teaching style):

- [The Linux Command Line (William Shotts)](https://linuxcommand.org/tlcl.php) — *book* · Free book · works for macOS zsh too
- [Apple: Terminal User Guide](https://support.apple.com/guide/terminal/welcome/mac) — *docs*
- [Missing Semester 2020: The Shell](https://missing.csail.mit.edu/2020/course-shell/) — *article* · Older edition, excellent written notes

### Checklist

- [ ] Missing Semester lecture 1 (Introduction to the Shell) + its exercises
- [ ] Practice: cd, ls -la, pwd, mkdir, mv, cp, rm, cat, less, grep, find, | pipes, > redirects
- [ ] Install Homebrew, Python 3 and Git via brew
- [ ] Install VS Code + Python, Jupyter, and Pylance extensions
- [ ] Create, activate and delete a virtual environment; install a package into it
- [ ] Install JupyterLab in an env and run a notebook with a markdown + code cell
- [ ] Write a shell alias in ~/.zshrc (e.g. `alias ll="ls -la"`) and reload the shell
- [ ] Create a ~/code folder structure you will keep for the whole journey

### Project

Write a `setup.sh` script that creates a project folder, a virtual environment, installs numpy/pandas/jupyter, and prints the versions. Run it from scratch to prove it works.

### Self-test

1. What is the difference between a global Python install and a virtual environment?
2. What do `|`, `>` and `>>` do in a shell?
3. How do you find which python binary is active?

## Git & GitHub

**≈ 10 hours** · Requires: Mac Dev Setup & Command Line · Unlocks: Reproducible ML & Experiment Tracking, Open Source Contributions

Version control for every line of code and every notebook you write from here on. Your GitHub becomes your public portfolio.

**Why it matters:** Recruiters look at GitHub. Teams expect branches, PRs, and clean history. You also need it to clone course code and contribute to open source.

**Topics:** commit / branch / merge · remotes & push · Pull requests · .gitignore · Conflicts

### Study guide

1. Read Pro Git chapters 1–3 (Getting Started, Basics, Branching).
2. Play Learn Git Branching levels "Introduction Sequence" and "Ramping Up" to visualise branches.
3. Create a GitHub account, set up SSH keys, push your first repo.
4. Do the GitHub Skills "Introduction to GitHub" course to practice PRs.
5. From now on: one repo per project, commit small and often, write meaningful messages.

### Resources

- [Pro Git book (free)](https://git-scm.com/book/en/v2) — *book* · Chapters 1–3 are essential
- [Learn Git Branching (interactive)](https://learngitbranching.js.org/) — *practice*
- [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github) — *course* · Hands-on course that runs inside a GitHub repo
- [Missing Semester: Version Control and Git](https://missing.csail.mit.edu/2026/version-control/) — *video* · 2026 lecture + notes
- [GitHub: Connecting with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) — *docs*

**Alternatives** (different format or teaching style):

- [Atlassian Git tutorials](https://www.atlassian.com/git/tutorials) — *article* · Written, beginner → advanced
- [GitHub Docs: Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git) — *docs*
- [Oh Shit, Git!?! — fixing common mistakes](https://ohshitgit.com/) — *article*

### Checklist

- [ ] Read Pro Git ch.1–2 and configure user.name / user.email
- [ ] Read Pro Git ch.3 (Branching)
- [ ] Complete Learn Git Branching: Introduction Sequence
- [ ] Complete Learn Git Branching: Ramping Up + Push & Pull remote levels
- [ ] Create GitHub account, add an SSH key, push a repo
- [ ] Create a branch, open a PR, merge it on GitHub
- [ ] Deliberately create and resolve a merge conflict
- [ ] Write a Python .gitignore (venv, __pycache__, .ipynb_checkpoints, data/)
- [ ] Write a profile README.md on GitHub

### Project

Create a public `ml-journey` repo. Add a README with your roadmap, and commit your notes/code from every node into it as you go.

### Self-test

1. What is the difference between `git fetch` and `git pull`?
2. When would you rebase instead of merge?
3. How do you undo the last commit but keep the changes?

## Python Fundamentals

**≈ 45 hours** · Requires: Mac Dev Setup & Command Line · Unlocks: Python: OOP, Testing & Packaging, Data Structures & Algorithms, Linear Algebra, Calculus & Gradients, Probability & Statistics, SQL for Data Science

Core Python: variables, types, control flow, functions, data structures, files, exceptions and modules.

**Why it matters:** Python is the language of ML. Fluency here means you think about the model, not the syntax.

**Topics:** Types & control flow · Functions · Lists / dicts / sets · Files & exceptions · Modules & pip

### Study guide

1. Work through Harvard CS50P lectures 0–4 (Functions, Conditionals, Loops, Exceptions, Libraries). Do every problem set.
2. Use the official Python tutorial as a reference for anything unclear (sections 3–8).
3. Do Exercism Python track exercises daily (aim for 2–3 per day) to build muscle memory.
4. Continue CS50P lectures 5–8 (Unit tests, File I/O, Regex, OOP intro).
5. Automate one boring task of your own with Automate the Boring Stuff techniques.

### Resources

- [CS50P: Introduction to Programming with Python (Harvard)](https://cs50.harvard.edu/python/) — *course* · Best structured free Python course
- [The Python Tutorial (official)](https://docs.python.org/3/tutorial/) — *docs*
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com/) — *book* · Free online
- [Exercism Python track](https://exercism.org/tracks/python) — *practice* · Free mentored exercises
- [Corey Schafer — Python tutorials](https://www.youtube.com/@coreyms) — *video*

**Alternatives** (different format or teaching style):

- [Think Python, 3rd ed. (Allen Downey)](https://allendowney.github.io/ThinkPython/) — *book* · Free online, runs in notebooks
- [Python for Everybody (Dr. Chuck)](https://www.py4e.com/) — *course* · Book + videos + exercises
- [Google's Python Class](https://developers.google.com/edu/python) — *course* · Written lessons + exercises

### Checklist

- [ ] CS50P Lecture 0 (Functions, Variables) + problem set
- [ ] CS50P Lecture 1 (Conditionals) + problem set
- [ ] CS50P Lecture 2 (Loops) + problem set
- [ ] CS50P Lecture 3 (Exceptions) + problem set
- [ ] CS50P Lecture 4 (Libraries) + problem set
- [ ] CS50P Lecture 5 (Unit Tests) + problem set
- [ ] CS50P Lecture 6 (File I/O) + problem set
- [ ] CS50P Lecture 7 (Regular Expressions) + problem set
- [ ] Master list/dict/set comprehensions — write 10 of your own
- [ ] Solve 15 Exercism Python exercises
- [ ] Read & write CSV and JSON files with the standard library
- [ ] Write a script that uses argparse to take command-line arguments

### Project

Build a command-line expense tracker: add/list/delete expenses stored in a JSON file, monthly summary by category, with unit tests.

### Self-test

1. Mutable vs immutable types — give two examples of each
2. What does `*args, **kwargs` do?
3. When is a dict lookup O(1) and why?

## Python: OOP, Testing & Packaging

**≈ 25 hours** · Requires: Python Fundamentals · Unlocks: NumPy & Vectorized Thinking

Write Python like an engineer: classes, dataclasses, type hints, generators, decorators, pytest, and project structure.

**Why it matters:** PyTorch models are classes; data loaders are iterators; production ML code needs tests and types. This is where scripts become software.

**Topics:** Classes & dataclasses · Iterators / generators · Decorators & context managers · Type hints · pytest

### Study guide

1. Finish CS50P Lecture 8 (OOP) and 9 (Et Cetera).
2. Read the official tutorial on classes, then Real Python's OOP guide.
3. Learn generators and `yield`, decorators and `with` context managers — write one of each.
4. Add type hints to an old project and learn to read them.
5. Set up pytest for a project; write fixtures and parametrised tests.

### Resources

- [Python tutorial: Classes](https://docs.python.org/3/tutorial/classes.html) — *docs*
- [Real Python: OOP in Python](https://realpython.com/python3-object-oriented-programming/) — *article*
- [Real Python: Type checking](https://realpython.com/python-type-checking/) — *article*
- [pytest: Get started](https://docs.pytest.org/en/stable/getting-started.html) — *docs*
- [Python Packaging User Guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/) — *docs*
- [Fluent-style idioms: Python docs HOWTOs](https://docs.python.org/3/howto/index.html) — *docs* · Functional, sorting, logging HOWTOs

**Alternatives** (different format or teaching style):

- [Beyond the Basic Stuff with Python (Al Sweigart)](https://inventwithpython.com/beyond/) — *book* · Free online
- [Python docs: Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html) — *docs* · Iterators & generators
- [mypy: Getting started](https://mypy.readthedocs.io/en/stable/getting_started.html) — *docs*

### Checklist

- [ ] CS50P Lecture 8 (OOP) + problem set
- [ ] Write a class with __init__, __repr__, __eq__, and a @property
- [ ] Use @dataclass and inheritance in a small example
- [ ] Write a generator that streams lines from a large file
- [ ] Write a @timer decorator and a custom context manager
- [ ] Add type hints to an existing project and run mypy or pyright
- [ ] Write 10 pytest tests including a fixture and @pytest.mark.parametrize
- [ ] Structure a project as src/ package with pyproject.toml and install it with pip install -e .
- [ ] Learn the logging module and replace print debugging in one project

### Project

Turn your expense tracker into a proper package: classes, type hints, pytest suite (>80% coverage), installable via pyproject.toml.

### Self-test

1. What is the difference between an iterator and an iterable?
2. What does a decorator return?
3. Why prefer composition over inheritance?

## Data Structures & Algorithms

**≈ 40 hours** · Requires: Python Fundamentals · Unlocks: —

Big-O, arrays, hash maps, stacks/queues, trees, graphs, sorting, searching, recursion and dynamic programming.

**Why it matters:** Needed to write efficient data pipelines, and every ML engineer interview has a coding round.

**Topics:** Big-O · Arrays & hashing · Two pointers / sliding window · Trees & graphs · Dynamic programming

### Study guide

1. Learn Big-O notation and the complexity of Python built-ins (list, dict, set).
2. Follow the NeetCode roadmap tree: Arrays & Hashing → Two Pointers and Stack → Binary Search, Sliding Window, Linked List.
3. Study the pythonds book for trees, graphs and recursion with Python implementations.
4. Continue down the tree: Trees → Tries, Heap / Priority Queue, Backtracking → Graphs → 1-D Dynamic Programming.
5. Keep a "patterns" note: for each solved problem, write the pattern in one line.

### Resources

- [NeetCode Roadmap](https://neetcode.io/roadmap) — *practice* · Free videos for every problem
- [Problem Solving with Algorithms & Data Structures (Python)](https://runestone.academy/ns/books/published/pythonds/index.html) — *book*
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) — *article*
- [Python TimeComplexity wiki](https://wiki.python.org/moin/TimeComplexity) — *docs*
- [LeetCode problem set](https://leetcode.com/problemset/) — *practice*
- [CS50x (Harvard) — algorithms lectures 3 & 5](https://cs50.harvard.edu/x/) — *course*

**Alternatives** (different format or teaching style):

- [Open Data Structures (Pat Morin)](https://opendatastructures.org/) — *book* · Free book
- [Algorithms (Jeff Erickson)](https://jeffe.cs.illinois.edu/teaching/algorithms/) — *book* · Free book
- [MIT 6.006 Introduction to Algorithms (OCW)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) — *course* · Lecture notes + problem sets
- [VisuAlgo — animated data structures](https://visualgo.net/en) — *tool*

### Checklist

- [ ] Learn Big-O; memorise complexity of list/dict/set operations
- [ ] NeetCode: Arrays & Hashing (solve 6+)
- [ ] NeetCode: Two Pointers (solve 4+)
- [ ] NeetCode: Sliding Window (solve 3+)
- [ ] NeetCode: Stack (solve 3+)
- [ ] NeetCode: Binary Search (solve 4+)
- [ ] Implement merge sort and quicksort from scratch
- [ ] NeetCode: Linked List (solve 4+)
- [ ] NeetCode: Trees — BFS/DFS (solve 6+)
- [ ] NeetCode: Heap / Priority Queue (solve 3+)
- [ ] NeetCode: Graphs — BFS/DFS/topological sort (solve 5+)
- [ ] NeetCode: 1-D Dynamic Programming (solve 5+)

### Project

Implement a min-heap, a trie and a graph class (with BFS, DFS, Dijkstra) from scratch with tests. Push to GitHub.

### Self-test

1. Why is checking membership in a set faster than a list?
2. BFS vs DFS — when do you use each?
3. Explain memoisation vs tabulation.

---

# Phase 1 · Mathematics

*Foundations · 4 nodes · 140 hours*

| Node | Hours | Requires |
|---|---|---|
| [Linear Algebra](#linear-algebra) | 45 | Python Fundamentals |
| [Calculus & Gradients](#calculus-gradients) | 30 | Python Fundamentals |
| [Probability & Statistics](#probability-statistics) | 45 | Python Fundamentals |
| [Optimization & Information Theory](#optimization-information-theory) | 20 | Linear Algebra, Calculus & Gradients, Probability & Statistics |

## Linear Algebra

**≈ 45 hours** · Requires: Python Fundamentals · Unlocks: Optimization & Information Theory, NumPy & Vectorized Thinking

Vectors, matrices, linear transformations, dot products, matrix multiplication, determinants, eigenvectors, SVD.

**Why it matters:** Data is matrices; neural networks are chains of matrix multiplications; PCA and embeddings are linear algebra. This is the single most important math for ML.

**Topics:** Vectors & spans · Matrix multiplication · Determinant & inverse · Eigen-decomposition · SVD · Projections

### Study guide

1. Watch 3Blue1Brown Essence of Linear Algebra (all 16 chapters) for geometric intuition — 2–3 videos per day, pause and sketch.
2. Then follow MIT 18.06SC (Gilbert Strang) units I–III; do the problem sets with solutions.
3. Implement every concept in NumPy as you learn it (dot, matmul, inverse, eig, svd).
4. Read MML book chapter 2–4 to see the notation ML papers use.

### Resources

- [3Blue1Brown — Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) — *video* · Start here — intuition first
- [MIT 18.06SC Linear Algebra (Strang)](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/) — *course* · Lectures + problem sets with solutions
- [Mathematics for Machine Learning (book)](https://mml-book.github.io/) — *book* · Ch. 2–4
- [Immersive Linear Algebra (interactive)](http://immersivemath.com/ila/index.html) — *book*
- [Khan Academy Linear Algebra](https://www.khanacademy.org/math/linear-algebra) — *course*
- [Stanford CS229 Linear Algebra Review (PDF)](https://cs229.stanford.edu/section/cs229-linalg.pdf) — *article*

**Alternatives** (different format or teaching style):

- [Interactive Linear Algebra (Margalit & Rabinoff)](https://textbooks.math.gatech.edu/ila/) — *book* · Free textbook with interactive figures
- [Introduction to Applied Linear Algebra — VMLS (Boyd)](https://web.stanford.edu/~boyd/vmls/) — *book* · Free PDF, applications-first
- [Linear Algebra Done Right, 4th ed. (Axler)](https://linear.axler.net/) — *book* · Free PDF, proof-based (go deeper later)

### Checklist

- [ ] 3B1B Ch.1–3: vectors, span, linear transformations
- [ ] 3B1B Ch.4–7: matrix multiplication, 3D, determinant, inverse & rank
- [ ] 3B1B Ch.8–13: non-square matrices, dot & cross products, Cramer's rule, change of basis
- [ ] 3B1B Ch.14–16: eigenvectors & eigenvalues, the quick eigenvalue trick, abstract vector spaces
- [ ] MIT 18.06SC Unit I: Ax = b and the four subspaces (sessions + problem sets)
- [ ] MIT 18.06SC Unit II: orthogonality, least squares, determinants and eigenvalues
- [ ] MIT 18.06SC Unit III: symmetric & positive definite matrices, SVD, linear transformations
- [ ] Implement matrix multiply by hand in Python, compare with np.matmul
- [ ] Solve a linear system with np.linalg.solve and verify
- [ ] Compute eigenvalues/vectors and SVD of a matrix in NumPy; reconstruct the matrix
- [ ] Read MML book chapters 2–4

### Project

Image compression with SVD: load a grayscale image as a matrix, reconstruct it with k = 5, 20, 50 singular values, plot quality vs k.

### Self-test

1. What does a matrix with determinant 0 do to space?
2. Why are eigenvectors of a covariance matrix useful?
3. What is the rank of a matrix in plain words?

## Calculus & Gradients

**≈ 30 hours** · Requires: Python Fundamentals · Unlocks: Optimization & Information Theory

Derivatives, chain rule, partial derivatives, gradients, Jacobians and the matrix calculus behind backpropagation.

**Why it matters:** Training = minimising a loss with gradient descent. Backprop is just the chain rule applied carefully. You need this to debug models and read papers.

**Topics:** Derivatives & limits · Chain rule · Partial derivatives · Gradient & Jacobian · Matrix calculus

### Study guide

1. Watch 3Blue1Brown Essence of Calculus (12 chapters) for intuition.
2. Practice derivatives and the chain rule on Khan Academy until automatic.
3. Khan Academy Multivariable Calculus: partial derivatives, gradient, directional derivatives.
4. Read "The Matrix Calculus You Need For Deep Learning" (Parr & Howard) carefully, with pen and paper.
5. Implement gradient descent on f(x, y) = x² + 3y² in Python and plot the path.

### Resources

- [3Blue1Brown — Essence of Calculus](https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr) — *video*
- [Khan Academy: Multivariable Calculus](https://www.khanacademy.org/math/multivariable-calculus) — *course*
- [Khan Academy: Differential Calculus](https://www.khanacademy.org/math/differential-calculus) — *course*
- [The Matrix Calculus You Need For Deep Learning](https://explained.ai/matrix-calculus/) — *article* · Parr & Howard
- [CS231n: Optimization notes](https://cs231n.github.io/optimization-1/) — *article*
- [MIT 18.01SC Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/) — *course*

**Alternatives** (different format or teaching style):

- [OpenStax Calculus Volume 1](https://openstax.org/details/books/calculus-volume-1) — *book* · Free textbook
- [OpenStax Calculus Volume 3 (multivariable)](https://openstax.org/details/books/calculus-volume-3) — *book* · Partial derivatives & gradients
- [Paul's Online Math Notes](https://tutorial.math.lamar.edu/) — *article* · Clear notes + practice problems

### Checklist

- [ ] 3B1B Calculus Ch.1–4: derivatives, power rule, trig, chain/product rule
- [ ] 3B1B Calculus Ch.5–12: exponentials, implicit diff, limits, integrals, Taylor series
- [ ] Khan: practice derivative rules + chain rule exercises
- [ ] Khan Multivariable: partial derivatives & gradient
- [ ] Khan Multivariable: directional derivative, Jacobian, Hessian intuition
- [ ] Matrix Calculus for DL: from "Introduction" through "Matrix calculus" (gradients & Jacobians)
- [ ] Matrix Calculus for DL: element-wise ops → "The Chain Rules" → "The gradient of neuron activation"; derive it yourself
- [ ] Implement numerical gradient (finite differences) and compare with analytic gradient
- [ ] Implement & plot gradient descent on a 2-D function with 3 learning rates

### Project

Write a tiny autodiff-free linear regression trained by hand-derived gradient descent; verify your gradients numerically.

### Self-test

1. Why does the gradient point in the direction of steepest ascent?
2. Derive d/dx of sigmoid(x).
3. What goes wrong with a learning rate that is too large?

## Probability & Statistics

**≈ 45 hours** · Requires: Python Fundamentals · Unlocks: Optimization & Information Theory, Exploratory Data Analysis, Reinforcement Learning

Random variables, distributions, expectation, variance, Bayes' theorem, MLE, sampling, hypothesis testing and confidence intervals.

**Why it matters:** ML is applied statistics: losses are likelihoods, evaluation is inference, A/B tests decide what ships. Bayes underpins half of the field.

**Topics:** Distributions · Bayes' theorem · Expectation & variance · MLE · Hypothesis testing · CLT

### Study guide

1. Build intuition with Seeing Theory (all six chapters) — interactive and fast.
2. Watch the StatQuest statistics fundamentals videos (distributions, p-values, MLE, Bayes).
3. Take Harvard Stat 110 lectures 1–20 with problem sets for real depth in probability.
4. Read OpenIntro Statistics chapters on inference and regression; do a few exercises per chapter.
5. Simulate everything in NumPy: CLT, Monte Carlo estimation, bootstrap confidence intervals.

### Resources

- [Seeing Theory (Brown University)](https://seeing-theory.brown.edu/) — *course* · Interactive visual intro
- [StatQuest with Josh Starmer](https://www.youtube.com/@statquest) — *video* · Statistics Fundamentals playlist
- [Harvard Stat 110: Probability](https://stat110.hsites.harvard.edu/) — *course* · Course site: handouts, problem sets, free textbook
- [Stat 110 lecture videos (Joe Blitzstein)](https://www.youtube.com/playlist?list=PLLVplP8OIVc8EktkrD3Q8td0GmId7DjW0) — *video* · 34 lectures
- [OpenIntro Statistics (free PDF)](https://www.openintro.org/book/os/) — *book*
- [Think Stats (Allen Downey)](https://greenteapress.com/wp/think-stats-2e/) — *book* · Statistics with Python code
- [Khan Academy: Statistics & Probability](https://www.khanacademy.org/math/statistics-probability) — *course*

**Alternatives** (different format or teaching style):

- [Introduction to Probability (Blitzstein & Hwang)](https://probabilitybook.net/) — *book* · The Stat 110 textbook · free PDF (opens in Google Drive)
- [Probability for Computer Scientists (Stanford CS109)](https://chrispiech.github.io/probabilityForComputerScientists/en/) — *book* · Free course reader
- [MIT 6.041SC Probabilistic Systems Analysis (OCW)](https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/) — *course*

### Checklist

- [ ] Seeing Theory: Basic Probability + Compound Probability
- [ ] Seeing Theory: Probability Distributions + Frequentist Inference
- [ ] Seeing Theory: Bayesian Inference + Regression Analysis
- [ ] StatQuest: histograms, distributions, mean/variance/std, normal distribution
- [ ] StatQuest: p-values, hypothesis testing, confidence intervals
- [ ] StatQuest: maximum likelihood & Bayes' theorem
- [ ] Stat 110 lectures 1–7 (counting, conditional probability, Bayes)
- [ ] Stat 110 lectures 8–20 (random variables, expectation, continuous distributions)
- [ ] Simulate the Central Limit Theorem in NumPy with 3 different distributions
- [ ] Compute a bootstrap 95% confidence interval for a mean
- [ ] Derive the MLE for the mean of a Gaussian by hand
- [ ] Stat 110 lectures 21–29 (covariance, transformations, conditional expectation, LLN & CLT)

### Project

A/B test analyser: given two CSVs of conversions, compute conversion rates, a two-proportion z-test, bootstrap CI, and a plain-English verdict.

### Self-test

1. Explain a p-value without saying "probability the null is true".
2. Why does minimising MSE equal MLE under Gaussian noise?
3. State Bayes' theorem and apply it to a medical-test example.

## Optimization & Information Theory

**≈ 20 hours** · Requires: Linear Algebra, Calculus & Gradients, Probability & Statistics · Unlocks: ML Foundations, Neural Networks from Scratch, Generative Models & Diffusion

Tie the math together for ML: convexity, gradient descent variants, Lagrange multipliers, entropy, cross-entropy and KL divergence.

**Why it matters:** Cross-entropy is the loss for nearly every classifier and LLM. Optimizer behaviour (momentum, Adam) explains why training succeeds or fails.

**Topics:** Convexity · SGD / momentum / Adam · Lagrange multipliers · Entropy & cross-entropy · KL divergence

### Study guide

1. Read MML book chapter 7 (Continuous Optimization).
2. Read Distill "Why Momentum Really Works" and play with the interactive plots.
3. Read colah's "Visual Information Theory" for entropy, cross-entropy and KL.
4. Implement SGD, momentum and Adam from scratch on a toy problem; compare convergence.

### Resources

- [Mathematics for ML — Ch.7 Optimization](https://mml-book.github.io/) — *book*
- [Distill: Why Momentum Really Works](https://distill.pub/2017/momentum/) — *article*
- [colah: Visual Information Theory](https://colah.github.io/posts/2015-09-Visual-Information/) — *article*
- [Sebastian Ruder: Overview of gradient descent algorithms](https://www.ruder.io/optimizing-gradient-descent/) — *article*
- [Convex Optimization (Boyd & Vandenberghe)](https://web.stanford.edu/~boyd/cvxbook/) — *book* · Reference, ch. 1–3
- [Imperial: Mathematics for ML (Coursera, audit free)](https://www.coursera.org/specializations/mathematics-machine-learning) — *course*

**Alternatives** (different format or teaching style):

- [3Blue1Brown: But what is cross-entropy?](https://www.youtube.com/watch?v=GlYgs6v2YfU) — *video*
- [Information Theory, Inference & Learning Algorithms (MacKay)](https://www.inference.org.uk/itprnn/book.html) — *book* · Free PDF
- [CS229: Convex Optimization Overview (notes)](https://cs229.stanford.edu/section/cs229-cvxopt.pdf) — *article* · PDF

### Checklist

- [ ] Read MML ch.7.1–7.2 (gradient descent, constrained optimisation)
- [ ] Read MML ch.7.3 (convex optimisation)
- [ ] Read & play with Distill "Why Momentum Really Works"
- [ ] Read Ruder's overview of gradient descent algorithms
- [ ] Read Visual Information Theory; compute entropy of a coin by hand
- [ ] Implement cross-entropy and KL divergence in NumPy; verify KL ≥ 0
- [ ] Implement SGD, momentum, Adam on Rosenbrock function; plot trajectories

### Project

Optimizer race notebook: animate SGD, Momentum, RMSProp and Adam on 3 loss surfaces and write a short explanation of each behaviour.

### Self-test

1. Why is cross-entropy preferred over MSE for classification?
2. What does Adam add on top of momentum?
3. Is KL divergence symmetric? Why does it matter?

---

# Phase 2 · Data Wrangling

*Core · 5 nodes · 85 hours*

| Node | Hours | Requires |
|---|---|---|
| [NumPy & Vectorized Thinking](#numpy-vectorized-thinking) | 15 | Python: OOP, Testing & Packaging, Linear Algebra |
| [Pandas & Data Manipulation](#pandas-data-manipulation) | 25 | NumPy & Vectorized Thinking |
| [Data Visualization](#data-visualization) | 12 | Pandas & Data Manipulation |
| [SQL for Data Science](#sql-for-data-science) | 18 | Python Fundamentals |
| [Exploratory Data Analysis](#exploratory-data-analysis) | 15 | Pandas & Data Manipulation, Data Visualization, Probability & Statistics |

## NumPy & Vectorized Thinking

**≈ 15 hours** · Requires: Python: OOP, Testing & Packaging, Linear Algebra · Unlocks: Pandas & Data Manipulation, ML Foundations

N-dimensional arrays, indexing, broadcasting, vectorisation, random numbers and linear algebra routines.

**Why it matters:** PyTorch tensors behave like NumPy arrays. Vectorised code is 10–100× faster than loops, and broadcasting bugs are the most common shape errors in ML.

**Topics:** ndarray & dtypes · Indexing & slicing · Broadcasting · Vectorisation · np.random & np.linalg

### Study guide

1. Do the CS231n Python/NumPy tutorial end-to-end.
2. Read NumPy "absolute beginners" guide, then the broadcasting page twice.
3. Work through numpy-100 exercises 1–50 (then 51–100 over time).
4. Read Python Data Science Handbook chapter 2.
5. Rewrite one of your loop-heavy scripts with vectorised NumPy and time both.

### Resources

- [CS231n Python & NumPy tutorial](https://cs231n.github.io/python-numpy-tutorial/) — *article*
- [NumPy: the absolute basics for beginners](https://numpy.org/doc/stable/user/absolute_beginners.html) — *docs*
- [NumPy broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html) — *docs*
- [100 NumPy exercises](https://github.com/rougier/numpy-100) — *practice*
- [Python Data Science Handbook (Ch. 2)](https://jakevdp.github.io/PythonDataScienceHandbook/) — *book*
- [From Python to NumPy](https://www.labri.fr/perso/nrougier/from-python-to-numpy/) — *book* · Vectorisation deep-dive

**Alternatives** (different format or teaching style):

- [Python for Data Analysis ch.4: NumPy Basics](https://wesmckinney.com/book/numpy-basics.html) — *book*
- [Scientific Python Lectures](https://lectures.scientific-python.org/) — *book* · NumPy chapter + exercises
- [NumPy user guide: fundamentals](https://numpy.org/doc/stable/user/basics.html) — *docs*

### Checklist

- [ ] Complete CS231n Python/NumPy tutorial
- [ ] Read NumPy absolute beginners guide
- [ ] Read the broadcasting docs; predict output shapes of 5 examples before running
- [ ] numpy-100 exercises 1–25
- [ ] numpy-100 exercises 26–50
- [ ] Read PDSH chapter 2 (Introduction to NumPy)
- [ ] Vectorise a loop-based pairwise-distance function and benchmark with %timeit
- [ ] Use boolean masks and fancy indexing to filter and modify arrays

### Project

Implement k-means clustering using only NumPy (fully vectorised, no Python loops over points) and visualise clusters on synthetic data.

### Self-test

1. What shape results from (5,1) + (1,4)?
2. View vs copy — when does slicing copy?
3. Why is vectorised code faster?

## Pandas & Data Manipulation

**≈ 25 hours** · Requires: NumPy & Vectorized Thinking · Unlocks: Data Visualization, Exploratory Data Analysis, ML Foundations

DataFrames: loading, selecting, filtering, grouping, merging, reshaping, time series, and handling missing data.

**Why it matters:** Most real ML time is spent preparing tabular data. Pandas is the universal tool for it.

**Topics:** Series & DataFrame · loc / iloc · groupby & agg · merge / join · pivot & melt · Time series

### Study guide

1. Do Kaggle Learn "Pandas" micro-course (6 lessons with exercises).
2. Read "10 minutes to pandas" from the official docs.
3. Read Python for Data Analysis (3e, free online) chapters 5, 7, 8 and 10.
4. Do Kaggle Learn "Data Cleaning".
5. Take a messy real dataset from Kaggle and clean it end-to-end.

### Resources

- [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas) — *course*
- [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) — *docs*
- [Python for Data Analysis, 3E (Wes McKinney)](https://wesmckinney.com/book/) — *book* · Free online edition
- [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning) — *course*
- [Pandas user guide](https://pandas.pydata.org/docs/user_guide/index.html) — *docs*
- [Polars user guide (fast alternative)](https://docs.pola.rs/) — *docs* · Optional — modern DataFrame library

**Alternatives** (different format or teaching style):

- [pandas: Getting started tutorials](https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html) — *docs*
- [Python Data Science Handbook ch.3: Pandas](https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html) — *book*

### Checklist

- [ ] Kaggle Pandas: Creating, Reading & Writing + Indexing, Selecting
- [ ] Kaggle Pandas: Summary Functions + Grouping & Sorting
- [ ] Kaggle Pandas: Data Types & Missing Values + Renaming & Combining
- [ ] Read 10 minutes to pandas and replicate the examples
- [ ] PyDA ch.7: data cleaning & preparation
- [ ] PyDA ch.8: join, combine, reshape (merge, concat, pivot, melt)
- [ ] PyDA ch.10: groupby, apply, pivot tables
- [ ] Kaggle Data Cleaning micro-course
- [ ] Work with dates: parse, resample, rolling windows

### Project

Clean a messy public dataset (e.g., NYC 311 or a Kaggle dataset): fix types, missing values, duplicates; produce 10 groupby insights in a notebook.

### Self-test

1. loc vs iloc?
2. How do you avoid SettingWithCopyWarning?
3. Inner vs left vs outer join — give a use case for each.

## Data Visualization

**≈ 12 hours** · Requires: Pandas & Data Manipulation · Unlocks: Exploratory Data Analysis

Matplotlib fundamentals, Seaborn for statistical plots, and principles of clear, honest charts.

**Why it matters:** You debug data and models with plots (distributions, loss curves, confusion matrices) and you communicate results with them.

**Topics:** Matplotlib figure/axes · Seaborn · Distributions · Relationships · Design principles

### Study guide

1. Do Kaggle Learn "Data Visualization".
2. Read Matplotlib "Quick start guide" to understand Figure/Axes.
3. Do the Seaborn tutorial sections on distributions, relational and categorical plots.
4. Read Fundamentals of Data Visualization chapters 1–7 and 17–20 for design principles.

### Resources

- [Kaggle Learn: Data Visualization](https://www.kaggle.com/learn/data-visualization) — *course*
- [Matplotlib Quick start guide](https://matplotlib.org/stable/users/explain/quick_start.html) — *docs*
- [Seaborn tutorial](https://seaborn.pydata.org/tutorial.html) — *docs*
- [Fundamentals of Data Visualization (Claus Wilke)](https://clauswilke.com/dataviz/) — *book*
- [Plotly Python: getting started](https://plotly.com/python/getting-started/) — *docs* · Interactive plots

**Alternatives** (different format or teaching style):

- [Python Data Science Handbook ch.4: Matplotlib](https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html) — *book*
- [Data Visualization: A Practical Introduction (Healy)](https://socviz.co/) — *book* · R code, but the design principles apply
- [Matplotlib cheatsheets](https://matplotlib.org/cheatsheets/) — *docs*

### Checklist

- [ ] Kaggle Data Visualization micro-course
- [ ] Matplotlib quick start: figure, axes, subplots, labels, legends
- [ ] Seaborn: histplot, kdeplot, boxplot, violinplot
- [ ] Seaborn: scatterplot, lineplot, heatmap, pairplot
- [ ] Read Fundamentals of Data Viz ch.1–7
- [ ] Recreate 3 charts from a news article with Matplotlib

### Project

A visual story notebook: 8 well-labelled charts that explain one dataset, each with a one-line takeaway.

### Self-test

1. When is a pie chart a bad idea?
2. Which plot shows the distribution of a variable across groups best?
3. What makes a chart misleading?

## SQL for Data Science

**≈ 18 hours** · Requires: Python Fundamentals · Unlocks: —

SELECT, WHERE, JOINs, GROUP BY, subqueries, CTEs and window functions — querying data where it lives.

**Why it matters:** Production data sits in databases and warehouses. Every data/ML job interview tests SQL.

**Topics:** SELECT / WHERE · JOINs · GROUP BY / HAVING · CTEs & subqueries · Window functions

### Study guide

1. Complete all SQLBolt lessons (interactive, ~3 hours).
2. Do Kaggle "Intro to SQL" then "Advanced SQL" (BigQuery, free).
3. Learn window functions from the ThoughtSpot (formerly Mode) SQL tutorial (advanced section).
4. Practice 20 problems on SQLZoo or pgexercises.
5. Query a local SQLite database from Python with sqlite3 + pandas.read_sql.

### Resources

- [SQLBolt (interactive)](https://sqlbolt.com/) — *practice*
- [Kaggle Learn: Intro to SQL](https://www.kaggle.com/learn/intro-to-sql) — *course*
- [Kaggle Learn: Advanced SQL](https://www.kaggle.com/learn/advanced-sql) — *course*
- [ThoughtSpot (formerly Mode) SQL Tutorial](https://www.thoughtspot.com/sql-tutorial) — *course* · Great window functions section
- [PostgreSQL Exercises](https://pgexercises.com/) — *practice*
- [SQLZoo](https://sqlzoo.net/) — *practice*

**Alternatives** (different format or teaching style):

- [Select Star SQL (interactive book)](https://selectstarsql.com/) — *book*
- [PostgreSQL official tutorial](https://www.postgresql.org/docs/current/tutorial.html) — *docs*
- [W3Schools SQL tutorial](https://www.w3schools.com/sql/) — *article* · Quick reference with try-it editor

### Checklist

- [ ] SQLBolt lessons 1–6 (SELECT, filtering, JOINs)
- [ ] SQLBolt lessons 7–18 (outer joins, expressions, aggregates, CRUD)
- [ ] Kaggle Intro to SQL (all lessons)
- [ ] Kaggle Advanced SQL (all lessons)
- [ ] SQL tutorial: window functions — ROW_NUMBER, RANK, LAG/LEAD, running totals
- [ ] Write 5 queries using CTEs (WITH ...)
- [ ] Solve 20 problems on pgexercises or SQLZoo
- [ ] Load a CSV into SQLite and query it from Python with pandas.read_sql

### Project

Build a SQLite database from a public dataset and write 15 analytical queries (incl. window functions) answering business questions; document in a README.

### Self-test

1. WHERE vs HAVING?
2. What does a LEFT JOIN return when there is no match?
3. Write a query for the 2nd highest salary per department.

## Exploratory Data Analysis

**≈ 15 hours** · Requires: Pandas & Data Manipulation, Data Visualization, Probability & Statistics · Unlocks: Evaluation, Validation & Feature Engineering

A repeatable process to understand a dataset: shape, types, missingness, distributions, outliers, correlations, leakage and target relationships.

**Why it matters:** Bad data beats good models. EDA is where you catch leakage, bias and bugs before they waste weeks of training.

**Topics:** Data profiling · Missing values · Outliers · Correlation · Target analysis · Leakage

### Study guide

1. Write your own EDA checklist (template notebook) and reuse it on every dataset.
2. Read top-voted EDA notebooks on Kaggle for 3 different competitions; note techniques.
3. Try ydata-profiling for automated reports — then verify its findings manually.
4. Do two full EDAs on datasets from UCI or Kaggle.

### Resources

- [Kaggle Datasets](https://www.kaggle.com/datasets) — *practice*
- [UCI Machine Learning Repository](https://archive.ics.uci.edu/) — *practice*
- [ydata-profiling docs](https://docs.profiling.ydata.ai/) — *tool*
- [Python Data Science Handbook (Ch. 3–4)](https://jakevdp.github.io/PythonDataScienceHandbook/) — *book*
- [Kaggle Learn: Data Cleaning](https://www.kaggle.com/learn/data-cleaning) — *course*

**Alternatives** (different format or teaching style):

- [NIST Handbook: Exploratory Data Analysis](https://www.itl.nist.gov/div898/handbook/eda/eda.htm) — *book* · The classic EDA reference
- [R for Data Science: Exploratory data analysis](https://r4ds.hadley.nz/EDA.html) — *book* · R code, but the process is language-agnostic

### Checklist

- [ ] Create a reusable EDA template notebook (shape, dtypes, nulls, describe, value_counts)
- [ ] Study 3 top-voted Kaggle EDA notebooks and note 10 techniques
- [ ] Detect outliers with IQR and z-score; decide how to treat them
- [ ] Compute and visualise a correlation matrix; check for multicollinearity
- [ ] Analyse target distribution and class imbalance
- [ ] Run ydata-profiling on a dataset and validate 3 of its warnings
- [ ] Complete full EDA #1 on a UCI dataset
- [ ] Complete full EDA #2 on a Kaggle dataset; publish the notebook

### Project

Publish a polished EDA notebook on Kaggle with a clear narrative, 10+ visuals, data-quality issues found, and hypotheses for modelling.

### Self-test

1. What is target leakage? Give an example.
2. How do you decide between dropping and imputing missing values?
3. Why can correlation mislead?

---

# Phase 3 · Classical ML

*Core · 7 nodes · 185 hours*

| Node | Hours | Requires |
|---|---|---|
| [ML Foundations](#ml-foundations) | 40 | NumPy & Vectorized Thinking, Pandas & Data Manipulation, Optimization & Information Theory |
| [Regression & Classification](#regression-classification) | 25 | ML Foundations |
| [kNN, SVM & Naive Bayes](#knn-svm-naive-bayes) | 15 | Regression & Classification |
| [Trees, Random Forests & Boosting](#trees-random-forests-boosting) | 30 | Regression & Classification |
| [Unsupervised Learning](#unsupervised-learning) | 20 | ML Foundations |
| [Evaluation, Validation & Feature Engineering](#evaluation-validation-feature-engineering) | 20 | Regression & Classification, Exploratory Data Analysis |
| [Kaggle Competitions](#kaggle-competitions) | 35 | Trees, Random Forests & Boosting, Evaluation, Validation & Feature Engineering |

## ML Foundations

**≈ 40 hours** · Requires: NumPy & Vectorized Thinking, Pandas & Data Manipulation, Optimization & Information Theory · Unlocks: Regression & Classification, Unsupervised Learning, Neural Networks from Scratch

What learning is: supervised vs unsupervised, train/val/test splits, loss functions, bias–variance, overfitting, regularisation, gradient descent.

**Why it matters:** These concepts are the vocabulary of the entire field. Every later model is a variation on them.

**Topics:** Supervised vs unsupervised · Loss & cost · Bias–variance · Overfitting & regularisation · Train/val/test

### Study guide

1. Take Andrew Ng's Machine Learning Specialization, Course 1 and 2 (audit for free on Coursera). Do the optional labs.
2. In parallel, do Google's ML Crash Course modules on linear/logistic regression, generalisation and overfitting.
3. Do Kaggle Learn "Intro to Machine Learning" for a hands-on scikit-learn workflow.
4. Read ISLP (Introduction to Statistical Learning with Python) chapters 1–2.
5. Watch StatQuest videos on bias–variance and cross-validation.

### Resources

- [Machine Learning Specialization (Andrew Ng) — audit free](https://www.coursera.org/specializations/machine-learning-introduction) — *course* · Free to audit (videos & readings); certificate is paid; financial aid available
- [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course) — *course*
- [Kaggle Learn: Intro to Machine Learning](https://www.kaggle.com/learn/intro-to-machine-learning) — *course*
- [An Introduction to Statistical Learning (ISLP)](https://www.statlearning.com/) — *book* · Free PDF, Python edition
- [StatQuest: Machine Learning playlist](https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF) — *video*
- [Stanford CS229 lecture notes](https://cs229.stanford.edu/main_notes.pdf) — *article* · PDF (downloads) · deeper math reference

**Alternatives** (different format or teaching style):

- [Stanford CS229 lectures (Andrew Ng, 2018)](https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU) — *video* · Fully free, more mathematical
- [A Course in Machine Learning (Hal Daumé III)](http://ciml.info/) — *book* · Free book
- [mlcourse.ai (open ML course)](https://mlcourse.ai/book/index.html) — *course* · Notebooks + assignments

### Checklist

- [ ] Ng Course 1, Week 1: supervised vs unsupervised, linear regression, cost function
- [ ] Ng Course 1, Week 2: multiple features, vectorisation, feature scaling
- [ ] Ng Course 1, Week 3: logistic regression, overfitting, regularisation
- [ ] Ng Course 2, Week 1–2: neural network intuition (overview only)
- [ ] Ng Course 2, Week 3: advice for applying ML, bias/variance, error analysis
- [ ] Ng Course 2, Week 4: decision trees
- [ ] Google MLCC: linear regression, logistic regression, classification metrics
- [ ] Kaggle Intro to Machine Learning (all lessons)
- [ ] Read ISLP ch.1–2 (statistical learning, bias–variance trade-off)
- [ ] StatQuest: bias & variance, cross-validation, regularisation (ridge/lasso)

### Project

Implement linear and logistic regression from scratch in NumPy (with L2 regularisation and gradient descent), then match scikit-learn's results on a real dataset.

### Self-test

1. Explain overfitting to a non-technical friend.
2. Why must the test set be touched only once?
3. How does L2 regularisation reduce variance?

## Regression & Classification

**≈ 25 hours** · Requires: ML Foundations · Unlocks: kNN, SVM & Naive Bayes, Trees, Random Forests & Boosting, Evaluation, Validation & Feature Engineering

Linear/polynomial regression, logistic regression, softmax, regularisation (Ridge, Lasso, ElasticNet), and their assumptions.

**Why it matters:** Linear models are fast, interpretable baselines that are still used everywhere in industry. A strong baseline is how you know if deep learning is worth it.

**Topics:** OLS & polynomial · Ridge / Lasso · Logistic & softmax · Decision boundaries · Interpretability

### Study guide

1. Read ISLP chapters 3 (Linear Regression) and 4 (Classification); run the Python labs.
2. Read scikit-learn's linear models guide and experiment with Ridge/Lasso alphas.
3. Read the CS229 notes on linear regression (incl. the probabilistic interpretation), logistic regression and GLMs.
4. Read d2l.ai linear regression chapter to see the same model in deep-learning style.

### Resources

- [ISLP — Chapters 3, 4, 6](https://www.statlearning.com/) — *book*
- [scikit-learn: Linear Models](https://scikit-learn.org/stable/modules/linear_model.html) — *docs*
- [Stanford CS229 lecture notes](https://cs229.stanford.edu/main_notes.pdf) — *article* · PDF (downloads) · linear regression, logistic regression & GLM sections
- [Dive into Deep Learning: Linear Regression](https://d2l.ai/chapter_linear-regression/index.html) — *book*
- [StatQuest: Logistic Regression](https://www.youtube.com/playlist?list=PLblh5JKOoLUKxzEP5HA2d-Li7IJkHfXSe) — *video*

**Alternatives** (different format or teaching style):

- [The Elements of Statistical Learning (free PDF)](https://hastie.su.domains/ElemStatLearn/) — *book* · Ch. 3–4, more mathematical than ISLP
- [Google MLCC: Linear regression](https://developers.google.com/machine-learning/crash-course/linear-regression) — *course*
- [Google MLCC: Logistic regression](https://developers.google.com/machine-learning/crash-course/logistic-regression) — *course*

### Checklist

- [ ] ISLP ch.3 + Python lab (linear regression)
- [ ] ISLP ch.4 + Python lab (logistic regression, LDA, Naive Bayes)
- [ ] ISLP ch.6 sections on Ridge & Lasso + lab
- [ ] scikit-learn: fit LinearRegression, Ridge, Lasso; plot coefficients vs alpha
- [ ] Polynomial features + regularisation: show overfitting then fix it
- [ ] Implement softmax regression in NumPy for 3+ classes
- [ ] Read the CS229 notes sections on linear regression, logistic regression & GLMs
- [ ] Interpret coefficients of a logistic model in terms of odds

### Project

House price predictor: feature engineering + Ridge/Lasso with cross-validated alpha, residual analysis plots, and a write-up of the most important features.

### Self-test

1. What do Lasso and Ridge do differently to coefficients?
2. Why is logistic regression a linear classifier?
3. What is multicollinearity and why does it hurt interpretation?

## kNN, SVM & Naive Bayes

**≈ 15 hours** · Requires: Regression & Classification · Unlocks: —

Distance-based, margin-based and probabilistic classifiers; the kernel trick; when each shines.

**Why it matters:** They broaden your intuition (distances, margins, priors) and remain strong choices for small data and text.

**Topics:** k-Nearest Neighbours · Support Vector Machines · Kernel trick · Naive Bayes · Curse of dimensionality

### Study guide

1. Read ISLP chapter 9 (Support Vector Machines) and run the lab.
2. Read scikit-learn guides on Nearest Neighbors, SVM and Naive Bayes.
3. Watch StatQuest videos on SVMs, kernels and Naive Bayes.
4. Compare all three on one dataset with proper cross-validation.

### Resources

- [ISLP — Chapter 9 (SVMs)](https://www.statlearning.com/) — *book*
- [scikit-learn: Support Vector Machines](https://scikit-learn.org/stable/modules/svm.html) — *docs*
- [scikit-learn: Nearest Neighbors](https://scikit-learn.org/stable/modules/neighbors.html) — *docs*
- [scikit-learn: Naive Bayes](https://scikit-learn.org/stable/modules/naive_bayes.html) — *docs*
- [StatQuest: Machine Learning playlist](https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF) — *video* · SVM, Naive Bayes, kNN episodes

**Alternatives** (different format or teaching style):

- [A Practical Guide to SVM Classification (LIBSVM)](https://www.csie.ntu.edu.tw/~cjlin/papers/guide/guide.pdf) — *article* · PDF · how to actually tune SVMs
- [The Elements of Statistical Learning](https://hastie.su.domains/ElemStatLearn/) — *book* · Ch. 12 (SVMs) & 13 (nearest neighbours)
- [Python Data Science Handbook ch.5: SVMs](https://jakevdp.github.io/PythonDataScienceHandbook/05.07-support-vector-machines.html) — *book*

### Checklist

- [ ] Implement kNN from scratch in NumPy; tune k with cross-validation
- [ ] Explain the curse of dimensionality with a quick simulation
- [ ] ISLP ch.9 + lab (SVM)
- [ ] Visualise SVM decision boundaries for linear, polynomial, RBF kernels
- [ ] Train Multinomial Naive Bayes on a text dataset (e.g., 20 Newsgroups)
- [ ] Compare kNN, SVM, NB, logistic regression with cross-validation on one dataset

### Project

SMS spam classifier: TF-IDF + Naive Bayes vs linear SVM, with precision/recall analysis and a small Gradio or CLI demo.

### Self-test

1. Why must you scale features for kNN and SVM?
2. What does the kernel trick avoid computing?
3. Why is Naive Bayes "naive"?

## Trees, Random Forests & Boosting

**≈ 30 hours** · Requires: Regression & Classification · Unlocks: Kaggle Competitions

Decision trees, bagging, random forests, gradient boosting (XGBoost, LightGBM, CatBoost) and feature importance.

**Why it matters:** Gradient-boosted trees win most tabular-data problems in industry and on Kaggle. You must know them deeply.

**Topics:** Decision trees · Bagging & Random Forest · Gradient boosting · XGBoost / LightGBM · Feature importance & SHAP

### Study guide

1. Read ISLP chapter 8 (Tree-Based Methods) and run the lab.
2. Watch StatQuest: Decision Trees, Random Forests, AdaBoost, Gradient Boost (parts 1–4), XGBoost (parts 1–4).
3. Read XGBoost's "Introduction to Boosted Trees" doc.
4. Do Kaggle Learn "Intermediate Machine Learning" (pipelines, XGBoost, leakage).
5. Learn SHAP values for explaining tree models.

### Resources

- [ISLP — Chapter 8 (Tree-Based Methods)](https://www.statlearning.com/) — *book*
- [XGBoost: Introduction to Boosted Trees](https://xgboost.readthedocs.io/en/stable/tutorials/model.html) — *docs*
- [scikit-learn: Ensemble methods](https://scikit-learn.org/stable/modules/ensemble.html) — *docs*
- [Kaggle Learn: Intermediate Machine Learning](https://www.kaggle.com/learn/intermediate-machine-learning) — *course*
- [LightGBM documentation](https://lightgbm.readthedocs.io/en/stable/) — *docs*
- [SHAP documentation](https://shap.readthedocs.io/en/latest/) — *docs*

**Alternatives** (different format or teaching style):

- [Interpretable Machine Learning (Molnar)](https://christophm.github.io/interpretable-ml-book/) — *book* · Free book · SHAP & feature importance chapters
- [The Elements of Statistical Learning](https://hastie.su.domains/ElemStatLearn/) — *book* · Ch. 9, 10, 15 (trees, boosting, random forests)
- [Python Data Science Handbook ch.5: Random Forests](https://jakevdp.github.io/PythonDataScienceHandbook/05.08-random-forests.html) — *book*

### Checklist

- [ ] ISLP ch.8 + lab
- [ ] StatQuest: Decision Trees + Random Forests
- [ ] StatQuest: AdaBoost + Gradient Boost parts 1–4
- [ ] StatQuest: XGBoost parts 1–4
- [ ] Implement a decision tree (classification, Gini) from scratch
- [ ] Read XGBoost "Introduction to Boosted Trees"
- [ ] Kaggle Intermediate ML (all lessons)
- [ ] Tune XGBoost/LightGBM with early stopping on a validation set
- [ ] Explain a model with SHAP summary + dependence plots

### Project

Customer churn prediction: compare logistic regression, Random Forest, XGBoost and LightGBM; tune the best, explain it with SHAP, and report business-facing insights.

### Self-test

1. How does bagging reduce variance?
2. What does each new tree fit in gradient boosting?
3. Why can impurity-based feature importance be misleading?

## Unsupervised Learning

**≈ 20 hours** · Requires: ML Foundations · Unlocks: —

Clustering (k-means, hierarchical, DBSCAN, GMM), dimensionality reduction (PCA, t-SNE, UMAP) and anomaly detection.

**Why it matters:** Most real data is unlabeled. Clustering, embeddings visualisation and anomaly detection are everyday tools.

**Topics:** k-means · Hierarchical & DBSCAN · Gaussian mixtures · PCA · t-SNE / UMAP · Anomaly detection

### Study guide

1. Read ISLP chapter 12 (Unsupervised Learning) and run the lab.
2. Watch StatQuest PCA (step-by-step), k-means and hierarchical clustering.
3. Read scikit-learn clustering guide; compare algorithms on its toy datasets.
4. Read Distill "How to Use t-SNE Effectively" and the UMAP docs.

### Resources

- [ISLP — Chapter 12](https://www.statlearning.com/) — *book*
- [scikit-learn: Clustering](https://scikit-learn.org/stable/modules/clustering.html) — *docs*
- [scikit-learn: Decomposition (PCA)](https://scikit-learn.org/stable/modules/decomposition.html) — *docs*
- [Distill: How to Use t-SNE Effectively](https://distill.pub/2016/misread-tsne/) — *article*
- [UMAP documentation](https://umap-learn.readthedocs.io/en/latest/) — *docs*
- [scikit-learn: Novelty & Outlier Detection](https://scikit-learn.org/stable/modules/outlier_detection.html) — *docs*

**Alternatives** (different format or teaching style):

- [A Tutorial on Principal Component Analysis (Shlens)](https://arxiv.org/abs/1404.1100) — *article*
- [Understanding UMAP (Google PAIR)](https://pair-code.github.io/understanding-umap/) — *article* · Interactive
- [Python Data Science Handbook ch.5: PCA](https://jakevdp.github.io/PythonDataScienceHandbook/05.09-principal-component-analysis.html) — *book*

### Checklist

- [ ] ISLP ch.12 + lab
- [ ] StatQuest: PCA step-by-step
- [ ] Implement PCA from scratch with SVD; compare to sklearn
- [ ] Compare k-means, DBSCAN, Agglomerative, GMM on sklearn toy datasets
- [ ] Choose k with elbow + silhouette score
- [ ] Read Distill t-SNE article; visualise MNIST with t-SNE and UMAP
- [ ] Detect anomalies with Isolation Forest on a transactions dataset

### Project

Customer segmentation: cluster an e-commerce dataset (RFM features), visualise with PCA/UMAP, and describe each segment as a persona.

### Self-test

1. Why must you standardise before PCA?
2. When does k-means fail?
3. Why shouldn't you read distances between t-SNE clusters literally?

## Evaluation, Validation & Feature Engineering

**≈ 20 hours** · Requires: Regression & Classification, Exploratory Data Analysis · Unlocks: Kaggle Competitions, Responsible AI & Safety

Metrics (precision/recall/F1, ROC-AUC, PR-AUC, RMSE/MAE), cross-validation schemes, hyperparameter search, pipelines, and feature engineering.

**Why it matters:** Picking the wrong metric or validation scheme silently ruins projects. Feature engineering is still the biggest lever on tabular data.

**Topics:** Classification metrics · Regression metrics · Cross-validation · Hyperparameter tuning · Pipelines · Feature engineering

### Study guide

1. Read scikit-learn guides: Model evaluation, Cross-validation and Tuning hyperparameters.
2. Do Kaggle Learn "Feature Engineering" (mutual information, clustering features, PCA, target encoding).
3. Build everything with sklearn Pipelines + ColumnTransformer to prevent leakage.
4. Read Google's "Rules of Machine Learning" (first 20 rules).

### Resources

- [scikit-learn: Model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html) — *docs*
- [scikit-learn: Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html) — *docs*
- [scikit-learn: Pipelines & composite estimators](https://scikit-learn.org/stable/modules/compose.html) — *docs*
- [Kaggle Learn: Feature Engineering](https://www.kaggle.com/learn/feature-engineering) — *course*
- [Google: Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml) — *article*
- [Optuna (hyperparameter optimisation)](https://optuna.org/) — *tool*

**Alternatives** (different format or teaching style):

- [Feature Engineering and Selection (Kuhn & Johnson)](https://bookdown.org/max/FES/) — *book* · Free online
- [Google MLCC: Classification metrics](https://developers.google.com/machine-learning/crash-course/classification) — *course*
- [imbalanced-learn docs](https://imbalanced-learn.org/stable/) — *docs*

### Checklist

- [ ] Compute precision, recall, F1, ROC-AUC, PR-AUC by hand for a small example
- [ ] Plot ROC and precision–recall curves; choose a threshold for a business goal
- [ ] Use StratifiedKFold, GroupKFold and TimeSeriesSplit appropriately
- [ ] Build a Pipeline with ColumnTransformer (impute, scale, one-hot)
- [ ] GridSearchCV vs RandomizedSearchCV vs Optuna on the same model
- [ ] Kaggle Feature Engineering (all lessons)
- [ ] Handle class imbalance: class weights vs resampling; compare results
- [ ] Read Rules of ML 1–20

### Project

Credit-card fraud detection on imbalanced data: leakage-free pipeline, PR-AUC focus, threshold tuning for a cost matrix, and a model card.

### Self-test

1. When is accuracy a terrible metric?
2. Why fit the scaler inside cross-validation folds?
3. Which CV scheme for time series and why?

## Kaggle Competitions

**≈ 35 hours** · Requires: Trees, Random Forests & Boosting, Evaluation, Validation & Feature Engineering · Unlocks: Portfolio & ML Interviews

Apply everything end-to-end under competition pressure: baselines, validation strategy, feature engineering, ensembling.

**Why it matters:** Competitions teach practical judgement faster than any course and give you a public, ranked track record.

**Topics:** Baselines · Validation strategy · Feature iteration · Ensembling & stacking · Learning from top solutions

### Study guide

1. Start with Titanic and House Prices; get a working submission on day 1.
2. Read "Approaching (Almost) Any Machine Learning Problem" for a battle-tested workflow.
3. Join an active Playground Series competition; submit at least 10 iterations.
4. After each competition ends, read the top 3 solution write-ups and reproduce one idea.

### Resources

- [Kaggle: Titanic](https://www.kaggle.com/competitions/titanic) — *practice*
- [Kaggle: House Prices](https://www.kaggle.com/competitions/house-prices-advanced-regression-techniques) — *practice*
- [Kaggle competitions (Playground Series)](https://www.kaggle.com/competitions) — *practice*
- [Approaching (Almost) Any ML Problem — Abhishek Thakur](https://github.com/abhishekkrthakur/approachingalmost) — *book* · Free PDF
- [Kaggle Learn courses](https://www.kaggle.com/learn) — *course*

**Alternatives** (different format or teaching style):

- [DrivenData competitions](https://www.drivendata.org/competitions/) — *practice* · Social-impact ML competitions
- [Zindi competitions](https://zindi.africa/competitions) — *practice*

### Checklist

- [ ] Titanic: baseline submission
- [ ] Titanic: feature engineering + tuned model (top 30%)
- [ ] House Prices: baseline + log-target + gradient boosting
- [ ] Read "Approaching (Almost) Any ML Problem" chapters on CV, evaluation, categorical features
- [ ] Join a Playground Series competition and make 10+ submissions
- [ ] Build a simple blend/stack of 3 models and measure the CV gain
- [ ] Read top-3 solution write-ups for a finished competition
- [ ] Publish a clean, documented notebook for one competition

### Project

Finish a Playground Series competition in the top 25% with a public notebook explaining your validation, features and ensemble.

### Self-test

1. Why can public leaderboard score mislead?
2. How do you make CV correlate with the leaderboard?
3. What makes ensembling work?

---

# Phase 4 · Deep Learning

*Advanced · 6 nodes · 160 hours*

| Node | Hours | Requires |
|---|---|---|
| [Neural Networks from Scratch](#neural-networks-from-scratch) | 25 | ML Foundations, Optimization & Information Theory |
| [PyTorch](#pytorch) | 30 | Neural Networks from Scratch |
| [Training Deep Nets Well](#training-deep-nets-well) | 25 | PyTorch |
| [Convolutional Networks & Vision](#convolutional-networks-vision) | 30 | Training Deep Nets Well |
| [Sequence Models & Language Modeling](#sequence-models-language-modeling) | 25 | Training Deep Nets Well |
| [Practical Deep Learning (fast.ai)](#practical-deep-learning-fastai) | 25 | Convolutional Networks & Vision |

## Neural Networks from Scratch

**≈ 25 hours** · Requires: ML Foundations, Optimization & Information Theory · Unlocks: PyTorch

Neurons, layers, activations, forward pass, backpropagation and a scalar autograd engine built from nothing.

**Why it matters:** If you can build backprop yourself, frameworks stop being magic, and debugging gradients becomes possible.

**Topics:** Perceptron & MLP · Activations · Backpropagation · Autograd · Initialisation

### Study guide

1. Watch 3Blue1Brown Neural Networks chapters 1–4.
2. Watch Karpathy "The spelled-out intro to neural networks and backpropagation: building micrograd" and code along line by line.
3. Read Michael Nielsen's Neural Networks and Deep Learning chapters 1–3.
4. Read CS231n backprop notes; derive gradients of an MLP on paper.

### Resources

- [Karpathy: Building micrograd (video)](https://www.youtube.com/watch?v=VMj-3S1tku0) — *video* · Code along — essential
- [micrograd repository](https://github.com/karpathy/micrograd) — *tool*
- [3Blue1Brown — Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) — *video*
- [Neural Networks and Deep Learning (Nielsen)](http://neuralnetworksanddeeplearning.com/) — *book*
- [CS231n: Backpropagation notes](https://cs231n.github.io/optimization-2/) — *article*

**Alternatives** (different format or teaching style):

- [Understanding Deep Learning (Simon Prince)](https://udlbook.github.io/udlbook/) — *book* · Free PDF · ch. 3–7
- [d2l.ai ch.5: Multilayer Perceptrons](https://d2l.ai/chapter_multilayer-perceptrons/index.html) — *book*
- [CS231n notes: Neural Networks Part 1](https://cs231n.github.io/neural-networks-1/) — *article*

### Checklist

- [ ] 3B1B Neural Networks ch.1–2 (structure, gradient descent)
- [ ] 3B1B Neural Networks ch.3–4 (backpropagation & calculus)
- [ ] Karpathy micrograd: code along, first half (Value class, manual backprop)
- [ ] Karpathy micrograd: second half (autograd, MLP, training loop)
- [ ] Nielsen ch.1–2
- [ ] Nielsen ch.3 (cross-entropy, regularisation, initialisation)
- [ ] CS231n backprop notes; derive MLP gradients on paper
- [ ] Train your own NumPy MLP on MNIST to >95% accuracy

### Project

Write a mini deep-learning library in NumPy (Linear, ReLU, Softmax-CE, SGD/Adam) and train an MLP on MNIST — no frameworks.

### Self-test

1. Why do we need non-linear activations?
2. What causes vanishing gradients?
3. Explain backprop as the chain rule on a computation graph.

## PyTorch

**≈ 30 hours** · Requires: Neural Networks from Scratch · Unlocks: Training Deep Nets Well, Reproducible ML & Experiment Tracking, GPUs, Performance & Distributed Training

Tensors, autograd, nn.Module, Dataset/DataLoader, training loops, GPU/Apple-Silicon (MPS) acceleration, saving and loading models.

**Why it matters:** PyTorch is the dominant framework in research and industry. Every paper implementation you read will use it.

**Topics:** Tensors & autograd · nn.Module · Dataset & DataLoader · Training loop · MPS / CUDA · Checkpointing

### Study guide

1. Do the official "Learn the Basics" tutorial (8 parts).
2. Work through learnpytorch.io sections 00–04 (fundamentals → custom datasets).
3. Enable the MPS backend on your Mac and benchmark CPU vs MPS.
4. Re-implement your NumPy MLP in PyTorch and confirm identical results.
5. Use free Colab/Kaggle GPUs for heavier training.

### Resources

- [PyTorch: Learn the Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html) — *docs*
- [Zero to Mastery: Learn PyTorch (learnpytorch.io)](https://www.learnpytorch.io/) — *book* · Free full course
- [PyTorch MPS backend (Apple Silicon)](https://docs.pytorch.org/docs/stable/notes/mps.html) — *docs*
- [PyTorch documentation](https://docs.pytorch.org/docs/stable/index.html) — *docs*
- [Google Colab (free GPU)](https://colab.research.google.com/) — *tool*
- [Dive into Deep Learning (PyTorch)](https://d2l.ai/) — *book*

**Alternatives** (different format or teaching style):

- [PyTorch: Deep Learning with PyTorch — 60 Minute Blitz](https://docs.pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — *docs*
- [UvA Deep Learning tutorials (PyTorch)](https://uvadlc-notebooks.readthedocs.io/en/latest/) — *book* · Notebook-based
- [Sebastian Raschka: PyTorch in One Hour](https://sebastianraschka.com/teaching/pytorch-1h/) — *article*

### Checklist

- [ ] PyTorch Learn the Basics: tensors, datasets, transforms
- [ ] PyTorch Learn the Basics: build model, autograd, optimisation, save/load
- [ ] learnpytorch.io 00: fundamentals
- [ ] learnpytorch.io 01: workflow
- [ ] learnpytorch.io 02: classification
- [ ] learnpytorch.io 03: computer vision
- [ ] learnpytorch.io 04: custom datasets
- [ ] Run training on MPS (device="mps") and compare speed with CPU
- [ ] Write a reusable train/eval loop with checkpoints and metrics logging

### Project

Fashion-MNIST classifier in PyTorch with your own Dataset, training loop, early stopping, TensorBoard logging, and a saved checkpoint you can reload for inference.

### Self-test

1. What does `loss.backward()` actually compute and store?
2. Why call `optimizer.zero_grad()`?
3. model.train() vs model.eval()?

## Training Deep Nets Well

**≈ 25 hours** · Requires: PyTorch · Unlocks: Convolutional Networks & Vision, Sequence Models & Language Modeling, LLMs: Pretraining, Fine-tuning & Alignment, Reinforcement Learning

Optimisers, learning-rate schedules, initialisation, batch/layer norm, dropout, weight decay, augmentation, mixed precision, and debugging.

**Why it matters:** The difference between a model that trains and one that doesn't is usually these details, not the architecture.

**Topics:** Optimisers & LR schedules · Normalisation · Regularisation · Debugging training · Mixed precision

### Study guide

1. Read Karpathy's "A Recipe for Training Neural Networks" — follow it on every project from now on.
2. Watch Karpathy makemore part 3 (activations, gradients, BatchNorm).
3. Read d2l.ai chapters on optimisation algorithms and modern practices.
4. Read Google's Deep Learning Tuning Playbook.
5. Optional depth: Andrew Ng Deep Learning Specialization Course 2 (audit).

### Resources

- [Karpathy: A Recipe for Training Neural Networks](https://karpathy.github.io/2019/04/25/recipe/) — *article*
- [Google: Deep Learning Tuning Playbook](https://github.com/google-research/tuning_playbook) — *article*
- [d2l.ai: Optimization Algorithms](https://d2l.ai/chapter_optimization/index.html) — *book*
- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/) — *book* · Ch. 7–8
- [Deep Learning Specialization (Ng) — audit free](https://www.coursera.org/specializations/deep-learning) — *course* · Free to audit; certificate is paid; financial aid available
- [Karpathy: makemore Part 3 (BatchNorm)](https://www.youtube.com/watch?v=P6sfmUTpUmc) — *video*

**Alternatives** (different format or teaching style):

- [Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/) — *book* · Ch. 6–9: training, initialisation, regularisation
- [CS231n notes: Neural Networks Parts 2 & 3](https://cs231n.github.io/neural-networks-2/) — *article*
- [Deep Learning book ch.11: Practical Methodology](https://www.deeplearningbook.org/contents/guidelines.html) — *book*

### Checklist

- [ ] Read "A Recipe for Training Neural Networks"
- [ ] Karpathy makemore part 3: activations, gradients, BatchNorm
- [ ] d2l: SGD, momentum, Adam, LR scheduling chapters
- [ ] Run an LR range test and use a one-cycle / cosine schedule
- [ ] Compare no-norm vs BatchNorm vs LayerNorm on the same model
- [ ] Use dropout + weight decay; plot train/val curves to show the effect
- [ ] Overfit a single batch on purpose (sanity check)
- [ ] Read Goodfellow ch.7 (Regularisation) and ch.8 (Optimisation)
- [ ] Read the Tuning Playbook

### Project

Ablation study: train the same CNN with 6 controlled changes (optimizer, schedule, norm, dropout, augmentation, init) and publish a results table with analysis.

### Self-test

1. Why does BatchNorm help optimisation?
2. Your loss is NaN — list 5 things to check.
3. What does warmup fix?

## Convolutional Networks & Vision

**≈ 30 hours** · Requires: Training Deep Nets Well · Unlocks: Practical Deep Learning (fast.ai), Modern Computer Vision, Generative Models & Diffusion

Convolutions, pooling, receptive fields, classic architectures (LeNet → ResNet), transfer learning and data augmentation.

**Why it matters:** CNNs are the foundation of computer vision and taught the field most of its training tricks.

**Topics:** Convolution & pooling · LeNet / VGG / ResNet · Transfer learning · Augmentation · Visualisation

### Study guide

1. Follow Stanford CS231n notes modules 1–2 and watch the lecture videos.
2. Read d2l.ai chapters on CNNs and modern CNNs (ResNet).
3. Do the PyTorch transfer-learning tutorial.
4. Read Distill "Feature Visualization" to see what CNNs learn.

### Resources

- [Stanford CS231n course notes](https://cs231n.github.io/) — *course*
- [CS231n course site (lectures & assignments)](https://cs231n.stanford.edu/) — *course*
- [d2l.ai: Convolutional Neural Networks](https://d2l.ai/chapter_convolutional-neural-networks/index.html) — *book*
- [PyTorch: Transfer Learning tutorial](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html) — *docs*
- [Distill: Feature Visualization](https://distill.pub/2017/feature-visualization/) — *article*
- [ResNet paper (He et al.)](https://arxiv.org/abs/1512.03385) — *article*

**Alternatives** (different format or teaching style):

- [CNN Explainer (interactive)](https://poloclub.github.io/cnn-explainer/) — *tool*
- [Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/) — *book* · Ch. 10: convolutional networks
- [d2l.ai ch.8: Modern CNNs](https://d2l.ai/chapter_convolutional-modern/index.html) — *book*

### Checklist

- [ ] CS231n notes: convolutional networks
- [ ] Compute output shapes for conv/pool layers by hand
- [ ] d2l: CNN chapter (conv, padding, stride, pooling, LeNet)
- [ ] d2l: Modern CNNs (VGG, BatchNorm, ResNet)
- [ ] Read the ResNet paper
- [ ] Implement a ResNet block in PyTorch
- [ ] Train a CNN on CIFAR-10 to >85% accuracy
- [ ] Fine-tune a pretrained ResNet on a custom dataset (transfer learning)
- [ ] CS231n assignment 2 (or equivalent) completed

### Project

Custom image classifier: collect ~500 images of 5 classes, fine-tune a pretrained model, analyse failure cases with Grad-CAM, and deploy a Gradio demo.

### Self-test

1. Why do convolutions need fewer parameters than dense layers?
2. What problem do residual connections solve?
3. When would you freeze layers in transfer learning?

## Sequence Models & Language Modeling

**≈ 25 hours** · Requires: Training Deep Nets Well · Unlocks: Attention & Transformers

Embeddings, character-level language models, RNNs, LSTMs/GRUs, sequence-to-sequence and the origin of attention.

**Why it matters:** Sets up the transformer: you'll understand exactly what problem attention solved and how language models are trained.

**Topics:** Embeddings · Bigram & MLP LMs · RNN / LSTM / GRU · Seq2seq · Attention origins

### Study guide

1. Watch Karpathy's Neural Networks: Zero to Hero — makemore parts 1, 2, 4, 5 and code along.
2. Read Karpathy "The Unreasonable Effectiveness of RNNs" and colah "Understanding LSTMs".
3. Read d2l.ai chapters on RNNs and modern RNNs.
4. Read d2l.ai chapter 10 (LSTM, GRU, encoder–decoder, seq2seq, beam search) and work through CS224n's "Language Models and RNNs" lecture notes.

### Resources

- [Karpathy: Neural Networks — Zero to Hero](https://karpathy.ai/zero-to-hero.html) — *course* · makemore series
- [colah: Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) — *article*
- [Karpathy: The Unreasonable Effectiveness of RNNs](https://karpathy.github.io/2015/05/21/rnn-effectiveness/) — *article*
- [d2l.ai: Recurrent Neural Networks](https://d2l.ai/chapter_recurrent-neural-networks/index.html) — *book*
- [d2l.ai: Modern RNNs (LSTM, GRU, seq2seq)](https://d2l.ai/chapter_recurrent-modern/index.html) — *book*
- [Stanford CS224n: NLP with Deep Learning](https://web.stanford.edu/class/cs224n/) — *course* · See the "Language Models and RNNs" lecture

**Alternatives** (different format or teaching style):

- [Visualizing seq2seq with attention (Jay Alammar)](https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/) — *article*
- [Distill: Attention and Augmented RNNs](https://distill.pub/2016/augmented-rnns/) — *article*
- [Speech & Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/) — *book* · RNN & LSTM chapter

### Checklist

- [ ] makemore part 1: bigram language model
- [ ] makemore part 2: MLP language model
- [ ] makemore part 4: becoming a backprop ninja
- [ ] makemore part 5: WaveNet-style model
- [ ] Read colah "Understanding LSTMs"
- [ ] Read "Unreasonable Effectiveness of RNNs"
- [ ] d2l: RNN + LSTM/GRU chapters
- [ ] Train a char-level LSTM on a text corpus and sample from it
- [ ] d2l ch.10: encoder–decoder & seq2seq with beam search; CS224n "Language Models and RNNs" notes

### Project

Name/lyrics generator: train bigram → MLP → LSTM models on the same corpus and compare perplexity and samples in a report.

### Self-test

1. Why do vanilla RNNs struggle with long sequences?
2. What do LSTM gates do?
3. What is perplexity?

## Practical Deep Learning (fast.ai)

**≈ 25 hours** · Requires: Convolutional Networks & Vision · Unlocks: —

Top-down practical DL: getting state-of-the-art results quickly across vision, tabular, NLP and collaborative filtering, then deploying.

**Why it matters:** Complements bottom-up theory with practitioner instincts — and makes you ship working models fast.

**Topics:** Fine-tuning workflow · Tabular DL · Collaborative filtering · Deployment · From-scratch foundations

### Study guide

1. Watch Practical Deep Learning for Coders Part 1 (lessons 1–8); run every notebook on Kaggle/Colab.
2. Read the matching fastbook chapters.
3. After each lesson, do the "further research" question at the end of the chapter.
4. Ship the lesson 2 deployment exercise to Hugging Face Spaces.

### Resources

- [Practical Deep Learning for Coders (fast.ai)](https://course.fast.ai/) — *course*
- [fastbook (free notebooks)](https://github.com/fastai/fastbook) — *book*
- [Hugging Face Spaces](https://huggingface.co/docs/hub/spaces) — *tool*
- [Practical DL Part 2: Stable Diffusion from foundations](https://course.fast.ai/Lessons/part2.html) — *course* · Later, optional

**Alternatives** (different format or teaching style):

- [fastai library tutorials](https://docs.fast.ai/tutorial.html) — *docs*
- [Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/) — *book* · Theory companion to the practical course

### Checklist

- [ ] fast.ai lesson 1–2: getting started & deployment
- [ ] fast.ai lesson 3–4: neural net foundations, NLP
- [ ] fast.ai lesson 5–6: from-scratch model, random forests
- [ ] fast.ai lesson 7–8: collaborative filtering, convolutions
- [ ] fastbook: answer the end-of-chapter questionnaires for chapters 1–4
- [ ] Deploy one fast.ai model to Hugging Face Spaces

### Project

A movie recommender using collaborative filtering (fast.ai), with an explanation of learned embeddings and a deployed demo.

### Self-test

1. What is the learning-rate finder doing?
2. Why does fine-tuning use discriminative learning rates?
3. What do embedding dimensions represent in collaborative filtering?

---

# Phase 5 · Specializations

*Advanced · 7 nodes · 225 hours*

| Node | Hours | Requires |
|---|---|---|
| [Attention & Transformers](#attention-transformers) | 35 | Sequence Models & Language Modeling |
| [NLP with Hugging Face](#nlp-with-hugging-face) | 25 | Attention & Transformers |
| [LLMs: Pretraining, Fine-tuning & Alignment](#llms-pretraining-fine-tuning-alignment) | 40 | NLP with Hugging Face, Training Deep Nets Well |
| [Building LLM Apps & RAG](#building-llm-apps-rag) | 30 | NLP with Hugging Face |
| [Modern Computer Vision](#modern-computer-vision) | 30 | Convolutional Networks & Vision, Attention & Transformers |
| [Generative Models & Diffusion](#generative-models-diffusion) | 30 | Convolutional Networks & Vision, Optimization & Information Theory |
| [Reinforcement Learning](#reinforcement-learning) | 35 | Training Deep Nets Well, Probability & Statistics |

## Attention & Transformers

**≈ 35 hours** · Requires: Sequence Models & Language Modeling · Unlocks: NLP with Hugging Face, Modern Computer Vision, GPUs, Performance & Distributed Training, Reading Research Papers

Self-attention, multi-head attention, positional encodings, encoder/decoder stacks, and building a GPT from scratch.

**Why it matters:** The transformer powers LLMs, modern vision, speech, and multimodal models. It is the most important architecture of the decade.

**Topics:** Self-attention · Multi-head attention · Positional encoding · Encoder vs decoder · Tokenization · GPT from scratch

### Study guide

1. Watch 3Blue1Brown Deep Learning chapters 5–6 ("Transformers, the tech behind LLMs", "Attention in transformers").
2. Read Jay Alammar's "The Illustrated Transformer".
3. Watch Karpathy "Let's build GPT: from scratch, in code, spelled out" and code along fully.
4. Read "Attention Is All You Need" alongside "The Annotated Transformer".
5. Watch Karpathy "Let's build the GPT Tokenizer" and implement BPE.

### Resources

- [3Blue1Brown: Transformers, the tech behind LLMs](https://www.youtube.com/watch?v=wjZofJX0v4M) — *video*
- [3Blue1Brown: Attention in transformers](https://www.youtube.com/watch?v=eMlx5fFNoYc) — *video*
- [The Illustrated Transformer (Jay Alammar)](https://jalammar.github.io/illustrated-transformer/) — *article*
- [Karpathy: Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY) — *video* · Code along — essential
- [The Annotated Transformer (Harvard NLP)](https://nlp.seas.harvard.edu/annotated-transformer/) — *article*
- [Attention Is All You Need (paper)](https://arxiv.org/abs/1706.03762) — *article*
- [Karpathy: Let's build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE) — *video*
- [3Blue1Brown: How might LLMs store facts](https://www.youtube.com/watch?v=9-Jl0dxWQs8) — *video* · Deep Learning chapter 7

**Alternatives** (different format or teaching style):

- [Transformer Explainer (interactive)](https://poloclub.github.io/transformer-explainer/) — *tool*
- [The Illustrated GPT-2 (Jay Alammar)](https://jalammar.github.io/illustrated-gpt2/) — *article*
- [Lilian Weng: The Transformer Family v2](https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/) — *article*
- [Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/) — *book* · Ch. 12: transformers

### Checklist

- [ ] Watch 3B1B Deep Learning ch.5 (Transformers) + ch.6 (Attention)
- [ ] Read The Illustrated Transformer
- [ ] Karpathy "Let's build GPT": bigram baseline + self-attention (first half)
- [ ] Karpathy "Let's build GPT": multi-head, blocks, residuals, LayerNorm (second half)
- [ ] Read "Attention Is All You Need"
- [ ] Work through The Annotated Transformer
- [ ] Implement scaled dot-product + multi-head attention from scratch; test shapes
- [ ] Karpathy "Let's build the GPT Tokenizer"; implement byte-level BPE
- [ ] Explain causal masking and KV-cache in your own notes
- [ ] 3B1B Deep Learning ch.7: How might LLMs store facts

### Project

Train a small GPT (≈10M params) on a corpus of your choice on your Mac (MPS) or Colab; report loss curves, sample outputs, and an attention-map visualisation.

### Self-test

1. Why divide by √d_k in attention?
2. What does causal masking prevent?
3. Encoder-only vs decoder-only — examples and use cases?

## NLP with Hugging Face

**≈ 25 hours** · Requires: Attention & Transformers · Unlocks: LLMs: Pretraining, Fine-tuning & Alignment, Building LLM Apps & RAG, Open Source Contributions

The Hugging Face ecosystem: transformers, tokenizers, datasets, the Trainer API, fine-tuning BERT-style models, and the Hub.

**Why it matters:** Hugging Face is the standard toolkit for working with pretrained models. Fine-tuning a pretrained model beats training from scratch for most tasks.

**Topics:** pipelines · Tokenizers · datasets · Trainer / fine-tuning · Model Hub · Classic NLP tasks

### Study guide

1. Do the Hugging Face LLM Course chapters 1–4 (transformers, tokenizers, fine-tuning, sharing).
2. Continue chapters 5–7 (datasets, tokenizers library, main NLP tasks).
3. Skim Jurafsky & Martin SLP3 chapters on embeddings and transformers for theory.
4. Fine-tune a model for classification and one for token classification (NER).

### Resources

- [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) — *course*
- [Hugging Face Transformers docs](https://huggingface.co/docs/transformers/index) — *docs*
- [Hugging Face Datasets docs](https://huggingface.co/docs/datasets/index) — *docs*
- [Speech & Language Processing, 3rd ed. (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/) — *book*
- [Stanford CS224n](https://web.stanford.edu/class/cs224n/) — *course*

**Alternatives** (different format or teaching style):

- [NLP Course For You (Lena Voita)](https://lena-voita.github.io/nlp_course.html) — *course* · Beautiful written lectures
- [The Illustrated BERT (Jay Alammar)](https://jalammar.github.io/illustrated-bert/) — *article*

### Checklist

- [ ] HF course ch.1: transformer models & pipelines
- [ ] HF course ch.2: using transformers (models, tokenizers)
- [ ] HF course ch.3: fine-tuning a pretrained model with Trainer
- [ ] HF course ch.4: sharing models on the Hub
- [ ] HF course ch.5: the datasets library
- [ ] HF course ch.6: the tokenizers library
- [ ] HF course ch.7: classical NLP tasks (token classification/NER, QA, summarisation, translation)
- [ ] Fine-tune DistilBERT for sentiment classification; push to the Hub
- [ ] Build a semantic search with sentence embeddings + cosine similarity

### Project

Fine-tune a transformer on a domain-specific classification task (e.g., support-ticket routing), compare with a TF-IDF + logistic baseline, publish the model card on the Hub.

### Self-test

1. Why must you use the same tokenizer as the pretrained model?
2. What is [CLS] used for in BERT?
3. When is a TF-IDF baseline good enough?

## LLMs: Pretraining, Fine-tuning & Alignment

**≈ 40 hours** · Requires: NLP with Hugging Face, Training Deep Nets Well · Unlocks: Responsible AI & Safety

How LLMs are built: scaling laws, pretraining data, instruction tuning, LoRA/QLoRA, RLHF/DPO, quantisation and local inference.

**Why it matters:** LLMs are the center of the industry. Knowing how they are trained and adapted lets you build with them responsibly and efficiently.

**Topics:** Pretraining & scaling laws · Instruction tuning (SFT) · LoRA / QLoRA · RLHF & DPO · Quantisation · Local inference (MLX/Ollama)

### Study guide

1. Watch Karpathy "Let's reproduce GPT-2 (124M)" and study nanoGPT.
2. Watch Karpathy "Intro to Large Language Models" for the big picture.
3. Read the LoRA paper and the Hugging Face PEFT docs; fine-tune a small model with LoRA.
4. Read the HF blog on RLHF and the DPO paper.
5. Follow mlabonne's LLM Course "LLM Scientist" track for fine-tuning recipes.
6. Run open models locally with Ollama and Apple MLX.

### Resources

- [Karpathy: Let's reproduce GPT-2 (124M)](https://www.youtube.com/watch?v=l8pRSuU81PU) — *video*
- [Karpathy: Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g) — *video*
- [nanoGPT](https://github.com/karpathy/nanoGPT) — *tool*
- [mlabonne: LLM Course (roadmaps + notebooks)](https://github.com/mlabonne/llm-course) — *course*
- [Hugging Face PEFT docs](https://huggingface.co/docs/peft/index) — *docs*
- [LoRA paper](https://arxiv.org/abs/2106.09685) — *article*
- [HF blog: Illustrating RLHF](https://huggingface.co/blog/rlhf) — *article*
- [Apple MLX (run & fine-tune on Mac)](https://github.com/ml-explore/mlx-lm) — *tool*
- [Ollama (local LLMs)](https://ollama.com/) — *tool*
- [Chinchilla paper: Training Compute-Optimal LLMs](https://arxiv.org/abs/2203.15556) — *article*
- [DPO paper: Direct Preference Optimization](https://arxiv.org/abs/2305.18290) — *article*
- [Hugging Face LLM Course ch.11: Fine-tune LLMs](https://huggingface.co/learn/llm-course/chapter11/1) — *course*

**Alternatives** (different format or teaching style):

- [LLMs from Scratch — code (Sebastian Raschka)](https://github.com/rasbt/LLMs-from-scratch) — *book* · Free code & notebooks for the book
- [Chip Huyen: RLHF explained](https://huyenchip.com/2023/05/02/rlhf.html) — *article*
- [Unsloth docs (fast LoRA fine-tuning)](https://docs.unsloth.ai/) — *docs*

### Checklist

- [ ] Karpathy "Intro to Large Language Models"
- [ ] Karpathy "Let's reproduce GPT-2" — section 1: implementing the GPT-2 model & data loader
- [ ] Karpathy "Let's reproduce GPT-2" — sections 2–4: speedups, hyperparameters, results & evals
- [ ] Read nanoGPT train.py and model.py end-to-end
- [ ] Read the Chinchilla paper (abstract, approach & conclusions); explain compute-optimal training
- [ ] Read LoRA paper + PEFT docs
- [ ] Fine-tune a ~1B model with LoRA/QLoRA on an instruction dataset (Colab or MLX)
- [ ] Read HF RLHF blog + DPO paper abstract & method
- [ ] Quantise a model (4-bit) and compare speed/quality locally
- [ ] Run Llama/Qwen/Mistral locally with Ollama and with mlx-lm
- [ ] HF LLM Course ch.11: fine-tune large language models

### Project

Domain assistant: LoRA-fine-tune a small open model on a dataset you curate, evaluate before/after on 50 held-out prompts, and serve it locally via MLX or Ollama.

### Self-test

1. Why does LoRA reduce memory?
2. SFT vs RLHF vs DPO — what does each optimise?
3. What do scaling laws predict?

## Building LLM Apps & RAG

**≈ 30 hours** · Requires: NLP with Hugging Face · Unlocks: AI Agents & Evaluation

Prompting, structured outputs, tool use, embeddings and vector search, retrieval-augmented generation, and evaluating LLM apps.

**Why it matters:** Most AI engineering jobs today build products on top of foundation models. RAG is the most common production pattern.

**Topics:** Prompt engineering · Embeddings & vector DBs · Chunking & retrieval · RAG pipelines · Tool use / function calling · LLM evals

### Study guide

1. Read Anthropic's prompt engineering guide end to end; practise each technique on a real task.
2. Learn embeddings + vector search with sentence-transformers and a local vector store (FAISS / Chroma).
3. Build a RAG pipeline from scratch (no framework) first: chunk → embed → retrieve → generate → cite.
4. Read Hamel Husain's posts on LLM evals and build an eval set for your app.
5. Then try a framework (LlamaIndex or LangChain) and compare with your hand-built version.

### Resources

- [Anthropic: Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) — *docs*
- [Sentence-Transformers docs](https://www.sbert.net/) — *docs*
- [FAISS (vector similarity search)](https://github.com/facebookresearch/faiss) — *tool*
- [Chroma (local vector DB)](https://docs.trychroma.com/) — *tool*
- [Hamel Husain: Your AI product needs evals](https://hamel.dev/blog/posts/evals/) — *article*
- [DeepLearning.AI short courses (free)](https://www.deeplearning.ai/courses) — *course* · RAG, agents, evals
- [LlamaIndex docs](https://developers.llamaindex.ai/python/framework/) — *docs*

**Alternatives** (different format or teaching style):

- [Anthropic: Introducing Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) — *article*
- [Eugene Yan: Patterns for building LLM-based systems](https://eugeneyan.com/writing/llm-patterns/) — *article*
- [Pinecone Learn (vector search & RAG guides)](https://www.pinecone.io/learn/) — *article*

### Checklist

- [ ] Read a full prompt-engineering guide; rewrite 5 prompts with the techniques
- [ ] Get structured JSON output reliably from an LLM with a schema
- [ ] Compute embeddings with sentence-transformers; nearest-neighbour search with FAISS
- [ ] Implement chunking strategies (fixed, recursive, semantic) and compare retrieval
- [ ] Build a from-scratch RAG over your own notes/PDFs with citations
- [ ] Add hybrid search (BM25 + vectors) and a reranker; measure improvement
- [ ] Implement tool/function calling for one real tool (e.g., calculator, web search)
- [ ] Build an eval set of 30+ questions and score retrieval + answer quality
- [ ] Do 2 DeepLearning.AI short courses on RAG/evals

### Project

"Chat with my study notes": a RAG app over everything you've written in this roadmap, with citations, an eval suite, and a simple web UI — runs locally.

### Self-test

1. When is RAG better than fine-tuning?
2. How do you know if retrieval or generation is failing?
3. What is a reranker and why does it help?

## Modern Computer Vision

**≈ 30 hours** · Requires: Convolutional Networks & Vision, Attention & Transformers · Unlocks: —

Object detection, segmentation, Vision Transformers, CLIP and multimodal models, and self-supervised learning.

**Why it matters:** Vision powers robotics, medical imaging, retail, autonomous vehicles and multimodal AI.

**Topics:** Object detection (YOLO) · Segmentation (U-Net, SAM) · Vision Transformers · CLIP & multimodal · Self-supervised learning

### Study guide

1. Do the Hugging Face Community Computer Vision Course core units.
2. Read the ViT and CLIP papers; run them with transformers.
3. Train a YOLO detector on a custom dataset with Ultralytics.
4. Try Segment Anything for zero-shot segmentation.

### Resources

- [Hugging Face Computer Vision Course](https://huggingface.co/learn/computer-vision-course/unit0/welcome/welcome) — *course*
- [Ultralytics YOLO docs](https://docs.ultralytics.com/) — *docs*
- [ViT paper: An Image is Worth 16x16 Words](https://arxiv.org/abs/2010.11929) — *article*
- [CLIP paper](https://arxiv.org/abs/2103.00020) — *article*
- [Segment Anything (Meta)](https://github.com/facebookresearch/segment-anything) — *tool*
- [PyTorch: TorchVision object detection fine-tuning](https://docs.pytorch.org/tutorials/intermediate/torchvision_tutorial.html) — *docs*

**Alternatives** (different format or teaching style):

- [d2l.ai ch.14: Computer Vision](https://d2l.ai/chapter_computer-vision/index.html) — *book* · Detection, segmentation, transfer learning
- [YOLO paper (Redmon et al.)](https://arxiv.org/abs/1506.02640) — *article*
- [U-Net paper (Ronneberger et al.)](https://arxiv.org/abs/1505.04597) — *article*

### Checklist

- [ ] HF CV course units 1–3: fundamentals, CNNs, Vision Transformers
- [ ] Read the ViT paper; fine-tune a ViT on a small dataset
- [ ] Read the CLIP paper; do zero-shot classification with CLIP
- [ ] TorchVision detection fine-tuning tutorial
- [ ] Label a small custom dataset and train a YOLO detector
- [ ] Learn IoU, mAP and NMS; compute IoU by hand
- [ ] Run Segment Anything and a U-Net on a segmentation task
- [ ] HF CV course unit 6: basic CV tasks (detection & segmentation)

### Project

Real-time object detector for a custom domain (e.g., desk items) with YOLO, evaluated with mAP, running on your Mac webcam.

### Self-test

1. How does a ViT turn an image into tokens?
2. What does CLIP's contrastive loss align?
3. What is non-max suppression?

## Generative Models & Diffusion

**≈ 30 hours** · Requires: Convolutional Networks & Vision, Optimization & Information Theory · Unlocks: —

Autoencoders, VAEs, GANs, diffusion models and flow matching — the math and code behind image/audio generation.

**Why it matters:** Generative models create images, video, audio and molecules. Diffusion/flow matching are state of the art.

**Topics:** Autoencoders & VAEs · GANs · Diffusion (DDPM) · Flow matching · Latent diffusion & guidance

### Study guide

1. Read the VAE tutorial (Doersch) and implement a VAE on MNIST.
2. Read Lilian Weng's "What are Diffusion Models?".
3. Do the Hugging Face Diffusion Models Course units 1–3.
4. Study MIT 6.S184 (Flow Matching & Diffusion) lecture notes for the modern theory.
5. Generate with the diffusers library, then fine-tune with LoRA/DreamBooth.

### Resources

- [Hugging Face Diffusion Models Course](https://huggingface.co/learn/diffusion-course/unit0/1) — *course*
- [Lilian Weng: What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) — *article*
- [MIT 6.S184: Flow Matching & Diffusion Models](https://diffusion.csail.mit.edu/) — *course*
- [DDPM paper (Ho et al.)](https://arxiv.org/abs/2006.11239) — *article*
- [Tutorial on Variational Autoencoders (Doersch)](https://arxiv.org/abs/1606.05908) — *article*
- [Hugging Face diffusers docs](https://huggingface.co/docs/diffusers/index) — *docs*

**Alternatives** (different format or teaching style):

- [Stanford CS236: Deep Generative Models notes](https://deepgenerativemodels.github.io/notes/) — *article*
- [Yang Song: Score-based generative modeling](https://yang-song.net/blog/2021/score/) — *article*
- [Lilian Weng: From Autoencoder to Beta-VAE](https://lilianweng.github.io/posts/2018-08-12-vae/) — *article*
- [Understanding Deep Learning (Prince)](https://udlbook.github.io/udlbook/) — *book* · Ch. 14–18: generative models

### Checklist

- [ ] Implement an autoencoder then a VAE on MNIST; visualise the latent space
- [ ] Implement a simple DCGAN; observe mode collapse
- [ ] Read Lilian Weng's diffusion post
- [ ] Read the DDPM paper (method section)
- [ ] HF Diffusion course unit 1: implement a DDPM from scratch
- [ ] HF Diffusion course unit 2–3: guidance, conditioning, Stable Diffusion
- [ ] MIT 6.S184 lecture notes: flow matching
- [ ] Generate images with diffusers; try classifier-free guidance scales

### Project

Train a small class-conditional diffusion (or flow-matching) model on a 32×32 dataset and publish a sample grid with an explanation of the training objective.

### Self-test

1. What does the reparameterisation trick enable?
2. What does a diffusion model learn to predict?
3. What does classifier-free guidance trade off?

## Reinforcement Learning

**≈ 35 hours** · Requires: Training Deep Nets Well, Probability & Statistics · Unlocks: —

MDPs, value functions, Q-learning, policy gradients, actor–critic, PPO, and RL for LLMs (RLHF / RL with verifiable rewards).

**Why it matters:** RL drives game AI, robotics, recommendation and — increasingly — LLM reasoning and alignment.

**Topics:** MDPs & Bellman · Q-learning & DQN · Policy gradients · Actor–critic & PPO · RL for LLMs

### Study guide

1. Do the Hugging Face Deep RL Course units 1–4.
2. Read Sutton & Barto chapters 1–6 for foundations.
3. Read OpenAI Spinning Up "Introduction to RL" parts 1–3.
4. Watch David Silver's UCL RL lectures 1–7 for depth.
5. Implement DQN and PPO on Gymnasium environments.

### Resources

- [Hugging Face Deep RL Course](https://huggingface.co/learn/deep-rl-course/unit0/introduction) — *course*
- [OpenAI Spinning Up](https://spinningup.openai.com/en/latest/) — *course*
- [Sutton & Barto: Reinforcement Learning (2nd ed.)](http://incompleteideas.net/book/the-book-2nd.html) — *book*
- [David Silver: UCL Course on RL](https://davidstarsilver.wordpress.com/teaching/) — *course*
- [Gymnasium (environments)](https://gymnasium.farama.org/) — *tool*
- [Stable-Baselines3 docs](https://stable-baselines3.readthedocs.io/en/master/) — *tool*

**Alternatives** (different format or teaching style):

- [Lilian Weng: A (Long) Peek into Reinforcement Learning](https://lilianweng.github.io/posts/2018-02-19-rl-overview/) — *article*
- [The 37 Implementation Details of PPO](https://iclr-blog-track.github.io/2022/03/25/ppo-implementation-details/) — *article*
- [CleanRL (single-file RL implementations)](https://docs.cleanrl.dev/) — *tool*
- [Berkeley CS285: Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/) — *course*

### Checklist

- [ ] HF Deep RL unit 1–2: intro + Q-learning
- [ ] HF Deep RL unit 3: Deep Q-Learning with Atari
- [ ] HF Deep RL unit 4: policy gradient with PyTorch
- [ ] Sutton & Barto ch.1–3 (bandits, MDPs)
- [ ] Sutton & Barto ch.4–6 (DP, Monte Carlo, TD learning)
- [ ] Spinning Up: Intro to RL parts 1–3
- [ ] David Silver lectures 1–4
- [ ] Implement tabular Q-learning on FrozenLake from scratch
- [ ] Implement DQN on CartPole
- [ ] Train PPO with Stable-Baselines3 on LunarLander (pip install "gymnasium[box2d]")
- [ ] HF Deep RL unit 6: actor–critic methods (A2C)
- [ ] HF Deep RL unit 8: Proximal Policy Optimization (PPO)

### Project

Write a PPO implementation from scratch, solve LunarLander, and compare learning curves against Stable-Baselines3.

### Self-test

1. Explain the Bellman equation.
2. On-policy vs off-policy?
3. Why does PPO clip the objective?

---

# Phase 6 · ML Engineering

*Professional · 4 nodes · 90 hours*

| Node | Hours | Requires |
|---|---|---|
| [Reproducible ML & Experiment Tracking](#reproducible-ml-experiment-tracking) | 15 | PyTorch, Git & GitHub |
| [Model Serving & Deployment](#model-serving-deployment) | 25 | Reproducible ML & Experiment Tracking |
| [MLOps & ML System Design](#mlops-ml-system-design) | 30 | Model Serving & Deployment |
| [GPUs, Performance & Distributed Training](#gpus-performance-distributed-training) | 20 | PyTorch, Attention & Transformers |

## Reproducible ML & Experiment Tracking

**≈ 15 hours** · Requires: PyTorch, Git & GitHub · Unlocks: Model Serving & Deployment, Reproduce a Paper

Project structure, configs, seeds, data versioning, and experiment tracking so results can be trusted and repeated.

**Why it matters:** If you can't reproduce a result, you can't trust it, improve it, or ship it. Teams require this discipline.

**Topics:** Project structure · Configs (Hydra) · Experiment tracking · Data versioning (DVC) · Seeds & determinism

### Study guide

1. Adopt Cookiecutter Data Science structure for a project.
2. Track experiments with MLflow (local, free) and TensorBoard.
3. Version datasets with DVC.
4. Move hyperparameters to config files (Hydra or simple YAML).

### Resources

- [Cookiecutter Data Science](https://cookiecutter-data-science.drivendata.org/) — *docs*
- [MLflow docs](https://mlflow.org/docs/latest/index.html) — *docs*
- [PyTorch: TensorBoard logging](https://docs.pytorch.org/tutorials/recipes/recipes/tensorboard_with_pytorch.html) — *docs*
- [DVC: Get Started](https://doc.dvc.org/start) — *docs*
- [Hydra docs](https://hydra.cc/docs/intro/) — *docs*
- [PyTorch: Reproducibility](https://docs.pytorch.org/docs/stable/notes/randomness.html) — *docs*

**Alternatives** (different format or teaching style):

- [Made With ML: Experiment tracking](https://madewithml.com/courses/mlops/experiment-tracking/) — *course*
- [The Turing Way (reproducible research handbook)](https://book.the-turing-way.org/) — *book*

### Checklist

- [ ] Restructure one project with Cookiecutter Data Science layout
- [ ] Log params, metrics and artifacts with MLflow; compare runs in the UI
- [ ] Log a training run to TensorBoard and compare it with MLflow
- [ ] Version a dataset with DVC and switch between versions
- [ ] Move all hyperparameters to a config file
- [ ] Make a training run fully reproducible (seeds, deterministic flags)

### Project

Take your CNN project and make it fully reproducible: config-driven, tracked in MLflow, data under DVC, one command to re-run any experiment.

### Self-test

1. What belongs in Git vs DVC?
2. What must be logged to reproduce a run?
3. Why is full determinism hard on GPUs?

## Model Serving & Deployment

**≈ 25 hours** · Requires: Reproducible ML & Experiment Tracking · Unlocks: MLOps & ML System Design, Portfolio & ML Interviews

Wrap models in APIs (FastAPI), containerise with Docker, build demos (Gradio), optimise inference (ONNX), and deploy to the cloud.

**Why it matters:** A model that isn't deployed delivers no value. Being able to ship end-to-end is what makes you hireable.

**Topics:** FastAPI · Docker · Gradio / Streamlit demos · ONNX & optimisation · Cloud deployment · CI/CD

### Study guide

1. Do the FastAPI tutorial (User Guide) through request bodies, validation and testing.
2. Do Docker's Get Started guide; containerise a FastAPI model server.
3. Follow Made With ML lessons on serving and CI/CD.
4. Build a Gradio demo and deploy it to Hugging Face Spaces.
5. Export a model to ONNX and benchmark latency.

### Resources

- [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/) — *docs*
- [Docker: Get started](https://docs.docker.com/get-started/) — *docs*
- [Made With ML (Goku Mohandas)](https://madewithml.com/) — *course*
- [Gradio quickstart](https://www.gradio.app/guides/quickstart) — *docs*
- [ONNX Runtime docs](https://onnxruntime.ai/docs/) — *docs*
- [GitHub Actions docs](https://docs.github.com/en/actions) — *docs*

**Alternatives** (different format or teaching style):

- [Full Stack Deep Learning: Lecture 5 — Deployment](https://fullstackdeeplearning.com/course/2022/lecture-5-deployment/) — *course*
- [Docker Curriculum (free tutorial)](https://docker-curriculum.com/) — *article*
- [Streamlit docs](https://docs.streamlit.io/) — *docs*
- [BentoML docs (model serving)](https://docs.bentoml.com/) — *docs*

### Checklist

- [ ] FastAPI tutorial: path/query params, request bodies, Pydantic models
- [ ] Serve a scikit-learn model with FastAPI (/predict, /health)
- [ ] Write tests for the API with TestClient
- [ ] Docker Get Started; write a Dockerfile for your API
- [ ] Build a Gradio demo and deploy it to HF Spaces
- [ ] Export a PyTorch model to ONNX; compare latency with PyTorch
- [ ] Set up GitHub Actions to run tests + build the image on every push
- [ ] Made With ML: serving + CI/CD lessons

### Project

Production-style ML service: FastAPI + Docker + tests + GitHub Actions CI, with a Gradio front-end, deployed publicly (HF Spaces or a free cloud tier).

### Self-test

1. Batch vs real-time inference — trade-offs?
2. Why containerise a model?
3. How do you version a deployed model?

## MLOps & ML System Design

**≈ 30 hours** · Requires: Model Serving & Deployment · Unlocks: —

Pipelines, orchestration, feature stores, monitoring, data/concept drift, retraining, and designing ML systems end-to-end.

**Why it matters:** Real ML systems fail silently in production. ML system design is a core senior-level interview and job skill.

**Topics:** Pipelines & orchestration · Monitoring & drift · Retraining strategies · Feature stores · System design interviews

### Study guide

1. Work through DataTalks.Club MLOps Zoomcamp modules (free, self-paced).
2. Read Stanford CS329S (ML Systems Design) lecture notes.
3. Watch Full Stack Deep Learning 2022 lectures on deployment, monitoring and teams.
4. Add drift monitoring with Evidently to a deployed model.
5. Practise 5 ML system design questions (recommendation, search ranking, fraud, ads, feed).

### Resources

- [MLOps Zoomcamp (DataTalks.Club)](https://github.com/DataTalksClub/mlops-zoomcamp) — *course*
- [Stanford CS329S: ML Systems Design](https://stanford-cs329s.github.io/) — *course*
- [Full Stack Deep Learning 2022](https://fullstackdeeplearning.com/course/2022/) — *course*
- [Evidently AI docs (monitoring)](https://docs.evidentlyai.com/) — *tool*
- [Google Cloud: MLOps continuous delivery](https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning) — *article*
- [Chip Huyen: Real-time ML blog](https://huyenchip.com/2022/01/02/real-time-machine-learning-challenges-and-solutions.html) — *article*

**Alternatives** (different format or teaching style):

- [Made With ML (complete MLOps course)](https://madewithml.com/) — *course*
- [Chip Huyen: Data distribution shifts and monitoring](https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html) — *article*
- [ml-ops.org (MLOps principles)](https://ml-ops.org/) — *article*

### Checklist

- [ ] MLOps Zoomcamp module 1–2: intro + experiment tracking
- [ ] MLOps Zoomcamp module 3: orchestration (pipelines)
- [ ] MLOps Zoomcamp module 4: deployment
- [ ] MLOps Zoomcamp module 5: monitoring
- [ ] Read CS329S notes on data distribution shifts & monitoring
- [ ] FSDL 2022 lecture 5 (Deployment) + lecture 6 (Continual Learning & monitoring)
- [ ] Add Evidently drift reports to your deployed model
- [ ] Write up 3 ML system designs (requirements → data → model → serving → monitoring)

### Project

End-to-end MLOps pipeline: scheduled data ingestion → training → evaluation gate → deployment → drift monitoring → automatic retraining trigger.

### Self-test

1. Data drift vs concept drift?
2. How would you design a news-feed ranking system?
3. What metrics would you monitor in production?

## GPUs, Performance & Distributed Training

**≈ 20 hours** · Requires: PyTorch, Attention & Transformers · Unlocks: Master: Go Deep on a Frontier

How GPUs work, memory/compute bottlenecks, mixed precision, profiling, torch.compile, data/model/pipeline parallelism, and FSDP.

**Why it matters:** Modern models are limited by compute and memory. Engineers who can make training fast and fit are extremely valuable.

**Topics:** GPU basics · Profiling · Mixed precision · torch.compile · DDP / FSDP · Parallelism strategies

### Study guide

1. Read Horace He's "Making Deep Learning Go Brrrr From First Principles".
2. Read the PyTorch DDP tutorial and run multi-process training (even on CPU).
3. Read Hugging Face's "Ultra-Scale Playbook" on training LLMs across GPUs.
4. Read "How to Scale Your Model" (JAX scaling book) chapters on rooflines and sharding.
5. Profile one of your training loops and remove the biggest bottleneck.

### Resources

- [Making Deep Learning Go Brrrr (Horace He)](https://horace.io/brrr_intro.html) — *article*
- [Hugging Face: The Ultra-Scale Playbook](https://huggingface.co/spaces/nanotron/ultrascale-playbook) — *book*
- [How to Scale Your Model (Google DeepMind)](https://jax-ml.github.io/scaling-book/) — *book*
- [PyTorch: Getting started with DDP](https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html) — *docs*
- [PyTorch Profiler recipe](https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html) — *docs*
- [Kaggle notebooks (free GPU/TPU hours)](https://www.kaggle.com/code) — *tool*

**Alternatives** (different format or teaching style):

- [Machine Learning Engineering open book (Stas Bekman)](https://github.com/stas00/ml-engineering) — *book*
- [PyTorch: Automatic Mixed Precision recipe](https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html) — *docs*
- [PyTorch: Getting started with FSDP](https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html) — *docs*
- [GPU MODE lectures (CUDA, Triton)](https://github.com/gpu-mode/lectures) — *course*

### Checklist

- [ ] Read "Making Deep Learning Go Brrrr"
- [ ] Profile a training loop with the PyTorch profiler; fix the top bottleneck
- [ ] Use mixed precision (autocast) and measure speed/memory
- [ ] Try torch.compile and measure the speedup
- [ ] Run the DDP tutorial with 2 processes
- [ ] Read Ultra-Scale Playbook: data, tensor, pipeline parallelism sections
- [ ] Read the scaling book chapter on rooflines

### Project

Speedrun: take your nanoGPT training and make it ≥2× faster through profiling, mixed precision, compile and data-loader fixes — document each gain.

### Self-test

1. Compute-bound vs memory-bound?
2. What does FSDP shard?
3. Why does mixed precision need loss scaling (fp16)?

---

# Phase 7 · Mastery

*Master · 7 nodes · 232 hours*

| Node | Hours | Requires |
|---|---|---|
| [Reading Research Papers](#reading-research-papers) | 20 | Attention & Transformers |
| [Reproduce a Paper](#reproduce-a-paper) | 40 | Reading Research Papers, Reproducible ML & Experiment Tracking |
| [AI Agents & Evaluation](#ai-agents-evaluation) | 25 | Building LLM Apps & RAG |
| [Responsible AI & Safety](#responsible-ai-safety) | 12 | Evaluation, Validation & Feature Engineering, LLMs: Pretraining, Fine-tuning & Alignment |
| [Open Source Contributions](#open-source-contributions) | 25 | Git & GitHub, NLP with Hugging Face |
| [Portfolio & ML Interviews](#portfolio-ml-interviews) | 30 | Model Serving & Deployment, Kaggle Competitions |
| [Master: Go Deep on a Frontier](#master-go-deep-on-a-frontier) | 80 | Reproduce a Paper, AI Agents & Evaluation, GPUs, Performance & Distributed Training |

## Reading Research Papers

**≈ 20 hours** · Requires: Attention & Transformers · Unlocks: Reproduce a Paper

A system for finding, reading, and summarising ML papers efficiently, and keeping up with the field.

**Why it matters:** The field moves monthly. Masters learn from papers, not just courses.

**Topics:** Three-pass method · Finding papers · Summaries & notes · Landmark papers · Staying current

### Study guide

1. Read Keshav's "How to Read a Paper" (three-pass method).
2. Watch Andrew Ng's CS230 lecture on reading papers and career advice.
3. Read 1 landmark paper per week (ResNet, Attention, BERT, GPT-3, CLIP, DDPM, Chinchilla, InstructGPT, LoRA).
4. Follow Hugging Face Daily Papers and arXiv cs.LG; use alphaXiv to discuss.
5. Write a 1-page summary for every paper you read.

### Resources

- [How to Read a Paper (S. Keshav)](https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf) — *article*
- [Andrew Ng: Reading papers & career advice (CS230)](https://www.youtube.com/watch?v=733m6qBH-jI) — *video*
- [Hugging Face Daily Papers](https://huggingface.co/papers) — *tool*
- [arXiv cs.LG recent](https://arxiv.org/list/cs.LG/recent) — *tool*
- [alphaXiv (discuss papers)](https://www.alphaxiv.org/) — *tool*
- [Yannic Kilcher (paper explanations)](https://www.youtube.com/@YannicKilcher) — *video*
- [BERT (Devlin et al., 2018)](https://arxiv.org/abs/1810.04805) — *article*
- [GPT-3: Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165) — *article*
- [InstructGPT: Training LMs to follow instructions](https://arxiv.org/abs/2203.02155) — *article*
- [Chinchilla: Training Compute-Optimal LLMs](https://arxiv.org/abs/2203.15556) — *article*

**Alternatives** (different format or teaching style):

- [Semantic Scholar (search & citations)](https://www.semanticscholar.org/) — *tool*
- [Connected Papers (citation graphs)](https://www.connectedpapers.com/) — *tool*
- [Lilian Weng's blog (paper syntheses)](https://lilianweng.github.io/) — *article*

### Checklist

- [ ] Read "How to Read a Paper"; set up a paper-notes template
- [ ] Watch Andrew Ng CS230 reading-papers lecture
- [ ] Summarise BERT
- [ ] Summarise GPT-3 (Language Models are Few-Shot Learners)
- [ ] Summarise InstructGPT
- [ ] Summarise Chinchilla (compute-optimal training)
- [ ] Summarise one 2025–2026 paper from HF Daily Papers
- [ ] Explain one paper to someone else (blog, video, or friend)

### Project

A public "paper notes" repo/blog with 10 high-quality summaries (problem, method, results, limitations, your questions).

### Self-test

1. What do you read in the first pass of a paper?
2. How do you judge if a result is significant?
3. Name 5 landmark papers and their contribution.

## Reproduce a Paper

**≈ 40 hours** · Requires: Reading Research Papers, Reproducible ML & Experiment Tracking · Unlocks: Master: Go Deep on a Frontier

Re-implement a paper from scratch and match its reported results — the ultimate test of understanding.

**Why it matters:** Reproducing a paper forces you to resolve every ambiguity. It is the most respected portfolio item for research and senior roles.

**Topics:** Choosing a paper · Scoping compute · Implementation · Matching results · Write-up

### Study guide

1. Pick a paper with modest compute and clear numbers (e.g., ResNet on CIFAR, ViT-small, LoRA, DDPM on MNIST).
2. Read it 3 times; list every hyperparameter and unclear detail.
3. Implement from scratch; only consult reference code when stuck — study labml.ai annotated implementations.
4. Match the main table within error bars; run at least one ablation.
5. Write it up following ML Reproducibility Challenge guidelines.

### Resources

- [labml.ai annotated paper implementations](https://nn.labml.ai/) — *article*
- [ML Reproducibility Challenge](https://reproml.org/) — *article*
- [lucidrains — clean paper implementations](https://github.com/lucidrains) — *tool*
- [Hugging Face Papers (with code links)](https://huggingface.co/papers) — *tool*

**Alternatives** (different format or teaching style):

- [The Annotated Diffusion Model (Hugging Face)](https://huggingface.co/blog/annotated-diffusion) — *article* · Model for a paper walkthrough
- [nanoGPT (a clean GPT-2 reproduction)](https://github.com/karpathy/nanoGPT) — *tool*
- [Karpathy: A Recipe for Training Neural Networks](https://karpathy.github.io/2019/04/25/recipe/) — *article* · Debugging discipline for reproductions

### Checklist

- [ ] Choose a paper and write a scope document (compute, datasets, target numbers)
- [ ] Extract all hyperparameters & ambiguities into a list
- [ ] Implement data pipeline + model
- [ ] Implement training + evaluation; get a first result
- [ ] Debug until within error bars of the paper
- [ ] Run one ablation the paper did not
- [ ] Publish code + report on GitHub

### Project

A complete reproduction report + clean repo, shared on social media / the paper's discussion page.

### Self-test

1. What did the paper not tell you that you had to discover?
2. Which hyperparameter mattered most?
3. Did your ablation confirm the paper's claim?

## AI Agents & Evaluation

**≈ 25 hours** · Requires: Building LLM Apps & RAG · Unlocks: Master: Go Deep on a Frontier

Agent loops, tool use, the Model Context Protocol, planning and memory, multi-agent patterns, and rigorous evaluation of agentic systems.

**Why it matters:** Agentic systems are the frontier of applied AI. Knowing when they help — and how to measure them — separates hype from engineering.

**Topics:** Agent loop & tool use · Workflows vs agents · MCP · Memory & planning · Evals & tracing

### Study guide

1. Read Anthropic's "Building effective agents".
2. Read Lilian Weng's "LLM Powered Autonomous Agents".
3. Do the Hugging Face Agents Course.
4. Build an MCP server exposing one of your own tools.
5. Build an eval harness with traces, success criteria and regression tests.

### Resources

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — *article*
- [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/unit0/introduction) — *course*
- [Model Context Protocol docs](https://modelcontextprotocol.io/) — *docs*
- [Lilian Weng: LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) — *article*
- [Hamel Husain: LLM evals](https://hamel.dev/blog/posts/evals/) — *article*

**Alternatives** (different format or teaching style):

- [Chip Huyen: Agents](https://huyenchip.com/2025/01/07/agents.html) — *article*
- [Anthropic: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — *article*
- [ReAct paper (reasoning + acting)](https://arxiv.org/abs/2210.03629) — *article*

### Checklist

- [ ] Read "Building effective agents"; list the 5 workflow patterns
- [ ] Read Lilian Weng's agents post
- [ ] HF Agents Course units 1–2
- [ ] HF Agents Course units 3–4
- [ ] Build a tool-using agent from scratch (no framework) with a loop + tool registry
- [ ] Build an MCP server for one of your tools and connect it to a client
- [ ] Create an eval set + automated grader for your agent; track pass rate
- [ ] HF Agents Course bonus unit 2: agent observability & evaluation

### Project

A research-assistant agent that searches papers, summarises them into your notes, and is measured by an eval suite with ≥30 test cases.

### Self-test

1. When should you NOT use an agent?
2. How do you evaluate a non-deterministic system?
3. What does MCP standardise?

## Responsible AI & Safety

**≈ 12 hours** · Requires: Evaluation, Validation & Feature Engineering, LLMs: Pretraining, Fine-tuning & Alignment · Unlocks: —

Fairness, bias, privacy, interpretability, robustness, documentation (model cards) and AI safety fundamentals.

**Why it matters:** Models affect people. Regulation (e.g., EU AI Act) and company policy require responsible practices; it's also good engineering.

**Topics:** Fairness & bias · Privacy · Interpretability · Robustness & red-teaming · Model cards

### Study guide

1. Take fast.ai Practical Data Ethics (selected lessons).
2. Read Fairness and Machine Learning (Barocas, Hardt, Narayanan) chapters 1–3.
3. Read the Model Cards paper and write one for each of your projects.
4. Explore mechanistic interpretability on transformer-circuits.pub.

### Resources

- [fast.ai: Practical Data Ethics](https://ethics.fast.ai/) — *course*
- [Fairness and Machine Learning (book)](https://fairmlbook.org/) — *book*
- [Model Cards for Model Reporting (paper)](https://arxiv.org/abs/1810.03993) — *article*
- [Transformer Circuits Thread (interpretability)](https://transformer-circuits.pub/) — *article*
- [BlueDot Impact: free AI safety courses](https://bluedot.org/) — *course* · Cohort-based; apply online

**Alternatives** (different format or teaching style):

- [Interpretable Machine Learning (Molnar)](https://christophm.github.io/interpretable-ml-book/) — *book*
- [EU Artificial Intelligence Act explorer](https://artificialintelligenceact.eu/) — *article*

### Checklist

- [ ] fast.ai Data Ethics: lessons on disinformation, bias, privacy
- [ ] Fairness & ML ch.1–3
- [ ] Audit one of your models for performance across subgroups
- [ ] Write model cards for 3 of your projects
- [ ] Read one interpretability article on transformer-circuits.pub

### Project

A fairness audit of one of your models with subgroup metrics, mitigation attempt, and a published model card.

### Self-test

1. Why can't all fairness criteria be satisfied at once?
2. What belongs in a model card?
3. What is red-teaming?

## Open Source Contributions

**≈ 25 hours** · Requires: Git & GitHub, NLP with Hugging Face · Unlocks: —

Contribute to real ML libraries: docs, tests, bug fixes, then features — and learn production-grade code review.

**Why it matters:** Merged PRs to well-known libraries are strong, verifiable proof of skill and get you noticed by teams.

**Topics:** Finding issues · Dev setup for big repos · Writing PRs · Code review etiquette · Maintaining your own lib

### Study guide

1. Do the "first-contributions" exercise to practise the fork → PR flow.
2. Read the contributing guides of scikit-learn and Hugging Face transformers.
3. Filter "good first issue" labels; start with docs and tests.
4. Aim for 3 merged PRs, then one non-trivial bug fix or feature.

### Resources

- [Open Source Guides: How to Contribute](https://opensource.guide/how-to-contribute/) — *article*
- [first-contributions](https://github.com/firstcontributions/first-contributions) — *practice*
- [scikit-learn: Contributing](https://scikit-learn.org/stable/developers/contributing.html) — *docs*
- [Hugging Face transformers: Contributing](https://huggingface.co/docs/transformers/contributing) — *docs*
- [GitHub: good first issues in transformers](https://github.com/huggingface/transformers/contribute) — *practice*

**Alternatives** (different format or teaching style):

- [GitHub Docs: Contributing to a project](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) — *docs*
- [Good First Issue (finder)](https://goodfirstissue.dev/) — *tool*

### Checklist

- [ ] Complete the first-contributions exercise
- [ ] Read scikit-learn + transformers contributing guides; set up dev envs
- [ ] Submit a documentation PR
- [ ] Submit a test or small bug-fix PR
- [ ] Get 3 PRs merged in ML-related repos
- [ ] Respond to code review professionally and iterate

### Project

3+ merged PRs in ML libraries, listed with links in your portfolio README.

### Self-test

1. How do you pick a good first issue?
2. What makes a PR easy to review?
3. How do you run a big project's test suite locally?

## Portfolio & ML Interviews

**≈ 30 hours** · Requires: Model Serving & Deployment, Kaggle Competitions · Unlocks: —

Turn your work into a hireable profile: portfolio, résumé, blog, networking, and interview prep (coding, ML theory, system design, behavioural).

**Why it matters:** Skill without visibility doesn't get offers. Interviews test specific, learnable formats.

**Topics:** Portfolio site · Résumé & GitHub · ML theory questions · ML system design · Coding rounds · Behavioural

### Study guide

1. Read Chip Huyen's Introduction to Machine Learning Interviews book.
2. Pick your 3–4 best projects; give each a README with problem, approach, results, demo link.
3. Build a simple portfolio site on GitHub Pages and write 3 blog posts.
4. Do NeetCode 150 (or the remaining part of it) for coding rounds.
5. Practise ML system design out loud with a timer; do mock interviews with peers.

### Resources

- [Introduction to ML Interviews (Chip Huyen)](https://huyenchip.com/ml-interviews-book/) — *book*
- [NeetCode 150](https://neetcode.io/practice) — *practice*
- [GitHub Pages](https://pages.github.com/) — *tool*
- [Stanford CS329S (system design)](https://stanford-cs329s.github.io/) — *course*
- [Tech Interview Handbook (behavioural, résumé)](https://www.techinterviewhandbook.org/) — *article*

**Alternatives** (different format or teaching style):

- [Machine Learning Interviews guide (alirezadir)](https://github.com/alirezadir/Machine-Learning-Interviews) — *article*
- [Eugene Yan (writing on applied ML & careers)](https://eugeneyan.com/) — *article*

### Checklist

- [ ] ML Interviews book ch.1–4: ML jobs, interview process, after an offer, where to start
- [ ] ML Interviews book ch.5–8: math, computer science, ML workflows, ML algorithms
- [ ] Polish READMEs for your top 4 projects with demos
- [ ] Build a portfolio site on GitHub Pages
- [ ] Write and publish 3 technical blog posts
- [ ] Finish NeetCode 150
- [ ] Do 5 timed ML system design practice sessions
- [ ] Prepare 6 STAR stories for behavioural questions
- [ ] Do 3 mock interviews

### Project

A live portfolio site + résumé that links to deployed demos, a Kaggle profile, papers notes, and open-source PRs.

### Self-test

1. Explain your best project in 2 minutes.
2. Walk through designing a recommendation system.
3. What would you do if your model performs well offline but poorly online?

## Master: Go Deep on a Frontier

**≈ 80 hours** · Requires: Reproduce a Paper, AI Agents & Evaluation, GPUs, Performance & Distributed Training · Unlocks: —

Choose a specialisation (LLMs, vision, RL, interpretability, systems…) and go to the research frontier: original projects, publications or flagship open-source work.

**Why it matters:** Mastery is depth. Generalists get jobs; specialists who push the frontier define the field.

**Topics:** Choose a niche · LMs from scratch (CS336) · Original research · Writing & publishing · Teaching others

### Study guide

1. Take Stanford CS336 "Language Modeling from Scratch" (all assignments) or an equivalent deep course in your niche.
2. Read the 20 most-cited recent papers in your niche; map open problems.
3. Start an original project addressing one open problem; share early results.
4. Write a workshop-paper-style report or a deep technical blog series.
5. Teach: mentor beginners, give a talk, or record explanations — teaching exposes gaps.

### Resources

- [Stanford CS336: Language Modeling from Scratch](https://cs336.stanford.edu/) — *course*
- [MIT 6.S191: Introduction to Deep Learning](https://introtodeeplearning.com/) — *course*
- [Karpathy: Neural Networks — Zero to Hero](https://karpathy.ai/zero-to-hero.html) — *course*
- [Distill (archive of clear research)](https://distill.pub/) — *article*
- [Transformer Circuits Thread](https://transformer-circuits.pub/) — *article*
- [Lilian Weng's blog](https://lilianweng.github.io/) — *article*

**Alternatives** (different format or teaching style):

- [Stanford CS25: Transformers United](https://web.stanford.edu/class/cs25/) — *course* · Talks from frontier researchers
- [Richard Hamming: You and Your Research](https://www.cs.virginia.edu/~robins/YouAndYourResearch.html) — *article* · Classic essay on doing important work
- [Distill: Research Debt](https://distill.pub/2017/research-debt/) — *article*

### Checklist

- [ ] Choose your specialisation and write why (1 page)
- [ ] CS336 assignment 1 (tokenizer, transformer, training)
- [ ] CS336 assignment 2 (systems / kernels)
- [ ] CS336 assignments 3–5 (scaling, data, alignment) or equivalent in your niche
- [ ] Read 20 recent papers in your niche; build a literature map
- [ ] Define an original research question and baseline
- [ ] Run experiments and write a report/preprint
- [ ] Give a talk or publish a deep-dive blog series

### Project

An original contribution: a preprint, workshop paper, or widely-used open-source tool in your specialisation.

### Self-test

1. What are the top 3 open problems in your niche?
2. Can you explain your field's key ideas from first principles?
3. What have you created that didn't exist before?
