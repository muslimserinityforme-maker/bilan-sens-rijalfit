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
      name: 'Réalignement Stable',
      tagline: "Ta base tient. Le sol ne bouge pas encore — mais sans cadre, il peut se fissurer plus vite que tu ne le crois.",
      message: "Ta base tient — c'est une vraie force, ne la sous-estime pas. Mais « stable » ne veut pas dire « à l'abri ». Ton corps est une amānah : il ne demande pas d'être parfait, juste d'être entretenu avant que la fissure ne s'installe. Si tu veux verrouiller ça durablement — avant que le rythme de la vie ne s'en charge à ta place — je suis là.",
    },
    yoyo: {
      key: 'yoyo', min: 7, max: 12,
      color: '#C9A84C', bg: '#faf4e4',
      name: 'Le Cycle Yoyo',
      tagline: "Ton corps envoie des signaux. La fenêtre pour inverser le cycle est encore ouverte — mais elle se referme chaque mois qui passe.",
      message: "Ce que tu ressens là, ce n'est pas un manque de volonté. C'est le cycle : tu te reprends, tu tiens, la fatigue s'installe, tu redécroches. Le problème n'est jamais le programme — c'est qu'on n'a jamais trouvé la vraie racine de ton blocage. Ton corps a un droit sur toi, et là, il te parle. C'est le bon moment pour l'écouter.",
    },
    decrochage: {
      key: 'decrochage', min: 13, max: 18,
      color: '#a13a3a', bg: '#f6e9e9',
      name: 'Décrochage Installé',
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
    badge.textContent = `Zone · ${zone.name}`;
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
    renderBodyFat(body);
    renderFicheComposition(body);
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

  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Silhouette simple en SVG (pas de photo) — s'élargit légèrement d'une bande à l'autre.
  function silhouette(color, scale) {
    const w = 20 * scale;
    return `<svg width="36" height="58" viewBox="0 0 40 70" aria-hidden="true"><circle cx="20" cy="10" r="9" fill="${color}"/><path d="M ${20 - w / 2} 68 Q ${20 - w / 2 - 3} 30 20 22 Q ${20 + w / 2 + 3} 30 ${20 + w / 2} 68 Z" fill="${color}"/></svg>`;
  }

  function renderGaugeInto(elId, bands, currentValue) {
    const html = bands.map((b) => {
      const active = currentValue >= b.min && currentValue < b.max;
      const border = active ? b.color : 'transparent';
      return `<div class="gauge-seg" style="background:${hexToRgba(b.color, active ? 0.12 : 0.05)};border-color:${border}">
        <div class="gauge-seg__silhouette">${silhouette(b.color, b.scale)}</div>
        <span class="gauge-seg__range" style="color:${b.color}">${b.rangeLabel}</span>
        <span class="gauge-seg__label">${b.label}</span>
      </div>`;
    }).join('');
    document.getElementById(elId).innerHTML = html;
    // is-active nécessite la classe (pas juste le style) pour l'effet visuel défini en CSS
    const segs = document.getElementById(elId).children;
    bands.forEach((b, i) => {
      if (currentValue >= b.min && currentValue < b.max) segs[i].classList.add('is-active');
    });
  }

  const IMC_BANDS = [
    { min: 0, max: 18.5, rangeLabel: '< 18,5', label: 'Sous-poids', color: '#7a93a8', scale: 0.7 },
    { min: 18.5, max: 25, rangeLabel: '18,5-24,9', label: 'Normal', color: '#4A5240', scale: 0.85 },
    { min: 25, max: 30, rangeLabel: '25-29,9', label: 'Surpoids', color: '#C9A84C', scale: 1.0 },
    { min: 30, max: 35, rangeLabel: '30-34,9', label: 'Obésité', color: '#c17f3a', scale: 1.15 },
    { min: 35, max: 999, rangeLabel: '35+', label: 'Obésité sévère', color: '#a13a3a', scale: 1.3 },
  ];

  const BODYFAT_BANDS = [
    { min: 0, max: 15, rangeLabel: '< 15%', label: 'Faible', color: '#4A5240', scale: 0.8 },
    { min: 15, max: 25, rangeLabel: '15-25%', label: 'Moyen', color: '#C9A84C', scale: 1.0 },
    { min: 25, max: 999, rangeLabel: '25%+', label: 'Élevé', color: '#a13a3a', scale: 1.2 },
  ];

  function renderFicheImc(bio, body) {
    const rows = [
      ['Taille', `${bio.taille} cm`],
      ['Poids', `${bio.poids} kg`],
      ['Âge', `${bio.age} ans`],
      ['IMC', `${body.imc}`],
      ["Niveau d'activité", ACTIVITE_LABELS[bio.activite] || bio.activite],
    ];
    document.getElementById('fiche-imc-rows').innerHTML = rows.map(([l, v]) => `<div class="fiche-row"><span class="fiche-row__label">${l}</span><span class="fiche-row__value">${v}</span></div>`).join('');
    renderGaugeInto('gauge-imc', IMC_BANDS, body.imc);
  }

  function renderBodyFat(body) {
    const low = Math.floor(body.bodyFatPercent / 5) * 5;
    const high = low + 5;
    document.getElementById('bodyfat-range-text').textContent = `Ton taux de graisse corporelle estimé se situe entre ${low}% et ${high}%.`;
    renderGaugeInto('gauge-bodyfat', BODYFAT_BANDS, body.bodyFatPercent);
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
  function project(todayVal) {
    const twenty = Math.max(4, todayVal * 0.15);
    const thirty = Math.max(8, todayVal * 0.45);
    const in12 = Math.min(96, todayVal + (100 - todayVal) * 0.28 + 4);
    const in24 = Math.min(98, in12 + (100 - in12) * 0.35 + 4);
    return [twenty, thirty, todayVal, in12, in24];
  }

  function renderChart(answers) {
    const mapAnswer = (val) => (val === null ? 40 : val * 40 + 15); // 0->15, 1->55, 2->95

    const series = [
      { label: 'Énergie', color: '#4A5240', values: project(mapAnswer(answers[0])) },
      { label: 'Prière', color: '#C9A84C', values: project(mapAnswer(answers[7])) },
      { label: 'Discipline', color: '#7a8a6a', values: project(mapAnswer(answers[1])) },
      { label: 'Poids', color: '#a13a3a', values: project(mapAnswer(answers[2])) },
    ];

    const W = 640, H = 260, padL = 36, padR = 16, padT = 16, padB = 34;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const xLabels = ['20 ans', '30 ans', "Aujourd'hui", '+12 mois', '+24 mois'];

    function xPos(i) { return padL + (i / (xLabels.length - 1)) * plotW; }
    function yPos(v) { return padT + plotH - (v / 100) * plotH; }

    let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="overflow:visible;font-family:Inter,sans-serif;">`;

    // bandes de zone
    const bands = [{ from: 0, to: 30, color: '#eef0ea' }, { from: 30, to: 60, color: '#faf4e4' }, { from: 60, to: 100, color: '#f6e9e9' }];
    bands.forEach((b) => {
      const y1 = yPos(b.to), y2 = yPos(b.from);
      svg += `<rect x="${padL}" y="${y1}" width="${plotW}" height="${y2 - y1}" fill="${b.color}" />`;
    });

    // lignes de séries
    series.forEach((s) => {
      const points = s.values.map((v, i) => `${xPos(i)},${yPos(v)}`).join(' ');
      svg += `<polyline points="${points}" fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`;
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
