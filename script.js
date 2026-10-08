(function () {
  const QUESTIONS = [
    {
      title: "Au réveil, quelle est ton énergie réelle ?",
      sub: "Pas l'énergie après le café. Avant.",
      bg: "images/q1-bg.jpg",
      optionImages: ["images/q1-a.jpg", "images/q1-b.jpg", "images/q1-c.jpg"],
      options: [
        "Solide. Je me lève prêt à commencer ma journée.",
        "Variable. Certains jours bons, d'autres lourds.",
        "Vidé. Je traîne dès le matin, même après une nuit complète.",
      ],
      problemText: "Ton problème n°1, c'est ton énergie. Tu te lèves déjà vidé — et un corps sans énergie, c'est un cœur qui peine à se lever pour Fajr avec présence. Ce n'est pas de la paresse : c'est un signal que ton corps envoie avant de lâcher complètement.",
    },
    {
      title: "Ta force et ta discipline physique aujourd'hui ?",
      sub: "Comparé à toi, il y a 5 ou 10 ans.",
      bg: "images/q2-bg.jpg",
      optionImages: ["images/q2-a.jpg", "images/q2-b.jpg", "images/q2-c.jpg"],
      options: [
        "Stable. Je tiens mes engagements.",
        "En baisse douce. Je sens que je dois me forcer davantage.",
        "Nettement en retrait. Je ne me reconnais plus.",
      ],
      problemText: "Ton problème n°1, c'est ta discipline qui s'effrite. Ce n'est pas un manque de volonté — c'est que personne n'a encore trouvé la vraie racine de ton blocage. Et chaque effort que tu ne fais plus pour ton corps, c'est un effort en moins pour ton adoration.",
    },
    {
      title: "Le gras autour du ventre ?",
      sub: "Le signal numéro un du corps qui décroche.",
      bg: "images/q3-bg.jpg",
      optionImages: ["images/q3-a.jpg", "images/q3-b.jpg", "images/q3-c.jpg"],
      options: [
        "Sous contrôle, ma ceinture n'a pas bougé.",
        "Il s'installe doucement, malgré mes efforts.",
        "Visible et tenace, rien ne semble le déloger.",
      ],
      problemText: "Ton problème n°1, c'est ce poids qui s'installe malgré toi. Ton corps est une amānah — il te parle à travers ce ventre qui ne bouge pas, et il attend que tu l'écoutes avant qu'il ne t'impose une pause plus dure.",
    },
    {
      title: "Ta motivation à tenir tes engagements ?",
      sub: "Sport, discipline, adoration — ce qui te fait avancer.",
      bg: "images/q4-bg.jpg",
      optionImages: ["images/q4-a.jpg", "images/q4-b.jpg", "images/q4-c.jpg"],
      options: [
        "Intacte. J'ai toujours faim de mieux faire.",
        "Plus tiède qu'avant. Je me force davantage.",
        "Éteinte. Je n'ai plus le feu d'avant.",
      ],
      problemText: "Ton problème n°1, c'est ta motivation qui s'éteint. Le feu qui te faisait avancer — dans ton sport comme dans ta pratique — s'essouffle. Ce n'est pas irréversible, mais plus tu attends, plus il sera dur de le rallumer.",
    },
    {
      title: "La qualité de ton sommeil ?",
      sub: "Le vrai marqueur de récupération.",
      bg: "images/q5-bg.jpg",
      optionImages: ["images/q5-a.jpg", "images/q5-b.jpg", "images/q5-c.jpg"],
      options: [
        "Profond et réparateur, je récupère vite.",
        "Correct mais haché, je ne me sens pas frais.",
        "Mauvais. Réveils, ruminations, fatigue chronique.",
      ],
      problemText: "Ton problème n°1, c'est ton sommeil. Sans récupération, rien d'autre ne tient — ni ton corps, ni ta concentration dans la prière. C'est souvent le premier domino à réparer avant tout le reste.",
    },
    {
      title: "Ta présence pour ta famille et ton couple ?",
      sub: "Pas physiquement présent — vraiment présent.",
      bg: "images/q6-bg.jpg",
      optionImages: ["images/q6-a.jpg", "images/q6-b.jpg", "images/q6-c.jpg"],
      options: [
        "Pleinement présent, disponible pour eux.",
        "Moins disponible qu'avant, je le sens.",
        "Absent même quand je suis là.",
      ],
      problemText: "Ton problème n°1, c'est ta présence pour les tiens. Ton corps fatigué te vole ce que tu as de plus précieux : être vraiment là pour ta femme et tes enfants. Prendre soin de toi, c'est aussi prendre soin d'eux.",
    },
    {
      title: "Ton humeur et ta patience au quotidien ?",
      sub: "Question directe. Réponse honnête.",
      bg: "images/q7-bg.jpg",
      optionImages: ["images/q7-a.jpg", "images/q7-b.jpg", "images/q7-c.jpg"],
      options: [
        "Stable. Je gère la pression sans craquer.",
        "Plus irritable, plus à fleur de peau.",
        "Cassant, sombre ou apathique souvent.",
      ],
      problemText: "Ton problème n°1, c'est ton humeur qui se dégrade. Un corps épuisé rend un cœur plus dur — et ça déteint sur ta famille, ton travail, et la qualité de tes adorations.",
    },
    {
      title: "Comment te sens-tu pendant la prière ?",
      sub: "Le lien entre ton corps et ton cœur dans l'adoration.",
      bg: "images/q8-bg.jpg",
      optionImages: ["images/q8-a.jpg", "images/q8-b.jpg", "images/q8-c.jpg"],
      options: [
        "Présent, concentré, apaisé.",
        "L'esprit ailleurs, difficile de me concentrer.",
        "Fatigué, mon corps me distrait de ce que je fais.",
      ],
      problemText: "Ton problème n°1, c'est ta présence dans la prière. Ton corps fatigué te distrait au moment le plus important de ta journée. C'est exactement pour ça que Rijal Fit existe : relier ton corps à ton adoration, pas les séparer.",
    },
    {
      title: "Quand tu te regardes dans le miroir ?",
      sub: "L'instinct compte plus que le détail.",
      bg: "images/q9-bg.jpg",
      optionImages: ["images/q9-a.jpg", "images/q9-b.jpg", "images/q9-c.jpg"],
      options: [
        "Je me reconnais. J'aime ce que je vois.",
        "Je vois un homme qui s'éloigne de lui-même.",
        "Je détourne le regard. Ce n'est plus moi.",
      ],
      problemText: "Ton problème n°1, c'est l'image que tu as de toi-même. Ce que tu vois dans le miroir a un poids sur ta confiance, ton couple et même ta présence devant Allah. Se réconcilier avec son reflet, c'est aussi se réconcilier avec sa mission d'homme.",
    },
    {
      // Question silencieuse : signal indirect de contexte (jamais présenté comme
      // tel, jamais montré à la personne, n'entre pas dans le score de zone
      // affiché) — sert uniquement au suivi interne du lead.
      title: "Ta situation professionnelle aujourd'hui ?",
      sub: "Pour mieux comprendre ton contexte de vie.",
      bg: "images/q10-bg.jpg",
      optionImages: ["images/q10-a.jpg", "images/q10-b.jpg", "images/q10-c.jpg"],
      options: [
        "Stable, une situation confortable.",
        "Correcte, mais je dois faire attention.",
        "Précaire ou en changement en ce moment.",
      ],
      silent: true,
    },
  ];

  const ZONES = {
    stable: {
      key: 'stable', min: 0, max: 6,
      color: '#4A5240', bg: '#eef0ea',
      name: 'Rijal en Éveil',
      tagline: "Ta base tient. Le sol ne bouge pas encore — mais sans cadre, il peut se fissurer plus vite que tu ne le crois.",
      message: "Ta base tient — c'est une vraie force, ne la sous-estime pas. Mais « stable » ne veut pas dire « à l'abri ». Ton corps est une amānah : il ne demande pas d'être parfait, juste d'être entretenu avant que la fissure ne s'installe. Si tu veux verrouiller ça durablement — avant que le rythme de la vie ne s'en charge à ta place — je suis là.",
    },
    yoyo: {
      key: 'yoyo', min: 7, max: 12,
      color: '#C9A84C', bg: '#faf4e4',
      name: 'Rijal Fragilisé',
      tagline: "Ton corps envoie des signaux. La fenêtre pour inverser le cycle est encore ouverte — mais elle se referme chaque mois qui passe.",
      message: "Ce que tu ressens là, ce n'est pas un manque de volonté. C'est le cycle : tu te reprends, tu tiens, la fatigue s'installe, tu redécroches. Le problème n'est jamais le programme — c'est qu'on n'a jamais trouvé la vraie racine de ton blocage. Ton corps a un droit sur toi, et là, il te parle. C'est le bon moment pour l'écouter.",
    },
    decrochage: {
      key: 'decrochage', min: 13, max: 18,
      color: '#a13a3a', bg: '#f6e9e9',
      name: 'Rijal en Déclin',
      tagline: "Le décrochage est installé. Chaque semaine qui passe rend la reprise plus difficile. Il te faut une méthode, maintenant.",
      message: "Je ne vais pas te mentir : ce que tu ressens est lourd, et c'est réel. Mais ce n'est pas une fatalité. Ton corps a un droit sur toi — pas pour te juger, pour t'aider à te reprendre. J'ai accompagné des frères exactement dans ta situation, et le premier pas n'est jamais le plus dur physiquement — c'est de décider de ne plus porter ça seul.",
    },
  };

  const ZONE_ORDER = ['stable', 'yoyo', 'decrochage'];
  const SCORED_QUESTIONS = QUESTIONS.filter((q) => !q.silent);

  function getZone(score) {
    if (score <= ZONES.stable.max) return ZONES.stable;
    if (score <= ZONES.yoyo.max) return ZONES.yoyo;
    return ZONES.decrochage;
  }

  // ── State ──
  let currentQuestion = -1; // -1 = intro
  const answers = new Array(QUESTIONS.length).fill(null);
  const bio = { age: null, taille: null, poids: null, activite: null, objectif: null };
  const morpho = {};

  // ── DOM refs ──
  const screens = {
    intro: document.getElementById('screen-intro'),
    bio: document.getElementById('screen-bio'),
    morpho: document.getElementById('screen-morpho'),
    question: document.getElementById('screen-question'),
    gate: document.getElementById('screen-gate'),
    result: document.getElementById('screen-result'),
  };
  const progressFill = document.getElementById('progress-fill');
  const topbarCount = document.getElementById('topbar-count');
  const quitBtn = document.getElementById('quit-btn');

  function showScreen(name) {
    Object.values(screens).forEach((el) => { el.hidden = true; });
    screens[name].hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateTopbar() {
    if (currentQuestion < 0) {
      progressFill.style.width = '0%';
      topbarCount.textContent = `0 / ${QUESTIONS.length}`;
    } else if (currentQuestion >= QUESTIONS.length) {
      progressFill.style.width = '100%';
      topbarCount.textContent = `${QUESTIONS.length} / ${QUESTIONS.length}`;
    } else {
      progressFill.style.width = `${Math.round((currentQuestion / QUESTIONS.length) * 100)}%`;
      topbarCount.textContent = `${currentQuestion + 1} / ${QUESTIONS.length}`;
    }
  }

  document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('bio');
  });

  const bioError = document.getElementById('bio-error');
  document.getElementById('bio-continue-btn').addEventListener('click', () => {
    const age = document.getElementById('b-age');
    const taille = document.getElementById('b-taille');
    const poids = document.getElementById('b-poids');
    const activite = document.getElementById('b-activite');
    const objectif = document.getElementById('b-objectif');

    if (!age.value || !taille.value || !poids.value) {
      bioError.textContent = 'Merci de remplir les champs pour continuer.';
      bioError.hidden = false;
      return;
    }
    bioError.hidden = true;

    bio.age = Number(age.value);
    bio.taille = Number(taille.value);
    bio.poids = Number(poids.value);
    bio.activite = activite.value;
    bio.objectif = objectif.value;

    showScreen('morpho');
  });

  // ── Analyse sans photo (morphologie) ──
  const MORPHO_FIELDS = [
    'tour_taille', 'tour_hanches', 'tour_cuisse', 'tour_bras', 'tour_poitrine',
    'bras_jambes', 'buste_jambes', 'clavicules_hanches', 'cage_hanches',
    'valgus', 'bassin', 'abdomen', 'femur', 'tibia', 'calcaneum',
    'stockage_graisse', 'ventre_texture', 'posture', 'douleurs_articulaires', 'cellulite', 'ventre_soir',
    'mobilite_orteils', 'mobilite_accroupir', 'mobilite_bras',
    'psy1', 'psy2', 'psy3', 'psy4',
  ];
  const MORPHO_NUMERIC = ['tour_taille', 'tour_hanches', 'tour_cuisse', 'tour_bras', 'tour_poitrine'];
  const morphoError = document.getElementById('morpho-error');
  let measuresSkipped = false;
  const skipMeasuresBtn = document.getElementById('skip-measures-btn');
  skipMeasuresBtn.addEventListener('click', () => {
    measuresSkipped = !measuresSkipped;
    MORPHO_NUMERIC.forEach((field) => {
      const el = document.querySelector(`[name="${field}"]`);
      el.disabled = measuresSkipped;
      if (measuresSkipped) el.value = '';
    });
    skipMeasuresBtn.textContent = measuresSkipped ? 'Étape passée ✓ (annuler)' : 'Passer cette étape';
    if (measuresSkipped) {
      document.getElementById('morpho-miroir-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.getElementById('morpho-continue-btn').addEventListener('click', () => {
    const values = {};
    let missing = false;
    MORPHO_FIELDS.forEach((field) => {
      const el = document.querySelector(`[name="${field}"]`);
      const isMeasure = MORPHO_NUMERIC.includes(field);
      if (isMeasure && measuresSkipped) {
        values[field] = null;
        return;
      }
      if (!el.value) missing = true;
      values[field] = isMeasure ? Number(el.value) : el.value;
    });

    if (missing) {
      morphoError.textContent = 'Merci de remplir les champs pour continuer.';
      morphoError.hidden = false;
      return;
    }
    morphoError.hidden = true;

    Object.assign(morpho, values);
    currentQuestion = 0;
    renderQuestion(0);
  });

  function renderQuestion(index) {
    const q = QUESTIONS[index];
    document.getElementById('q-label').textContent = `Question ${index + 1} / ${QUESTIONS.length}`;
    document.getElementById('q-title').textContent = q.title;
    document.getElementById('q-sub').textContent = q.sub;

    // Fond photo dédié si la question en a un (sinon on garde le fond
    // générique défini en CSS via .photo-bg--question).
    const questionScreen = document.getElementById('screen-question');
    questionScreen.style.backgroundImage = q.bg ? `url('${q.bg}')` : '';

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';
    const letters = ['A', 'B', 'C'];
    // Miniatures par défaut réutilisées pour les questions sans set dédié :
    // A = à l'aise, B = neutre, C = en difficulté (mêmes images que les
    // pages de résultat). Une question avec `optionImages` prend le pas.
    const thumbs = q.optionImages || ['images/hero-result-stable.jpg', 'images/hero-result-yoyo.jpg', 'images/hero-result-decrochage.jpg'];
    q.options.forEach((optionText, optIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-card';
      btn.innerHTML = `
        <span class="option-card__thumb">
          <img src="${thumbs[optIndex]}" alt="" />
          <span class="option-card__badge">${letters[optIndex]}</span>
        </span>
        <span>${optionText}</span>
      `;
      btn.addEventListener('click', () => selectOption(index, optIndex));
      optionsEl.appendChild(btn);
    });

    document.getElementById('prev-btn').style.visibility = index === 0 ? 'hidden' : 'visible';
    updateTopbar();
    showScreen('question');
  }

  function selectOption(qIndex, optIndex) {
    answers[qIndex] = optIndex;
    if (qIndex < QUESTIONS.length - 1) {
      currentQuestion = qIndex + 1;
      renderQuestion(currentQuestion);
    } else {
      currentQuestion = QUESTIONS.length;
      updateTopbar();
      renderGate();
    }
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion -= 1;
      renderQuestion(currentQuestion);
    } else {
      showScreen('morpho');
    }
  });

  quitBtn.addEventListener('click', () => {
    if (confirm('Quitter le diagnostic ? Tes réponses ne seront pas gardées.')) {
      currentQuestion = -1;
      answers.fill(null);
      updateTopbar();
      showScreen('intro');
    }
  });

  function computeScore() {
    return QUESTIONS.reduce((sum, q, i) => sum + (q.silent || answers[i] === null ? 0 : answers[i]), 0);
  }

  // Trouve la question notée (non silencieuse) qui a obtenu le score le plus
  // élevé — c'est elle qui définit le "problème n°1" du Bilan de Sens.
  function getTopProblemIndex() {
    let bestIndex = -1;
    let bestValue = -1;
    QUESTIONS.forEach((q, i) => {
      if (q.silent) return;
      const val = answers[i] === null ? 0 : answers[i];
      if (val > bestValue) { bestValue = val; bestIndex = i; }
    });
    return bestIndex;
  }

  function renderGate() {
    const score = computeScore();
    const zone = getZone(score);
    const badge = document.getElementById('gate-badge');
    badge.textContent = `Zone · ${zone.name} · ${score}/18`;
    badge.style.background = zone.bg;
    badge.style.color = zone.color;
    document.getElementById('gate-zone-name').textContent = zone.name;
    document.getElementById('gate-zone-name').style.color = zone.color;
    document.getElementById('gate-zone-tagline').textContent = zone.tagline;
    showScreen('gate');
  }

  const gateForm = document.getElementById('gate-form');
  const gateError = document.getElementById('gate-error');

  gateForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    gateError.hidden = true;

    if (!gateForm.checkValidity()) {
      gateForm.reportValidity();
      return;
    }

    const score = computeScore();
    const zone = getZone(score);
    const silentIndex = QUESTIONS.findIndex((q) => q.silent);
    const imc = bio.taille ? +(bio.poids / ((bio.taille / 100) ** 2)).toFixed(1) : null;
    const body = computeBodyComposition(bio.age, bio.taille, bio.poids, bio.activite, bio.objectif);
    const morphotypeName = MORPHOTYPES[getMorphotypeKey(body.imc)].name;
    const bellyTypeName = BELLY_TYPES.find((t) => t.key === determineBellyType(answers, bio)).name;
    const hormonal = computeHormonal(answers, bio, morpho);
    const profile = computeProfile(morpho);

    const lead = {
      date: new Date().toISOString(),
      prenom: document.getElementById('g-prenom').value,
      nom: document.getElementById('g-nom').value,
      email: document.getElementById('g-email').value,
      telephone: document.getElementById('g-telephone').value,
      age: bio.age,
      taille: bio.taille,
      poids: bio.poids,
      activite: bio.activite,
      objectif: bio.objectif,
      imc,
      score,
      zone: zone.name,
      contexteProSignal: silentIndex >= 0 && answers[silentIndex] !== null
        ? ['Stable', 'Attention', 'Précaire'][answers[silentIndex]]
        : null,
      // Analyse sans photo — mensurations et observations
      tourTaille: morpho.tour_taille,
      tourHanches: morpho.tour_hanches,
      tourCuisse: morpho.tour_cuisse,
      tourBras: morpho.tour_bras,
      tourPoitrine: morpho.tour_poitrine,
      brasJambes: morpho.bras_jambes,
      busteJambes: morpho.buste_jambes,
      claviculesHanches: morpho.clavicules_hanches,
      cageHanches: morpho.cage_hanches,
      valgus: morpho.valgus,
      bassin: morpho.bassin,
      abdomen: morpho.abdomen,
      femur: morpho.femur,
      tibia: morpho.tibia,
      calcaneum: morpho.calcaneum,
      stockageGraisse: morpho.stockage_graisse,
      ventreTexture: morpho.ventre_texture,
      posture: morpho.posture,
      douleursArticulaires: morpho.douleurs_articulaires,
      cellulite: morpho.cellulite,
      ventreSoir: morpho.ventre_soir,
      mobiliteOrteils: morpho.mobilite_orteils,
      mobiliteAccroupir: morpho.mobilite_accroupir,
      mobiliteBras: morpho.mobilite_bras,
      // Synthèse de l'analyse (pour la Sheet + l'email)
      morphotype: morphotypeName,
      typeVentre: bellyTypeName,
      hormonalTitre: hormonal.title,
      // Profil psychologique — usage interne (Sheet) uniquement, jamais envoyé au prospect
      profilBase: profile.base,
      profilPhase: profile.phase,
      orientationVente: profile.tip,
    };

    const submitBtn = gateForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      await fetch('/api/log-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      // On n'empêche jamais l'utilisateur de voir son résultat si le log échoue.
      console.error('log-lead a échoué', err);
    }

    submitBtn.disabled = false;
    renderResult(zone, score, lead.prenom, imc);
  });

  function renderResult(zone, score, prenom, imc) {
    const header = document.getElementById('result-header');
    header.classList.remove('result-header--stable', 'result-header--yoyo', 'result-header--decrochage');
    header.classList.add(`result-header--${zone.key}`);

    const badge = document.getElementById('result-badge');
    badge.innerHTML = `<span class="result-header__badge-square" style="background:${zone.color}"></span>Zone · ${zone.name}`;
    badge.style.background = 'rgba(255,255,255,.12)';
    badge.style.color = '#fff';

    document.getElementById('result-hello').textContent = prenom ? `${prenom}, ton profil :` : 'Ton profil :';
    document.getElementById('result-zone-name').textContent = zone.name;
    document.getElementById('result-zone-tagline').textContent = zone.tagline;
    document.getElementById('result-score').textContent = score;

    const bioLine = [
      bio.age ? `${bio.age} ans` : null,
      bio.taille ? `${bio.taille} cm` : null,
      bio.poids ? `${bio.poids} kg` : null,
      imc ? `IMC estimé ${imc}` : null,
    ].filter(Boolean).join(' · ');
    document.getElementById('result-bio').textContent = bioLine;

    renderZonesGrid(zone);
    renderChart(answers);

    const body = computeBodyComposition(bio.age, bio.taille, bio.poids, bio.activite, bio.objectif);
    renderFicheImc(bio, body);
    renderMorphotype(body, bio);
    renderBodyFat(body);
    renderFicheComposition(body);
    renderProjection(bio, body);
    renderBellyType(answers, bio);
    renderAnalysisGrid(zone, answers, bio, morpho, body);
    renderHormonal(answers, bio, morpho);
    renderAvoidList(morpho);

    document.getElementById('message-zone-text').textContent = zone.message;
    const topIndex = getTopProblemIndex();
    document.getElementById('message-problem-text').textContent = topIndex >= 0 ? QUESTIONS[topIndex].problemText : '';

    showScreen('result');
  }

  // ── Composition corporelle (formules Deurenberg + Katch-McArdle) ──
  // Estimations par formules reconnues, pas une mesure clinique (DEXA,
  // impédancemétrie, plis cutanés) — présenté comme tel partout à l'écran.
  const ACTIVITY_MULTIPLIER = { 'sédentaire': 1.2, 'modéré': 1.375, 'actif': 1.55 };
  const CALORIE_ADJUSTMENT = { 'perte de graisse': 0.85, 'prise de muscle': 1.10, 'recomposition': 1.0, 'maintien': 1.0 };
  const ACTIVITE_LABELS = { 'sédentaire': 'Sédentaire', 'modéré': 'Modéré', 'actif': 'Actif' };

  function computeBodyComposition(age, taille, poids, activite, objectif) {
    const imc = +(poids / ((taille / 100) ** 2)).toFixed(1);
    const bodyFatPercent = Math.min(45, Math.max(6, 1.20 * imc + 0.23 * age - 16.2));
    const masseGrasse = +(poids * bodyFatPercent / 100).toFixed(1);
    const masseMaigre = +(poids - masseGrasse).toFixed(1);
    const bmr = Math.round(370 + 21.6 * masseMaigre);
    const tdee = Math.round(bmr * (ACTIVITY_MULTIPLIER[activite] || 1.375));
    // Plancher Rijal Fit : jamais moins de 1500 kcal/jour (décision du 26/09/2026).
    const objectifKcal = Math.max(1500, Math.round(tdee * (CALORIE_ADJUSTMENT[objectif] || 1.0)));
    const proteines_g = Math.round(2.0 * poids);
    const lipides_g = Math.round(0.9 * poids);
    const glucides_g = Math.max(50, Math.round((objectifKcal - (proteines_g * 4 + lipides_g * 9)) / 4));
    return { imc, bodyFatPercent: +bodyFatPercent.toFixed(1), masseGrasse, masseMaigre, bmr, tdee, objectifKcal, proteines_g, glucides_g, lipides_g };
  }

  const BODYFAT_BANDS = [
    { min: 0, max: 15, rangeLabel: '< 15%', label: 'Faible', color: '#4A5240', scale: 0.8 },
    { min: 15, max: 25, rangeLabel: '15-25%', label: 'Moyen', color: '#C9A84C', scale: 1.0 },
    { min: 25, max: 999, rangeLabel: '25%+', label: 'Élevé', color: '#a13a3a', scale: 1.2 },
  ];

  const IMC_BANDS = [
    { min: 0, max: 18.5, rangeLabel: '< 18,5', label: 'Sous-poids', color: '#7a93a8' },
    { min: 18.5, max: 25, rangeLabel: '18,5-24,9', label: 'Normal', color: '#4A5240' },
    { min: 25, max: 30, rangeLabel: '25-29,9', label: 'Surpoids', color: '#C9A84C' },
    { min: 30, max: 35, rangeLabel: '30-34,9', label: 'Obésité', color: '#c17f3a' },
    { min: 35, max: 999, rangeLabel: '35+', label: 'Obésité sévère', color: '#a13a3a' },
  ];

  // Jauge graduée continue : segments proportionnels à leur largeur réelle sur
  // [domainMin, domainMax], curseur positionné exactement sur la valeur (pas
  // juste "dans" une case) — remplace les images à cases fixes, trop grossières
  // pour montrer précisément où se situe la personne.
  function renderPreciseGauge(elId, bands, value, domainMin, domainMax, ticks) {
    const domainSpan = domainMax - domainMin;
    const colorAt = (v) => (bands.find((b) => v >= b.min && v < b.max) || bands[bands.length - 1]).color;
    const segs = bands.map((b) => {
      const from = Math.max(b.min, domainMin), to = Math.min(b.max, domainMax);
      const widthPct = Math.max(0, (to - from) / domainSpan * 100);
      return `<div class="precise-gauge__seg" style="width:${widthPct}%;background:${b.color}"></div>`;
    }).join('');
    // Sans `ticks` explicite : une étiquette par bande (bon pour l'IMC, 5 bandes
    // étroites). Avec `ticks` : graduations à intervalle fixe, indépendantes des
    // bandes — nécessaire pour le taux de graisse (3 bandes trop larges, les
    // étiquettes par bande se chevauchent).
    const labels = ticks
      ? ticks.map((v) => `<div class="precise-gauge__tick" style="left:${(v - domainMin) / domainSpan * 100}%"><span class="precise-gauge__tick-range" style="color:${colorAt(v)}">${v}${v === ticks[ticks.length - 1] ? '%+' : '%'}</span></div>`).join('')
      : bands.map((b) => {
          const from = Math.max(b.min, domainMin), to = Math.min(b.max, domainMax);
          const widthPct = Math.max(0, (to - from) / domainSpan * 100);
          return `<div class="precise-gauge__tick precise-gauge__tick--band" style="width:${widthPct}%"><span class="precise-gauge__tick-range" style="color:${b.color}">${b.rangeLabel}</span><span class="precise-gauge__tick-label">${b.label}</span></div>`;
        }).join('');
    const cursorPct = Math.min(100, Math.max(0, (value - domainMin) / domainSpan * 100));
    document.getElementById(elId).innerHTML = `
      <div class="precise-gauge">
        <div class="precise-gauge__cursor" style="left:${cursorPct}%"><span></span></div>
        <div class="precise-gauge__track">${segs}</div>
        <div class="precise-gauge__labels${ticks ? ' precise-gauge__labels--ticks' : ''}">${labels}</div>
      </div>`;
  }

  function renderFicheImc(bio, body) {
    const rows = [
      ['Taille', `${bio.taille} cm`],
      ['Poids', `${bio.poids} kg`],
      ['Âge', `${bio.age} ans`],
      ['IMC', `${body.imc}`],
      ["Niveau d'activité", ACTIVITE_LABELS[bio.activite] || bio.activite],
    ];
    document.getElementById('fiche-imc-rows').innerHTML = rows.map(([l, v]) => `<div class="fiche-row"><span class="fiche-row__label">${l}</span><span class="fiche-row__value">${v}</span></div>`).join('');
    renderPreciseGauge('gauge-imc', IMC_BANDS, body.imc, 15, 40);
  }

  // Orientation, pas un diagnostic : approximée à partir de l'IMC (proxy simple
  // de la corpulence générale), faute de mesures morphologiques réelles (largeur
  // d'épaules, ossature) dans ce formulaire.
  const MORPHOTYPES = {
    ectomorphe: {
      name: 'Ectomorphe',
      img: 'images/morphotype-ectomorphe.jpg',
      text: "Une ossature fine et un métabolisme rapide : tu as naturellement du mal à prendre du poids, muscle comme graisse. Le sport te demande souvent plus d'énergie que tu n'en as en réserve — l'enjeu pour toi, c'est de manger assez, pas de te restreindre.",
      meaning: "Concrètement, ça veut dire : privilégier les charges lourdes et peu de répétitions plutôt que le cardio à outrance, augmenter les calories avant d'augmenter le volume d'entraînement, et accepter que les résultats visibles prennent un peu plus de temps à apparaître — ce n'est pas un manque d'efficacité, c'est ta biologie.",
    },
    mesomorphe: {
      name: 'Mésomorphe',
      img: 'images/morphotype-mesomorphe.jpg',
      text: "Une carrure naturellement athlétique : tu réagis vite à l'entraînement, tu prends du muscle et perds du gras plus facilement que la moyenne. Le risque, c'est de compter sur cette facilité et de relâcher le cadre — ce profil se dégrade vite dès que l'hygiène de vie part en vrille.",
      meaning: "Concrètement, ça veut dire : tu peux varier les styles d'entraînement sans perdre tes acquis, mais le vrai enjeu n'est pas physique — c'est la régularité. Ce profil échoue rarement par manque de capacité, presque toujours par manque de cadre tenu dans la durée.",
    },
    endomorphe: {
      name: 'Endomorphe',
      img: 'images/morphotype-endomorphe.jpg',
      text: "Une ossature large et un métabolisme plus lent : ton corps stocke plus facilement, surtout au niveau du ventre. Ce n'est pas un manque de volonté — c'est ta base de départ. Bien encadré, c'est souvent le profil qui progresse le plus vite une fois le déclic fait.",
      meaning: "Concrètement, ça veut dire : le levier le plus rentable pour toi est l'alimentation (un déficit calorique modéré et tenu) plus que le volume d'entraînement, le cardio régulier aide particulièrement ce profil, et la marge de progrès est réelle — le corps répond bien une fois la constance installée.",
    },
  };

  function getMorphotypeKey(imc) {
    if (imc < 21) return 'ectomorphe';
    if (imc < 27) return 'mesomorphe';
    return 'endomorphe';
  }

  function renderMorphotype(body, bio) {
    const key = getMorphotypeKey(body.imc);
    const m = MORPHOTYPES[key];
    document.getElementById('morphotype-img').src = m.img;
    document.getElementById('morphotype-img').alt = m.name;
    document.getElementById('morphotype-name').textContent = m.name;
    document.getElementById('morphotype-text').textContent = `${m.text} ${m.meaning}`;
  }

  const BODYFAT_EXPLAIN = {
    Faible: "Ton corps garde peu de réserve — le sport et l'assiette font déjà leur travail. Le vrai enjeu à ce niveau, c'est de tenir cette discipline dans la durée, pas de la relâcher une fois le confort installé.",
    Moyen: "Ni sec ni en surcharge — un niveau intermédiaire qui peut basculer dans un sens ou dans l'autre selon ce que tu fais dans les prochains mois. C'est souvent le moment le plus facile pour reprendre le contrôle, avant que ça ne s'installe.",
    Élevé: "À ce niveau, la graisse s'installe surtout autour des organes (graisse viscérale) — celle qui pèse le plus sur l'énergie, le sommeil et la santé cardiovasculaire sur la durée. Ce n'est pas une fatalité, mais plus tu attends, plus le corps s'y habitue.",
  };

  function renderBodyFat(body) {
    const low = Math.floor(body.bodyFatPercent / 5) * 5;
    const high = low + 5;
    const band = BODYFAT_BANDS.find((b) => body.bodyFatPercent >= b.min && body.bodyFatPercent < b.max) || BODYFAT_BANDS[BODYFAT_BANDS.length - 1];

    document.getElementById('bodyfat-range-text').textContent = `Ton taux de graisse corporelle estimé se situe entre ${low}% et ${high}% — dans la zone "${band.label}". Ce n'est pas une mesure clinique, mais une estimation fiable à partir de ton profil, suffisante pour situer où tu en es réellement.`;

    renderPreciseGauge('gauge-bodyfat', BODYFAT_BANDS, body.bodyFatPercent, 5, 40, [10, 15, 20, 25, 30, 35, 40]);

    document.getElementById('bodyfat-explain').textContent = BODYFAT_EXPLAIN[band.label];
  }

  function renderFicheComposition(body) {
    const rows = [
      ['Masse grasse estimée', `${body.masseGrasse} kg`],
      ['Masse maigre estimée', `${body.masseMaigre} kg`],
      ['Métabolisme de base', `${body.bmr} kcal/jour`],
      ['Dépense totale estimée', `${body.tdee} kcal/jour`],
      ['Objectif calorique', `${body.objectifKcal} kcal/jour`],
      ['Macros cibles', `${body.proteines_g} g protéines · ${body.glucides_g} g glucides · ${body.lipides_g} g lipides`],
    ];
    document.getElementById('fiche-composition-rows').innerHTML = rows.map(([l, v]) => `<div class="fiche-row"><span class="fiche-row__label">${l}</span><span class="fiche-row__value">${v}</span></div>`).join('');
  }

  // ── Projection à 3 mois (12 semaines) à partir de l'écart calorique visé —
  // indicative, pas une garantie : 1kg de masse grasse ≈ 7700 kcal.
  function computeProjection(bio, body) {
    const dailyDelta = body.tdee - body.objectifKcal; // > 0 : déficit (perte) · < 0 : surplus (prise)
    const weightChange = (dailyDelta * 7 / 7700) * 12;
    const poids = +(bio.poids - weightChange).toFixed(1);
    const imc = +(poids / ((bio.taille / 100) ** 2)).toFixed(1);

    let masseGrasse, masseMaigre;
    if (bio.objectif === 'prise de muscle') {
      masseMaigre = +(body.masseMaigre + Math.abs(weightChange)).toFixed(1);
      masseGrasse = +(poids - masseMaigre).toFixed(1);
    } else if (bio.objectif === 'maintien') {
      masseGrasse = body.masseGrasse;
      masseMaigre = body.masseMaigre;
    } else {
      masseGrasse = +Math.max(poids * 0.06, body.masseGrasse - Math.abs(weightChange)).toFixed(1);
      masseMaigre = +(poids - masseGrasse).toFixed(1);
    }
    const bodyFatPercent = +((masseGrasse / poids) * 100).toFixed(1);
    return { poids, imc, bodyFatPercent, masseGrasse, masseMaigre };
  }

  function projectionBar(label, startVal, endVal, unit, maxVal, color) {
    const startPct = Math.min(100, (startVal / maxVal) * 100);
    const endPct = Math.min(100, (endVal / maxVal) * 100);
    return `
      <div class="projection-bar-group">
        <span class="projection-bar-group__label">${label}</span>
        <div class="projection-bar-row">
          <span class="projection-bar-row__tag">Départ</span>
          <div class="projection-bar-track"><div class="projection-bar-fill" style="width:${startPct}%;background:#c7c2b4"></div></div>
          <span class="projection-bar-row__val">${startVal}${unit}</span>
        </div>
        <div class="projection-bar-row">
          <span class="projection-bar-row__tag">+3 mois</span>
          <div class="projection-bar-track"><div class="projection-bar-fill" style="width:${endPct}%;background:${color}"></div></div>
          <span class="projection-bar-row__val">${endVal}${unit}</span>
        </div>
      </div>`;
  }

  function renderProjection(bio, body) {
    const proj = computeProjection(bio, body);
    const deltaPoids = +(proj.poids - bio.poids).toFixed(1);
    const sens = deltaPoids < 0 ? 'perdre' : deltaPoids > 0 ? 'prendre' : 'stabiliser';
    document.getElementById('projection-intro').textContent = deltaPoids === 0
      ? "En tenant ton objectif calorique, ton poids reste stable sur 3 mois — l'objectif ici est la composition, pas la balance."
      : `En tenant ton objectif calorique au quotidien, tu peux ${sens} environ ${Math.abs(deltaPoids)} kg d'ici 3 mois. Une projection réaliste, pas une promesse.`;

    const rows = [
      ['Poids', `${bio.poids} kg`, `${proj.poids} kg`],
      ['IMC', `${body.imc}`, `${proj.imc}`],
      ['Taux de graisse estimé', `${body.bodyFatPercent}%`, `${proj.bodyFatPercent}%`],
      ['Masse grasse estimée', `${body.masseGrasse} kg`, `${proj.masseGrasse} kg`],
      ['Masse maigre estimée', `${body.masseMaigre} kg`, `${proj.masseMaigre} kg`],
    ];
    document.getElementById('projection-rows').innerHTML = rows.map(([l, v1, v2]) =>
      `<div class="fiche-row"><span class="fiche-row__label">${l}</span><span class="fiche-row__value">${v1} → ${v2}</span></div>`
    ).join('');

    const maxPoids = Math.max(bio.poids, proj.poids) * 1.15;
    document.getElementById('projection-bars').innerHTML =
      projectionBar('Poids', bio.poids, proj.poids, ' kg', maxPoids, 'var(--kaki)') +
      projectionBar('Taux de graisse', body.bodyFatPercent, proj.bodyFatPercent, '%', 45, 'var(--or)');
  }

  // ── Type de ventre (heuristique simple à partir des réponses, pas un diagnostic) ──
  const BELLY_TYPES = [
    { key: 'stress', name: 'Ventre du stress', desc: "Lié au cortisol — tension nerveuse, sommeil dégradé, ventre qui se durcit sans forcément grossir.", meaning: "Qu'est-ce que ça veut dire : ton corps reste en alerte en continu, il stocke autour du ventre par réflexe de survie. Le levier n°1 n'est pas l'assiette ni le sport — c'est le sommeil et la gestion du stress (cohérence cardiaque, coupures d'écran le soir)." },
    { key: 'viscerale', name: 'Graisse viscérale', desc: "La plus profonde, autour des organes — plus fréquente avec l'âge et la sédentarité prolongée.", meaning: "Qu'est-ce que ça veut dire : c'est le type le plus important à traiter en priorité sur le plan santé — elle pèse sur le cœur et l'énergie au quotidien. La bonne nouvelle : elle répond vite au cardio régulier et à un déficit calorique modéré." },
    { key: 'souscutanee', name: 'Graisse sous-cutanée', desc: "Sous la peau, la plus visible et la plus courante — répond bien à un travail combiné nutrition/sport.", meaning: "Qu'est-ce que ça veut dire : c'est la plus simple à faire bouger avec de la constance — nutrition + renforcement musculaire réguliers, sans besoin de méthode extrême." },
    { key: 'leger', name: 'Léger, en installation', desc: "Rien d'installé durablement — le bon moment pour agir avant que ça ne se fixe.", meaning: "Qu'est-ce que ça veut dire : tu es dans la meilleure fenêtre pour agir — avant que ça devienne une habitude du corps. Un cadre simple et tenu maintenant t'évite un travail bien plus long dans 2-3 ans." },
  ];

  function determineBellyType(answers, bio) {
    const ventreScore = answers[2];
    const humeurScore = answers[6];
    if (humeurScore === 2) return 'stress';
    if (ventreScore === 2 && bio.age && bio.age >= 40) return 'viscerale';
    if (ventreScore === 2) return 'souscutanee';
    return 'leger';
  }

  function renderBellyType(answers, bio) {
    const activeKey = determineBellyType(answers, bio);
    document.getElementById('bellytype-grid').innerHTML = BELLY_TYPES.map((t) => `
      <div class="bellytype-card ${t.key === activeKey ? 'is-active' : ''}">
        <div>
          <div class="bellytype-card__name">${t.name}</div>
          <div class="bellytype-card__desc">${t.desc}</div>
          ${t.key === activeKey ? `<div class="bellytype-card__meaning">${t.meaning}</div>` : ''}
        </div>
        ${t.key === activeKey ? '<span class="bellytype-card__tag">Le tien</span>' : ''}
      </div>
    `).join('');
  }

  // ══ ANALYSE COMPLÈTE (physique / alimentaire / psychologique / environnemental) ══
  // Chaque catégorie combine 3 tips d'un driver principal + 1 tip de deux
  // drivers secondaires = 5 conseils personnalisés, sans appel IA.

  const PHYSIQUE_BASE = {
    ectomorphe: [
      "Privilégie les charges lourdes et peu de répétitions (6-10 reps) plutôt que le cardio à outrance — c'est ce qui construit le plus vite sur ton profil.",
      "Augmente tes calories avant d'augmenter ton volume d'entraînement : sans surplus, ton corps n'a rien à construire.",
      "Limite le cardio à 1-2 séances courtes par semaine — au-delà, tu brûles l'énergie dont tu as besoin pour progresser.",
    ],
    mesomorphe: [
      "Varie les styles d'entraînement tous les 6-8 semaines — ton corps s'adapte vite, il faut le surprendre pour continuer à progresser.",
      "Fixe-toi un cadre non négociable (jours fixes, horaires fixes) — ton profil échoue rarement par incapacité physique, presque toujours par manque de régularité.",
      "Ne saute pas les phases de récupération sous prétexte que \"ça va vite\" — c'est là que la blessure ou le plateau arrivent le plus souvent.",
    ],
    endomorphe: [
      "Priorise le déficit calorique modéré (-15 à -20%) avant d'ajouter du volume d'entraînement — c'est le levier le plus rentable pour toi.",
      "Ajoute 2-3 séances de cardio par semaine, même courtes (20-30 min) — ce profil y répond particulièrement bien.",
      "Mesure ta progression au tour de taille et aux photos plutôt qu'à la balance seule — la composition change avant le poids total.",
    ],
  };
  const PHYSIQUE_POSTURE = {
    voutee: "Renforce le haut du dos (rowing, tirage) et étire les pectoraux régulièrement — c'est ce déséquilibre précis qui entretient une posture voûtée.",
    cambree: "Travaille le gainage (planche, respiration abdominale) et étire les fléchisseurs de hanche — c'est ce qui accentue une cambrure marquée.",
    droite: "Ta posture est un bon point d'appui — garde une routine de mobilité légère pour la préserver dans la durée.",
  };
  const PHYSIQUE_MOBILITE = {
    mobilite_orteils: "Ta mobilité des ischio-jambiers est limitée — 5 minutes d'étirement des jambes tendues avant chaque séance t'évitera bien des douleurs de dos.",
    mobilite_accroupir: "Ta mobilité de cheville/hanche en squat est limitée — travaille des squats assistés (talons surélevés) avant de charger le mouvement.",
    mobilite_bras: "Ta mobilité d'épaule est limitée — mobilise les épaules avant chaque séance (cercles, élastique) avant tout mouvement au-dessus de la tête.",
    ok: "Ta mobilité de base est correcte sur les 3 tests — continue à l'entretenir, c'est ce qui évitera les blessures plus tard.",
  };

  const ALIMENTAIRE_BASE = {
    ventre: [
      "Réduis en priorité le sucre rapide et l'alcool (même occasionnel) — c'est ce qui pèse le plus sur le stockage abdominal.",
      "Mange lentement et jusqu'à 80% de satiété — le ventre est la zone la plus sensible aux repas pris trop vite.",
      "Priorise les fibres (légumes, légumineuses) à chaque repas — elles limitent directement le stockage viscéral.",
    ],
    hanches: [
      "Surveille les glucides raffinés le soir — c'est souvent ce qui alimente le stockage sur cette zone.",
      "Ajoute des protéines à chaque repas (viande, poisson, œufs, légumineuses) pour préserver le muscle pendant la perte.",
      "Hydrate-toi suffisamment (1,5-2L/jour) — la rétention d'eau amplifie souvent cette zone en particulier.",
    ],
    cuisses: [
      "Cette zone répond bien à la régularité plus qu'à la restriction — mieux vaut un cadre tenable 7 jours/7 qu'un régime strict 3 jours.",
      "Associe systématiquement glucides et protéines dans le même repas pour stabiliser ta glycémie sur la journée.",
      "La marche quotidienne (30 min) est un levier sous-estimé pour cette zone spécifiquement.",
    ],
    bras: [
      "Cette zone est souvent la dernière à bouger — sois patient, elle suit avec un peu de retard sur le reste du corps.",
      "Renforce en parallèle (curl, triceps) pour que la peau/muscle suive la perte de gras, pas juste la nutrition seule.",
      "Vérifie ton apport en protéines (1,6-2g/kg) — un déficit trop dur sans assez de protéines fait fondre le muscle avant le gras.",
    ],
    dos: [
      "Regarde ta posture assise au travail — le stockage au dos est souvent lié à la sédentarité plus qu'à l'alimentation seule.",
      "Ajoute du travail de dos (rowing, tirage) — le muscle qui se dessine dessous change la silhouette plus vite que la nutrition seule.",
      "Réduis les grignotages du soir devant un écran — c'est une zone qui répond particulièrement bien à la réduction des calories \"invisibles\".",
    ],
  };
  const ALIMENTAIRE_TEXTURE = {
    dur: "Un ventre dur évoque plutôt du gonflement/tension (digestion, stress) que du gras pur — regarde le lien avec tes repas trop copieux ou trop rapides.",
    mou: "Un ventre mou évoque plutôt du stockage graisseux classique — un déficit calorique modéré et tenu sera plus efficace qu'une restriction brutale.",
  };
  const ALIMENTAIRE_OBJECTIF = {
    'perte de graisse': "Vise un déficit modéré (-300 à -500 kcal/jour) — un déficit trop violent te fera craquer avant d'avoir des résultats.",
    'prise de muscle': "Vise un léger surplus (+200 à +300 kcal/jour) avec 1,6-2g de protéines/kg — un surplus trop large ajoute surtout du gras, pas du muscle.",
    'recomposition': "Reste autour de ton maintien calorique avec des protéines élevées — la recomposition demande de la patience, les deux objectifs ne se poursuivent pas à pleine vitesse en même temps.",
    'maintien': "Concentre-toi sur la qualité et la régularité des repas plus que sur les calories — à l'objectif maintien, c'est la constance qui protège tes acquis.",
  };

  const PSYCHO_BASE = {
    stable: [
      "Note chaque semaine ce qui a bien fonctionné — ça ancre les bons réflexes avant qu'ils ne deviennent fragiles.",
      "Fixe-toi un seul objectif à la fois — la stabilité se maintient mieux avec un cadre simple qu'avec trop de fronts ouverts.",
      "Prépare-toi mentalement aux imprévus (voyage, maladie, période chargée) — c'est souvent là qu'un profil stable bascule.",
    ],
    yoyo: [
      "Identifie le moment exact où tu décroches habituellement (jour, situation, émotion) — c'est ce pattern qu'il faut casser, pas ta volonté.",
      "Réduis ton cadre au strict minimum tenable les semaines difficiles plutôt que d'arrêter complètement — mieux vaut 50% maintenu que 0%.",
      "Reviens à ton \"pourquoi\" profond chaque fois que la motivation baisse — le manque de sens use plus vite que le manque d'énergie.",
    ],
    decrochage: [
      "Ne vise pas à \"tout reprendre\" d'un coup — un seul petit changement tenu cette semaine vaut mieux qu'un programme complet abandonné dans 3 jours.",
      "Parle de ce que tu traverses à quelqu'un (coach, proche) — porter ça seul est souvent ce qui entretient le décrochage.",
      "Reconnecte-toi à un geste simple et rapide chaque jour (5 min de marche, une invocation) — l'objectif est de recréer le mouvement, pas la performance.",
    ],
  };
  const PSYCHO_HUMEUR = [
    "Ton humeur reste stable dans la pression — un vrai point d'appui à ne pas négliger dans les moments plus durs.",
    "Ton irritabilité récente est un signal du corps, pas juste du caractère — souvent lié au sommeil ou à la charge mentale plus qu'à la volonté.",
    "Une humeur sombre ou apathique répétée mérite d'être prise au sérieux — pas comme une faiblesse, comme un signal à écouter et accompagner.",
  ];
  const PSYCHO_SITUATION = [
    "Ta situation professionnelle stable est un vrai appui — utilise cette stabilité comme socle pour construire une routine durable.",
    "Une situation professionnelle qui demande de la vigilance ajoute une charge mentale réelle — sois indulgent avec toi-même sur le rythme de progression.",
    "Une situation professionnelle précaire ou en changement pèse sur l'énergie disponible pour le reste — viser un cadre minimal mais tenu est plus réaliste qu'un programme ambitieux maintenant.",
  ];

  const ENVIRONNEMENT_BASE = {
    'sédentaire': [
      "Ajoute du mouvement invisible dans ta journée (escaliers, marche courte) avant même de penser \"séance de sport\" — c'est la base qui manque le plus.",
      "Bloque tes créneaux d'entraînement dans ton agenda comme un rendez-vous professionnel — sans ça, ils sautent toujours en premier.",
      "Commence par 2 séances courtes par semaine plutôt que viser 5 d'entrée — la régularité bat l'intensité sur ce profil.",
    ],
    'modéré': [
      "Structure ce que tu fais déjà avec un vrai plan plutôt que de l'improviser — tu as la base, il manque le cadre.",
      "Ajoute une contrainte de progression (charges, répétitions notées) — sans suivi, un niveau modéré stagne facilement.",
      "Protège tes séances des imprévus en ayant un plan B de 15 minutes pour les semaines chargées.",
    ],
    'actif': [
      "Vérifie que ton activité physique sert vraiment ton objectif — être actif et progresser vers un objectif précis sont deux choses différentes.",
      "Surveille ta récupération (sommeil, protéines) — c'est souvent le facteur limitant chez les profils déjà actifs, pas l'entraînement lui-même.",
      "Introduis de la variété pour éviter le plateau — le corps s'adapte vite à un niveau d'activité déjà élevé.",
    ],
  };
  const ENVIRONNEMENT_DOULEUR = {
    aucune: "Pas de douleur articulaire signalée — profite-en pour construire une base solide avant que l'âge ou la charge n'en amène.",
    genoux: "Aménage ton espace d'entraînement pour éviter les surfaces dures en impact (course sur bitume) — privilégie le vélo, la natation ou le sol amorti.",
    dos: "Vérifie ta position de travail au quotidien (écran, chaise) — une bonne partie des douleurs de dos vient de l'environnement statique, pas juste du sport.",
    epaules: "Adapte ton poste de travail (hauteur d'écran, souris) — les douleurs d'épaule sont souvent entretenues par des heures de posture figée.",
    hanches: "Si tu es longtemps assis dans la journée, lève-toi et bouge toutes les heures — les hanches raidissent vite en position assise prolongée.",
    poignets: "Revois ta prise en main sur les exercices de force (poignet neutre) et limite le temps d'écran/clavier en continu sans pause.",
  };
  const ENVIRONNEMENT_PRIERE = [
    "Ta présence pendant la prière est un point d'ancrage solide — utilise ce moment déjà stable comme repère dans ta journée pour caler tes autres habitudes.",
    "Aménage un coin de prière calme, sans écran à portée — l'esprit qui \"part ailleurs\" est souvent lié à l'environnement immédiat, pas qu'à la fatigue.",
    "Un corps fatigué distrait particulièrement pendant la prière — soigner ton environnement de sommeil (obscurité, écrans coupés avant) aura un effet direct ici.",
  ];

  function buildAnalysisCategory(title, baseTips, secondaryTip, tertiaryTip) {
    return { title, tips: [...baseTips, secondaryTip, tertiaryTip] };
  }

  function renderAnalysisGrid(zone, answers, bio, morpho, body) {
    const morphoKey = getMorphotypeKey(body.imc);
    const worstMobility = ['mobilite_orteils', 'mobilite_accroupir', 'mobilite_bras'].find((f) => morpho[f] === 'difficile');

    const categories = [
      buildAnalysisCategory(
        'Interprétation physique',
        PHYSIQUE_BASE[morphoKey],
        PHYSIQUE_POSTURE[morpho.posture],
        PHYSIQUE_MOBILITE[worstMobility || 'ok']
      ),
      buildAnalysisCategory(
        'Interprétation alimentaire',
        ALIMENTAIRE_BASE[morpho.stockage_graisse],
        ALIMENTAIRE_TEXTURE[morpho.ventre_texture],
        ALIMENTAIRE_OBJECTIF[bio.objectif]
      ),
      buildAnalysisCategory(
        'Interprétation psychologique',
        PSYCHO_BASE[zone.key],
        PSYCHO_HUMEUR[answers[6]],
        PSYCHO_SITUATION[answers[9]]
      ),
      buildAnalysisCategory(
        'Interprétation environnementale',
        ENVIRONNEMENT_BASE[bio.activite],
        ENVIRONNEMENT_DOULEUR[morpho.douleurs_articulaires],
        ENVIRONNEMENT_PRIERE[answers[7]]
      ),
    ];

    document.getElementById('analysis-grid').innerHTML = categories.map((cat) => `
      <div class="analysis-card">
        <h3 class="analysis-card__title">${cat.title}</h3>
        <ul class="analysis-card__list">
          ${cat.tips.map((t) => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // ── Profil psychologique (process communication) — usage interne coach uniquement,
  // jamais affiché au prospect ni inclus dans l'email de confirmation. ──
  const PROFILE_LABELS = {
    empathique: 'Empathique',
    perseverant: 'Persévérant',
    travaillomane: 'Travaillomane',
    promoteur: 'Promoteur',
    reveur: 'Rêveur',
    rebelle: 'Rebelle',
  };
  const PROFILE_TIPS = {
    empathique: "Connexion chaleureuse, mets-le en confiance, intéresse-toi à lui personnellement avant de parler produit.",
    perseverant: "Sois honnête, cohérent et précis. Laisse-le exposer ses valeurs sans le couper, justifie avec des faits.",
    travaillomane: "Sois ponctuel et carré. Présente un plan clair, parle organisation et résultats concrets.",
    promoteur: "Va vite à l'action. Parle opportunité, défi et résultats rapides, ne tourne pas autour du pot.",
    reveur: "Laisse-lui de l'espace, ne le brusque pas. Projette-le dans sa situation idéale future.",
    rebelle: "Reste léger et direct, évite le cadre trop rigide, va au fait avec humour.",
  };
  function computeProfile(morpho) {
    const tally = { empathique: 0, perseverant: 0, travaillomane: 0, promoteur: 0, reveur: 0, rebelle: 0 };
    ['psy1', 'psy2', 'psy3', 'psy4'].forEach((field) => {
      const v = morpho[field];
      if (v && tally.hasOwnProperty(v)) tally[v] += 1;
    });
    const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const baseKey = ranked[0][0];
    const phaseKey = ranked.find(([key, count]) => key !== baseKey && count > 0)?.[0] || null;
    return {
      base: PROFILE_LABELS[baseKey],
      phase: phaseKey ? PROFILE_LABELS[phaseKey] : '',
      tip: PROFILE_TIPS[baseKey],
    };
  }

  // ── Analyse hormonale (signaux indirects, pas un dosage) ──
  function computeHormonal(answers, bio, morpho) {
    const energieBad = answers[0] === 2;
    const sommeilBad = answers[4] === 2;
    const bloating = morpho.ventre_soir === 'oui';
    const humeurBad = answers[6] === 2;

    if (bloating && humeurBad) {
      return {
        title: 'Un profil marqué par le cortisol',
        text: "Ventre plus gonflé le soir, humeur qui se tend facilement : ce sont deux signaux classiques d'un cortisol (l'hormone du stress) qui reste élevé trop longtemps dans la journée. Ce n'est pas réglé par plus de sport — c'est réglé par plus de récupération : sommeil régulier, coupures d'écran le soir, respiration/cohérence cardiaque.",
      };
    }
    if (energieBad && sommeilBad) {
      return {
        title: 'Un profil marqué par la récupération',
        text: "Énergie basse et sommeil dégradé ensemble pointent vers un déficit de récupération plus qu'un problème hormonal isolé. Le corps ne régénère pas correctement la nuit — c'est le premier domino à réparer avant d'attendre des résultats physiques.",
      };
    }
    if (bio.age && bio.age >= 40) {
      return {
        title: 'Une vigilance liée à l\'âge, à surveiller',
        text: "Pas de signal fort dans tes réponses, mais à partir de 40 ans, la testostérone décline naturellement chez l'homme — ça touche l'énergie, la masse musculaire et la motivation même sans autre symptôme. Le sport de force régulier et un sommeil de qualité sont les deux leviers qui ralentissent le plus ce déclin.",
      };
    }
    return {
      title: 'Pas de signal hormonal fort',
      text: "Tes réponses ne pointent pas vers un déséquilibre hormonal marqué. Ce qui ne veut pas dire qu'il faut relâcher le cadre — c'est justement le bon moment pour construire des habitudes qui protègent cet équilibre dans la durée.",
    };
  }

  function renderHormonal(answers, bio, morpho) {
    const h = computeHormonal(answers, bio, morpho);
    document.getElementById('hormonal-title').textContent = h.title;
    document.getElementById('hormonal-text').textContent = h.text;
  }

  // ── Exercices à éviter (vu douleurs + mobilité + posture) ──
  // Moteur d'analyse morpho-anatomique — exercices à proscrire par groupe
  // musculaire, selon les 11 paramètres morphologiques collectés dans
  // "Analyse sans photo". Règles fournies par Matthieu (issues de "Devenir
  // Coach d'Élite — Compréhension anatomique").
  function buildExerciseContraindications(morpho) {
    const clavicule = { plus_larges: 'large', moyenne: 'moyenne', plus_petites: 'etroite' }[morpho.clavicules_hanches];
    const bras = { plus_grand: 'longs', identique: 'moyens', plus_petit: 'courts' }[morpho.bras_jambes];
    const torse = { plus_long: 'long', identique: 'moyen', plus_court: 'court' }[morpho.buste_jambes];
    const cage = { plus_large: 'ample', moyenne: 'moyenne', plus_courte: 'etroite' }[morpho.cage_hanches];
    const valgus = morpho.valgus;
    const bassin = morpho.bassin;
    const femur = morpho.femur;
    const calcaneum = morpho.calcaneum;

    const groups = { Pectoraux: [], Dos: [], 'Épaules': [], Jambes: [], Biceps: [], Triceps: [] };
    const add = (group, exercise, reason, severity) => groups[group].push({ exercise, reason, severity: severity || 'proscrit' });

    // PECTORAUX
    if (bras === 'longs' && cage === 'etroite') {
      add('Pectoraux', 'Développé couché barre', "Bras longs + cage thoracique étroite : risque de déchirure des tendons et de conflit à la coiffe des rotateurs.");
    } else if (bras === 'longs') {
      add('Pectoraux', 'Développé couché', "Bras longs : à exécuter avec vigilance (amplitude accrue, plus de risque à l'épaule).", 'vigilance');
      add('Pectoraux', 'Développé haltères incliné', "Bras longs : charge à limiter, même logique d'amplitude accrue.", 'vigilance');
    }
    if (clavicule === 'large') add('Pectoraux', 'Presse sur banc étroit', "Clavicules larges : omoplates trop mobiles sur cet appui resserré.");
    if (valgus === 'prononce') add('Pectoraux', 'Dips', "Valgus de coude prononcé : les coudes partent vers l'extérieur, le transfert de charge se fait sur les trapèzes.");

    // DOS
    if (valgus === 'prononce') {
      add('Dos', 'Tirage barre supination bilatéral', "Valgus de coude prononcé : contrainte excessive sur le coude en prise supination bilatérale.");
      add('Dos', 'Rowing barre supination', "Valgus de coude prononcé : même contrainte au coude.");
    }
    if (bassin === 'etroit') {
      add('Dos', 'Rowing barre classique', "Bassin étroit : stabilité réduite sur ce mouvement en charge.");
      add('Dos', 'Soulevé de terre barre lourde', "Bassin étroit : stabilité réduite sous charge lourde.");
    }
    if (torse === 'long') add('Dos', 'Hyperextension banc classique', "Torse long : risque d'hyperlordose lombaire sur ce mouvement.");
    if (bras === 'longs') add('Dos', 'Tractions barre bilatérales', "Bras longs : compensation par les biceps, risque articulaire accru.");

    // ÉPAULES
    if (valgus === 'prononce') {
      add('Épaules', 'Tirage barre/haltères au menton', "Valgus de coude prononcé : contrainte au coude sur ce tirage vertical.");
      add('Épaules', 'Développé militaire derrière la nuque', "Valgus de coude prononcé, combiné au risque de conflit à l'épaule sur ce trajet.");
    }
    if (bras === 'longs') {
      add('Épaules', 'Élévations latérales haltères lourd', "Bras longs : bras de levier désavantageux en charge lourde sur ce mouvement.");
      add('Épaules', 'Élévations frontales haltères bilatérales', "Bras longs : même logique de bras de levier désavantageux.");
      add('Épaules', 'Élévations penchées avant haltères', "Bras longs : même logique de bras de levier désavantageux.");
    }
    if (clavicule === 'etroite') add('Épaules', 'Élévations toutes variantes lourd', "Clavicules étroites : les trapèzes deviennent dominants sur le mouvement en charge lourde.");

    // JAMBES
    if (femur === 'long') {
      add('Jambes', 'Squat barre classique', "Fémur long : mécanique défavorable, bascule du buste vers l'avant.");
      add('Jambes', 'Leg curl couché', "Fémur long : bras de levier défavorable sur cet appareil.");
    }
    if (femur === 'long' && bassin === 'etroit') add('Jambes', 'Soulevé de terre jambes tendues barre lourde', "Fémur long + bassin étroit : stabilité et mécanique lombaire compromises en charge lourde.");
    if (calcaneum === 'long') add('Jambes', 'Squat amplitude profonde', "Calcanéum long : limite la profondeur atteignable sans compensation lombaire.");

    // BICEPS
    if (valgus === 'prononce') {
      add('Biceps', 'Curl barre droite', "Valgus de coude prononcé : contrainte excessive en prise fixe bilatérale.");
      add('Biceps', 'Curl barre EZ bilatéral', "Valgus de coude prononcé : même contrainte en prise bilatérale.");
      add('Biceps', 'Machine curl pupitre barre/EZ', "Valgus de coude prononcé : bras fixé sur l'appareil, contrainte accrue.");
    }
    if (bras === 'longs') add('Biceps', 'Câble curl bilatéral prise large', "Bras longs : amplitude et bras de levier désavantageux en prise large.");

    // TRICEPS
    if (valgus === 'prononce') {
      add('Triceps', 'Extension barre/EZ', "Valgus de coude prononcé : contrainte au coude sur ce mouvement en extension.");
      add('Triceps', 'Dips triceps', "Valgus de coude prononcé : coudes vers l'extérieur, transfert de charge défavorable.");
      add('Triceps', 'Machines triceps prise large', "Valgus de coude prononcé : la prise large accentue la contrainte au coude.");
    }

    return groups;
  }

  function renderAvoidList(morpho) {
    const groups = buildExerciseContraindications(morpho);
    const order = ['Pectoraux', 'Dos', 'Épaules', 'Jambes', 'Biceps', 'Triceps'];
    document.getElementById('avoid-groups').innerHTML = order.map((name) => {
      const items = groups[name];
      if (items.length === 0) {
        return `<div class="avoid-group"><h3 class="avoid-group__title">${name}</h3><p class="avoid-group__ok">✓ Aucune contre-indication pour ce groupe.</p></div>`;
      }
      return `<div class="avoid-group">
        <h3 class="avoid-group__title">${name}</h3>
        <ul class="avoid-group__list">
          ${items.map((it) => `<li class="avoid-item avoid-item--${it.severity}"><span class="avoid-item__exercise">${it.exercise}${it.severity === 'vigilance' ? ' (avec vigilance)' : ''}</span><span class="avoid-item__reason">${it.reason}</span></li>`).join('')}
        </ul>
      </div>`;
    }).join('');
    document.getElementById('avoid-signature').textContent = 'Ce bilan est offert par Rijal Fit. Pour un programme complet personnalisé à ta génétique, contacte Matthieu.';
  }

  function renderZonesGrid(activeZone) {
    const grid = document.getElementById('zones-grid');
    grid.innerHTML = '';
    ZONE_ORDER.forEach((key) => {
      const z = ZONES[key];
      const card = document.createElement('div');
      card.className = 'zone-card' + (z.key === activeZone.key ? ' is-active' : '');
      card.style.borderTopColor = z.color;
      card.innerHTML = `
        <span class="zone-card__tag" style="background:${z.bg};color:${z.color}">${z.key === activeZone.key ? 'Toi' : `${z.min}-${z.max} pts`}</span>
        <div class="zone-card__name" style="color:${z.color}">${z.name}</div>
        <div class="zone-card__desc">${z.tagline}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ── Graphique de trajectoire (SVG fait maison, pas de dépendance externe) ──
  // Score sur une échelle 0-3 : la réponse du jour donne le score actuel
  // (A=3, B=2, C=1 — 0 n'est jamais une réponse, c'est juste le plancher de
  // l'échelle). Pas de points dans le passé (20/30 ans n'a pas de sens pour
  // un prospect de 25 ans) — uniquement une projection à 3/6/9/12 mois si
  // rien ne change, par paliers trimestriels.
  function projectScore(today) {
    const step = (v) => Math.max(0, v - v * 0.12 - 0.12);
    const in3 = step(today);
    const in6 = step(in3);
    const in9 = step(in6);
    const in12 = step(in9);
    return [today, in3, in6, in9, in12];
  }

  function renderChart(answers) {
    const mapAnswer = (val) => (val === null ? 2 : 3 - val); // A(0)->3, B(1)->2, C(2)->1

    const series = [
      { label: 'Énergie', color: '#4A5240', values: projectScore(mapAnswer(answers[0])) },
      { label: 'Prière', color: '#C9A84C', values: projectScore(mapAnswer(answers[7])) },
      { label: 'Discipline', color: '#7a8a6a', values: projectScore(mapAnswer(answers[1])) },
    ];

    // Léger décalage vertical par série pour que deux marqueurs avec la même
    // réponse aujourd'hui (donc des courbes identiques) restent visibles l'une
    // à côté de l'autre au lieu que la dernière dessinée masque l'autre.
    series.forEach((s, i) => {
      const jitter = (i - (series.length - 1) / 2) * 0.045;
      s.values = s.values.map((v) => Math.min(3, Math.max(0, v + jitter)));
    });

    document.getElementById('chart-legend').innerHTML = series.map((s) =>
      `<span><i style="background:${s.color}"></i>${s.label}</span>`
    ).join('');

    const W = 640, H = 260, padL = 26, padR = 16, padT = 16, padB = 34;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const xLabels = ["Aujourd'hui", '+3 mois', '+6 mois', '+9 mois', '+12 mois'];

    function xPos(i) { return padL + (i / (xLabels.length - 1)) * plotW; }
    // score 3 (le mieux) en haut du graphe, score 0 (le pire) en bas —
    // une trajectoire qui se dégrade se lit comme une courbe qui descend.
    function yPos(v) { return padT + plotH - (v / 3) * plotH; }

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="overflow:visible;font-family:Inter,sans-serif;">`;

    // graduations 0/1/2/3 en ordonnée
    [0, 1, 2, 3].forEach((n) => {
      const y = yPos(n);
      svg += `<line x1="${padL}" y1="${y}" x2="${padL + plotW}" y2="${y}" stroke="#e4ddd0" stroke-width="1" />`;
      svg += `<text x="${padL - 6}" y="${y + 3}" font-size="10" fill="#9a9488" text-anchor="end">${n}</text>`;
    });

    // lignes de séries : tout est projection à partir d'aujourd'hui, donc
    // entièrement en pointillé — seul le point "Aujourd'hui" (premier cercle)
    // représente une donnée réelle (la réponse du jour).
    series.forEach((s) => {
      const points = s.values.map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');
      svg += `<polyline points="${points}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5,4" />`;
      s.values.forEach((v, i) => {
        svg += `<circle cx="${xPos(i)}" cy="${yPos(v)}" r="3.5" fill="${s.color}" />`;
      });
    });

    // axe X labels
    xLabels.forEach((label, i) => {
      svg += `<text x="${xPos(i)}" y="${H - 8}" font-size="10.5" fill="#6b7280" text-anchor="middle">${label}</text>`;
    });

    svg += `</svg>`;
    document.getElementById('chart-container').innerHTML = svg;
  }
})();
