// Alternative free resources per node — a different format or teaching style from the main picks.
// Use them if a main resource doesn't click for you, is unavailable, or you prefer reading to video.
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
  'python-intermediate': [
    r('Beyond the Basic Stuff with Python (Al Sweigart)', 'https://inventwithpython.com/beyond/', 'book', 'Free online'),
    r('Python docs: Functional Programming HOWTO', 'https://docs.python.org/3/howto/functional.html', 'docs', 'Iterators & generators'),
    r('mypy: Getting started', 'https://mypy.readthedocs.io/en/stable/getting_started.html', 'docs'),
  ],
  'dsa': [
    r('Open Data Structures (Pat Morin)', 'https://opendatastructures.org/', 'book', 'Free book'),
    r('Algorithms (Jeff Erickson)', 'https://jeffe.cs.illinois.edu/teaching/algorithms/', 'book', 'Free book'),
    r('MIT 6.006 Introduction to Algorithms (OCW)', 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', 'course', 'Lecture notes + problem sets'),
    r('VisuAlgo — animated data structures', 'https://visualgo.net/en', 'tool'),
  ],
  'linear-algebra': [
    r('Interactive Linear Algebra (Margalit & Rabinoff)', 'https://textbooks.math.gatech.edu/ila/', 'book', 'Free textbook with interactive figures'),
    r('Introduction to Applied Linear Algebra — VMLS (Boyd)', 'https://web.stanford.edu/~boyd/vmls/', 'book', 'Free PDF, applications-first'),
    r('Linear Algebra Done Right, 4th ed. (Axler)', 'https://linear.axler.net/', 'book', 'Free PDF, proof-based (go deeper later)'),
  ],
  'calculus': [
    r('OpenStax Calculus Volume 1', 'https://openstax.org/details/books/calculus-volume-1', 'book', 'Free textbook'),
    r('OpenStax Calculus Volume 3 (multivariable)', 'https://openstax.org/details/books/calculus-volume-3', 'book', 'Partial derivatives & gradients'),
    r('Paul\'s Online Math Notes', 'https://tutorial.math.lamar.edu/', 'article', 'Clear notes + practice problems'),
  ],
  'prob-stats': [
    r('Introduction to Probability (Blitzstein & Hwang)', 'https://probabilitybook.net/', 'book', 'The Stat 110 textbook · free PDF (opens in Google Drive)'),
    r('Probability for Computer Scientists (Stanford CS109)', 'https://chrispiech.github.io/probabilityForComputerScientists/en/', 'book', 'Free course reader'),
    r('MIT 6.041SC Probabilistic Systems Analysis (OCW)', 'https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/', 'course'),
  ],
  'math-ml': [
    r('3Blue1Brown: But what is cross-entropy?', 'https://www.youtube.com/watch?v=GlYgs6v2YfU', 'video'),
    r('Information Theory, Inference & Learning Algorithms (MacKay)', 'https://www.inference.org.uk/itprnn/book.html', 'book', 'Free PDF'),
    r('CS229: Convex Optimization Overview (notes)', 'https://cs229.stanford.edu/section/cs229-cvxopt.pdf', 'article', 'PDF'),
  ],
  'numpy': [
    r('Python for Data Analysis ch.4: NumPy Basics', 'https://wesmckinney.com/book/numpy-basics.html', 'book'),
    r('Scientific Python Lectures', 'https://lectures.scientific-python.org/', 'book', 'NumPy chapter + exercises'),
    r('NumPy user guide: fundamentals', 'https://numpy.org/doc/stable/user/basics.html', 'docs'),
  ],
  'pandas': [
    r('pandas: Getting started tutorials', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html', 'docs'),
    r('Python Data Science Handbook ch.3: Pandas', 'https://jakevdp.github.io/PythonDataScienceHandbook/03.00-introduction-to-pandas.html', 'book'),
  ],
  'dataviz': [
    r('Python Data Science Handbook ch.4: Matplotlib', 'https://jakevdp.github.io/PythonDataScienceHandbook/04.00-introduction-to-matplotlib.html', 'book'),
    r('Data Visualization: A Practical Introduction (Healy)', 'https://socviz.co/', 'book', 'R code, but the design principles apply'),
    r('Matplotlib cheatsheets', 'https://matplotlib.org/cheatsheets/', 'docs'),
  ],
  'sql': [
    r('Select Star SQL (interactive book)', 'https://selectstarsql.com/', 'book'),
    r('PostgreSQL official tutorial', 'https://www.postgresql.org/docs/current/tutorial.html', 'docs'),
    r('W3Schools SQL tutorial', 'https://www.w3schools.com/sql/', 'article', 'Quick reference with try-it editor'),
  ],
  'eda': [
    r('NIST Handbook: Exploratory Data Analysis', 'https://www.itl.nist.gov/div898/handbook/eda/eda.htm', 'book', 'The classic EDA reference'),
    r('R for Data Science: Exploratory data analysis', 'https://r4ds.hadley.nz/EDA.html', 'book', 'R code, but the process is language-agnostic'),
  ],
  'ml-foundations': [
    r('Stanford CS229 lectures (Andrew Ng, 2018)', 'https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU', 'video', 'Fully free, more mathematical'),
    r('A Course in Machine Learning (Hal Daumé III)', 'http://ciml.info/', 'book', 'Free book'),
    r('mlcourse.ai (open ML course)', 'https://mlcourse.ai/book/index.html', 'course', 'Notebooks + assignments'),
  ],
  'linear-models': [
    r('The Elements of Statistical Learning (free PDF)', 'https://hastie.su.domains/ElemStatLearn/', 'book', 'Ch. 3–4, more mathematical than ISLP'),
    r('Google MLCC: Linear regression', 'https://developers.google.com/machine-learning/crash-course/linear-regression', 'course'),
    r('Google MLCC: Logistic regression', 'https://developers.google.com/machine-learning/crash-course/logistic-regression', 'course'),
  ],
  'classic-models': [
    r('A Practical Guide to SVM Classification (LIBSVM)', 'https://www.csie.ntu.edu.tw/~cjlin/papers/guide/guide.pdf', 'article', 'PDF · how to actually tune SVMs'),
    r('The Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'book', 'Ch. 12 (SVMs) & 13 (nearest neighbours)'),
    r('Python Data Science Handbook ch.5: SVMs', 'https://jakevdp.github.io/PythonDataScienceHandbook/05.07-support-vector-machines.html', 'book'),
  ],
  'trees-ensembles': [
    r('Interpretable Machine Learning (Molnar)', 'https://christophm.github.io/interpretable-ml-book/', 'book', 'Free book · SHAP & feature importance chapters'),
    r('The Elements of Statistical Learning', 'https://hastie.su.domains/ElemStatLearn/', 'book', 'Ch. 9, 10, 15 (trees, boosting, random forests)'),
    r('Python Data Science Handbook ch.5: Random Forests', 'https://jakevdp.github.io/PythonDataScienceHandbook/05.08-random-forests.html', 'book'),
  ],
  'unsupervised': [
    r('A Tutorial on Principal Component Analysis (Shlens)', 'https://arxiv.org/abs/1404.1100', 'article'),
    r('Understanding UMAP (Google PAIR)', 'https://pair-code.github.io/understanding-umap/', 'article', 'Interactive'),
    r('Python Data Science Handbook ch.5: PCA', 'https://jakevdp.github.io/PythonDataScienceHandbook/05.09-principal-component-analysis.html', 'book'),
  ],
  'eval-fe': [
    r('Feature Engineering and Selection (Kuhn & Johnson)', 'https://bookdown.org/max/FES/', 'book', 'Free online'),
    r('Google MLCC: Classification metrics', 'https://developers.google.com/machine-learning/crash-course/classification', 'course'),
    r('imbalanced-learn docs', 'https://imbalanced-learn.org/stable/', 'docs'),
  ],
  'kaggle': [
    r('DrivenData competitions', 'https://www.drivendata.org/competitions/', 'practice', 'Social-impact ML competitions'),
    r('Zindi competitions', 'https://zindi.africa/competitions', 'practice'),
  ],
  'nn-scratch': [
    r('Understanding Deep Learning (Simon Prince)', 'https://udlbook.github.io/udlbook/', 'book', 'Free PDF · ch. 3–7'),
    r('d2l.ai ch.5: Multilayer Perceptrons', 'https://d2l.ai/chapter_multilayer-perceptrons/index.html', 'book'),
    r('CS231n notes: Neural Networks Part 1', 'https://cs231n.github.io/neural-networks-1/', 'article'),
  ],
  'pytorch': [
    r('PyTorch: Deep Learning with PyTorch — 60 Minute Blitz', 'https://docs.pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', 'docs'),
    r('UvA Deep Learning tutorials (PyTorch)', 'https://uvadlc-notebooks.readthedocs.io/en/latest/', 'book', 'Notebook-based'),
    r('Sebastian Raschka: PyTorch in One Hour', 'https://sebastianraschka.com/teaching/pytorch-1h/', 'article'),
  ],
  'dl-training': [
    r('Understanding Deep Learning (Prince)', 'https://udlbook.github.io/udlbook/', 'book', 'Ch. 6–9: training, initialisation, regularisation'),
    r('CS231n notes: Neural Networks Parts 2 & 3', 'https://cs231n.github.io/neural-networks-2/', 'article'),
    r('Deep Learning book ch.11: Practical Methodology', 'https://www.deeplearningbook.org/contents/guidelines.html', 'book'),
  ],
  'cnn': [
    r('CNN Explainer (interactive)', 'https://poloclub.github.io/cnn-explainer/', 'tool'),
    r('Understanding Deep Learning (Prince)', 'https://udlbook.github.io/udlbook/', 'book', 'Ch. 10: convolutional networks'),
    r('d2l.ai ch.8: Modern CNNs', 'https://d2l.ai/chapter_convolutional-modern/index.html', 'book'),
  ],
  'sequence-models': [
    r('Visualizing seq2seq with attention (Jay Alammar)', 'https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/', 'article'),
    r('Distill: Attention and Augmented RNNs', 'https://distill.pub/2016/augmented-rnns/', 'article'),
    r('Speech & Language Processing (Jurafsky & Martin)', 'https://web.stanford.edu/~jurafsky/slp3/', 'book', 'RNN & LSTM chapter'),
  ],
  'fastai': [
    r('fastai library tutorials', 'https://docs.fast.ai/tutorial.html', 'docs'),
    r('Understanding Deep Learning (Prince)', 'https://udlbook.github.io/udlbook/', 'book', 'Theory companion to the practical course'),
  ],
  'transformers': [
    r('Transformer Explainer (interactive)', 'https://poloclub.github.io/transformer-explainer/', 'tool'),
    r('The Illustrated GPT-2 (Jay Alammar)', 'https://jalammar.github.io/illustrated-gpt2/', 'article'),
    r('Lilian Weng: The Transformer Family v2', 'https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/', 'article'),
    r('Understanding Deep Learning (Prince)', 'https://udlbook.github.io/udlbook/', 'book', 'Ch. 12: transformers'),
  ],
  'nlp-hf': [
    r('NLP Course For You (Lena Voita)', 'https://lena-voita.github.io/nlp_course.html', 'course', 'Beautiful written lectures'),
    r('The Illustrated BERT (Jay Alammar)', 'https://jalammar.github.io/illustrated-bert/', 'article'),
  ],
  'llms': [
    r('LLMs from Scratch — code (Sebastian Raschka)', 'https://github.com/rasbt/LLMs-from-scratch', 'book', 'Free code & notebooks for the book'),
    r('Chip Huyen: RLHF explained', 'https://huyenchip.com/2023/05/02/rlhf.html', 'article'),
    r('Unsloth docs (fast LoRA fine-tuning)', 'https://docs.unsloth.ai/', 'docs'),
  ],
  'rag-apps': [
    r('Anthropic: Introducing Contextual Retrieval', 'https://www.anthropic.com/news/contextual-retrieval', 'article'),
    r('Eugene Yan: Patterns for building LLM-based systems', 'https://eugeneyan.com/writing/llm-patterns/', 'article'),
    r('Pinecone Learn (vector search & RAG guides)', 'https://www.pinecone.io/learn/', 'article'),
  ],
  'cv-advanced': [
    r('d2l.ai ch.14: Computer Vision', 'https://d2l.ai/chapter_computer-vision/index.html', 'book', 'Detection, segmentation, transfer learning'),
    r('YOLO paper (Redmon et al.)', 'https://arxiv.org/abs/1506.02640', 'article'),
    r('U-Net paper (Ronneberger et al.)', 'https://arxiv.org/abs/1505.04597', 'article'),
  ],
  'generative': [
    r('Stanford CS236: Deep Generative Models notes', 'https://deepgenerativemodels.github.io/notes/', 'article'),
    r('Yang Song: Score-based generative modeling', 'https://yang-song.net/blog/2021/score/', 'article'),
    r('Lilian Weng: From Autoencoder to Beta-VAE', 'https://lilianweng.github.io/posts/2018-08-12-vae/', 'article'),
    r('Understanding Deep Learning (Prince)', 'https://udlbook.github.io/udlbook/', 'book', 'Ch. 14–18: generative models'),
  ],
  'rl': [
    r('Lilian Weng: A (Long) Peek into Reinforcement Learning', 'https://lilianweng.github.io/posts/2018-02-19-rl-overview/', 'article'),
    r('The 37 Implementation Details of PPO', 'https://iclr-blog-track.github.io/2022/03/25/ppo-implementation-details/', 'article'),
    r('CleanRL (single-file RL implementations)', 'https://docs.cleanrl.dev/', 'tool'),
    r('Berkeley CS285: Deep Reinforcement Learning', 'https://rail.eecs.berkeley.edu/deeprlcourse/', 'course'),
  ],
  'repro-ml': [
    r('Made With ML: Experiment tracking', 'https://madewithml.com/courses/mlops/experiment-tracking/', 'course'),
    r('The Turing Way (reproducible research handbook)', 'https://book.the-turing-way.org/', 'book'),
  ],
  'deployment': [
    r('Full Stack Deep Learning: Lecture 5 — Deployment', 'https://fullstackdeeplearning.com/course/2022/lecture-5-deployment/', 'course'),
    r('Docker Curriculum (free tutorial)', 'https://docker-curriculum.com/', 'article'),
    r('Streamlit docs', 'https://docs.streamlit.io/', 'docs'),
    r('BentoML docs (model serving)', 'https://docs.bentoml.com/', 'docs'),
  ],
  'mlops': [
    r('Made With ML (complete MLOps course)', 'https://madewithml.com/', 'course'),
    r('Chip Huyen: Data distribution shifts and monitoring', 'https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html', 'article'),
    r('ml-ops.org (MLOps principles)', 'https://ml-ops.org/', 'article'),
  ],
  'scaling': [
    r('Machine Learning Engineering open book (Stas Bekman)', 'https://github.com/stas00/ml-engineering', 'book'),
    r('PyTorch: Automatic Mixed Precision recipe', 'https://docs.pytorch.org/tutorials/recipes/recipes/amp_recipe.html', 'docs'),
    r('PyTorch: Getting started with FSDP', 'https://docs.pytorch.org/tutorials/intermediate/FSDP_tutorial.html', 'docs'),
    r('GPU MODE lectures (CUDA, Triton)', 'https://github.com/gpu-mode/lectures', 'course'),
  ],
  'papers': [
    r('Semantic Scholar (search & citations)', 'https://www.semanticscholar.org/', 'tool'),
    r('Connected Papers (citation graphs)', 'https://www.connectedpapers.com/', 'tool'),
    r('Lilian Weng\'s blog (paper syntheses)', 'https://lilianweng.github.io/', 'article'),
  ],
  'reproduce': [
    r('The Annotated Diffusion Model (Hugging Face)', 'https://huggingface.co/blog/annotated-diffusion', 'article', 'Model for a paper walkthrough'),
    r('nanoGPT (a clean GPT-2 reproduction)', 'https://github.com/karpathy/nanoGPT', 'tool'),
    r('Karpathy: A Recipe for Training Neural Networks', 'https://karpathy.github.io/2019/04/25/recipe/', 'article', 'Debugging discipline for reproductions'),
  ],
  'agents': [
    r('Chip Huyen: Agents', 'https://huyenchip.com/2025/01/07/agents.html', 'article'),
    r('Anthropic: Writing effective tools for agents', 'https://www.anthropic.com/engineering/writing-tools-for-agents', 'article'),
    r('ReAct paper (reasoning + acting)', 'https://arxiv.org/abs/2210.03629', 'article'),
  ],
  'responsible-ai': [
    r('Interpretable Machine Learning (Molnar)', 'https://christophm.github.io/interpretable-ml-book/', 'book'),
    r('EU Artificial Intelligence Act explorer', 'https://artificialintelligenceact.eu/', 'article'),
  ],
  'open-source': [
    r('GitHub Docs: Contributing to a project', 'https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project', 'docs'),
    r('Good First Issue (finder)', 'https://goodfirstissue.dev/', 'tool'),
  ],
  'career': [
    r('Machine Learning Interviews guide (alirezadir)', 'https://github.com/alirezadir/Machine-Learning-Interviews', 'article'),
    r('Eugene Yan (writing on applied ML & careers)', 'https://eugeneyan.com/', 'article'),
  ],
  'frontier': [
    r('Stanford CS25: Transformers United', 'https://web.stanford.edu/class/cs25/', 'course', 'Talks from frontier researchers'),
    r('Richard Hamming: You and Your Research', 'https://www.cs.virginia.edu/~robins/YouAndYourResearch.html', 'article', 'Classic essay on doing important work'),
    r('Distill: Research Debt', 'https://distill.pub/2017/research-debt/', 'article'),
  ],
};
