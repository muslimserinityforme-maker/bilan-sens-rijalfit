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

  // ── DOM refs ──
  const screens = {
    intro: document.getElementById('screen-intro'),
    bio: document.getElementById('screen-bio'),
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
      showScreen('bio');
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
      contexteProSignal: silentIndex >= 0 ? answers[silentIndex] : null,
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
    const objectifKcal = Math.round(tdee * (CALORIE_ADJUSTMENT[objectif] || 1.0));
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
    },
    mesomorphe: {
      name: 'Mésomorphe',
      img: 'images/morphotype-mesomorphe.jpg',
      text: "Une carrure naturellement athlétique : tu réagis vite à l'entraînement, tu prends du muscle et perds du gras plus facilement que la moyenne. Le risque, c'est de compter sur cette facilité et de relâcher le cadre — ce profil se dégrade vite dès que l'hygiène de vie part en vrille.",
    },
    endomorphe: {
      name: 'Endomorphe',
      img: 'images/morphotype-endomorphe.jpg',
      text: "Une ossature large et un métabolisme plus lent : ton corps stocke plus facilement, surtout au niveau du ventre. Ce n'est pas un manque de volonté — c'est ta base de départ. Bien encadré, c'est souvent le profil qui progresse le plus vite une fois le déclic fait.",
    },
  };

  function renderMorphotype(body, bio) {
    let key;
    if (body.imc < 21) key = 'ectomorphe';
    else if (body.imc < 27) key = 'mesomorphe';
    else key = 'endomorphe';
    const m = MORPHOTYPES[key];
    document.getElementById('morphotype-img').src = m.img;
    document.getElementById('morphotype-img').alt = m.name;
    document.getElementById('morphotype-name').textContent = m.name;
    document.getElementById('morphotype-text').textContent = m.text;
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
    { key: 'stress', name: 'Ventre du stress', desc: "Lié au cortisol — tension nerveuse, sommeil dégradé, ventre qui se durcit sans forcément grossir." },
    { key: 'viscerale', name: 'Graisse viscérale', desc: "La plus profonde, autour des organes — plus fréquente avec l'âge et la sédentarité prolongée." },
    { key: 'souscutanee', name: 'Graisse sous-cutanée', desc: "Sous la peau, la plus visible et la plus courante — répond bien à un travail combiné nutrition/sport." },
    { key: 'leger', name: 'Léger, en installation', desc: "Rien d'installé durablement — le bon moment pour agir avant que ça ne se fixe." },
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
        </div>
        ${t.key === activeKey ? '<span class="bellytype-card__tag">Le tien</span>' : ''}
      </div>
    `).join('');
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
  // l'échelle). Sans intervention, on projette une meilleure situation dans
  // le passé (20/30 ans) et une dégradation dans le futur (+12/+24 mois).
  function projectScore(today) {
    const twenty = Math.min(3, today + (3 - today) * 0.7 + 0.3);
    const thirty = Math.min(3, today + (3 - today) * 0.35 + 0.1);
    const in12 = Math.max(0, today - today * 0.30 - 0.15);
    const in24 = Math.max(0, in12 - in12 * 0.40 - 0.15);
    return [twenty, thirty, today, in12, in24];
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
    const xLabels = ['20 ans', '30 ans', "Aujourd'hui", '+12 mois', '+24 mois'];

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

    // lignes de séries : plein pour le passé→aujourd'hui (index 0-2), pointillé
    // pour la projection aujourd'hui→futur (index 2-4), les deux tronçons
    // partageant le point "Aujourd'hui".
    series.forEach((s) => {
      const pastPoints = s.values.slice(0, 3).map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');
      const futurePoints = s.values.slice(2).map((v, i) => `${xPos(i + 2)},${yPos(v)}`).join(' ');
      svg += `<polyline points="${pastPoints}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`;
      svg += `<polyline points="${futurePoints}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5,4" />`;
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
