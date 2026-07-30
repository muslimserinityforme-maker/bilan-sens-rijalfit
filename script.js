(function () {
  const QUESTIONS = [
    {
      title: "Au réveil, quelle est ton énergie réelle ?",
      sub: "Pas l'énergie après le café. Avant.",
      options: [
        "Solide. Je me lève prêt à commencer ma journée.",
        "Variable. Certains jours bons, d'autres lourds.",
        "Vidé. Je traîne dès le matin, même après une nuit complète.",
      ],
    },
    {
      title: "Ta force et ta discipline physique aujourd'hui ?",
      sub: "Comparé à toi, il y a 5 ou 10 ans.",
      options: [
        "Stable. Je tiens mes engagements.",
        "En baisse douce. Je sens que je dois me forcer davantage.",
        "Nettement en retrait. Je ne me reconnais plus.",
      ],
    },
    {
      title: "Le gras autour du ventre ?",
      sub: "Le signal numéro un du corps qui décroche.",
      options: [
        "Sous contrôle, ma ceinture n'a pas bougé.",
        "Il s'installe doucement, malgré mes efforts.",
        "Visible et tenace, rien ne semble le déloger.",
      ],
    },
    {
      title: "Ta motivation à tenir tes engagements ?",
      sub: "Sport, discipline, adoration — ce qui te fait avancer.",
      options: [
        "Intacte. J'ai toujours faim de mieux faire.",
        "Plus tiède qu'avant. Je me force davantage.",
        "Éteinte. Je n'ai plus le feu d'avant.",
      ],
    },
    {
      title: "La qualité de ton sommeil ?",
      sub: "Le vrai marqueur de récupération.",
      options: [
        "Profond et réparateur, je récupère vite.",
        "Correct mais haché, je ne me sens pas frais.",
        "Mauvais. Réveils, ruminations, fatigue chronique.",
      ],
    },
    {
      title: "Ta présence pour ta famille et ton couple ?",
      sub: "Pas physiquement présent — vraiment présent.",
      options: [
        "Pleinement présent, disponible pour eux.",
        "Moins disponible qu'avant, je le sens.",
        "Absent même quand je suis là.",
      ],
    },
    {
      title: "Ton humeur et ta patience au quotidien ?",
      sub: "Question directe. Réponse honnête.",
      options: [
        "Stable. Je gère la pression sans craquer.",
        "Plus irritable, plus à fleur de peau.",
        "Cassant, sombre ou apathique souvent.",
      ],
    },
    {
      title: "Ta régularité dans tes 5 prières ?",
      sub: "Pas juste les accomplir — y être présent.",
      options: [
        "Régulier, à l'heure, présent de cœur.",
        "Je rattrape souvent, présence en pointillés.",
        "Je décroche fréquemment, trop fatigué pour être présent.",
      ],
    },
    {
      title: "Quand tu te regardes dans le miroir ?",
      sub: "L'instinct compte plus que le détail.",
      options: [
        "Je me reconnais. J'aime ce que je vois.",
        "Je vois un homme qui s'éloigne de lui-même.",
        "Je détourne le regard. Ce n'est plus moi.",
      ],
    },
  ];

  const ZONES = {
    stable: {
      key: 'stable', min: 0, max: 6,
      color: '#4A5240', bg: '#eef0ea',
      name: 'Réalignement Stable',
      tagline: "Ta base tient. Le sol ne bouge pas encore — mais sans cadre, il peut se fissurer plus vite que tu ne le crois.",
      message: "Habibi, ta base tient — c'est une vraie force, ne la sous-estime pas. Mais « stable » ne veut pas dire « à l'abri ». Ton corps est une amānah : il ne demande pas d'être parfait, juste d'être entretenu avant que la fissure ne s'installe. Si tu veux verrouiller ça durablement — avant que le rythme de la vie ne s'en charge à ta place — je suis là.",
    },
    yoyo: {
      key: 'yoyo', min: 7, max: 12,
      color: '#C9A84C', bg: '#faf4e4',
      name: 'Le Cycle Yoyo',
      tagline: "Ton corps envoie des signaux. La fenêtre pour inverser le cycle est encore ouverte — mais elle se referme chaque mois qui passe.",
      message: "Habibi, ce que tu ressens là, ce n'est pas un manque de volonté. C'est le cycle : tu te reprends, tu tiens, la fatigue s'installe, tu redécroches. Le problème n'est jamais le programme — c'est qu'on n'a jamais trouvé la vraie racine de ton blocage. Ton corps a un droit sur toi, et là, il te parle. C'est le bon moment pour l'écouter.",
    },
    decrochage: {
      key: 'decrochage', min: 13, max: 18,
      color: '#a13a3a', bg: '#f6e9e9',
      name: 'Décrochage Installé',
      tagline: "Le décrochage est installé. Chaque semaine qui passe rend la reprise plus difficile. Il te faut une méthode, maintenant.",
      message: "Habibi, je ne vais pas te mentir : ce que tu ressens est lourd, et c'est réel. Mais ce n'est pas une fatalité. Ton corps a un droit sur toi — pas pour te juger, pour t'aider à te reprendre. J'ai accompagné des frères exactement dans ta situation, et le premier pas n'est jamais le plus dur physiquement — c'est de décider de ne plus porter ça seul.",
    },
  };

  const ZONE_ORDER = ['stable', 'yoyo', 'decrochage'];

  function getZone(score) {
    if (score <= ZONES.stable.max) return ZONES.stable;
    if (score <= ZONES.yoyo.max) return ZONES.yoyo;
    return ZONES.decrochage;
  }

  // ── State ──
  let currentQuestion = -1; // -1 = intro
  const answers = new Array(QUESTIONS.length).fill(null);

  // ── DOM refs ──
  const screens = {
    intro: document.getElementById('screen-intro'),
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

  function renderQuestion(index) {
    const q = QUESTIONS[index];
    document.getElementById('q-label').textContent = `Question ${index + 1} / ${QUESTIONS.length}`;
    document.getElementById('q-title').textContent = q.title;
    document.getElementById('q-sub').textContent = q.sub;

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';
    const letters = ['A', 'B', 'C'];
    q.options.forEach((optionText, optIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-card';
      btn.innerHTML = `<span class="option-card__badge">${letters[optIndex]}</span><span>${optionText}</span>`;
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
    }
  });

  document.getElementById('start-btn').addEventListener('click', () => {
    currentQuestion = 0;
    renderQuestion(0);
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
    return answers.reduce((sum, a) => sum + (a === null ? 0 : a), 0);
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
    const lead = {
      date: new Date().toISOString(),
      prenom: document.getElementById('g-prenom').value,
      nom: document.getElementById('g-nom').value,
      email: document.getElementById('g-email').value,
      telephone: document.getElementById('g-telephone').value,
      score,
      zone: zone.name,
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
    renderResult(zone, score, lead.prenom);
  });

  function renderResult(zone, score, prenom) {
    const badge = document.getElementById('result-badge');
    badge.textContent = `Zone · ${zone.name}`;
    badge.style.background = 'rgba(255,255,255,.12)';
    badge.style.color = '#fff';

    document.getElementById('result-hello').textContent = prenom ? `${prenom}, ton profil :` : 'Ton profil :';
    const nameEl = document.getElementById('result-zone-name');
    nameEl.textContent = zone.name;
    document.getElementById('result-zone-tagline').textContent = zone.tagline;
    document.getElementById('result-score').textContent = score;

    renderZonesGrid(zone);
    renderChart(zone, score, answers);

    document.getElementById('message-zone-text').textContent = zone.message;

    showScreen('result');
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

  function renderChart(zone, score, answers) {
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
