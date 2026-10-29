(function () {
  // ── Réglages à compléter ──
  // Vidéo personnalisée du coach, une par profil (lien YouTube, Vimeo ou lien
  // d'intégration). Laisse vide : le message écrit s'affiche à la place.
  const VIDEOS = { stable: '', yoyo: '', decrochage: '' };
  // Lien WhatsApp du coach (ex. 'https://wa.me/33600000000'). Vide = bouton masqué.
  const WHATSAPP_URL = '';
  const CALENDLY_URL = 'https://calendly.com/muslimserinityforme/programme-ton-bilan-intermediaire';

  // 9 questions, 3 réponses chacune (A=0, B=1, C=2 points). Chaque question
  // alimente une des 4 santés : physique, mentale, sociale, spirituelle.
  const QUESTIONS = [
    {
      sante: 'physique', short: 'Énergie',
      title: "Au réveil, quelle est ton énergie réelle ?",
      sub: "Pas l'énergie après le café. Avant.",
      bg: "images/q1-bg.jpg",
      optionImages: ["images/q1-a.jpg", "images/q1-b.jpg", "images/q1-c.jpg"],
      options: [
        "Solide. Je me lève prêt à commencer ma journée.",
        "Variable. Certains jours bons, d'autres lourds.",
        "Vidé. Je traîne dès le matin, même après une nuit complète.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ton énergie. Tu te lèves déjà vidé, et un corps sans énergie a du mal à se lever pour Fajr avec présence. Ce n'est pas de la paresse : c'est un signal que ton corps t'envoie, et ça se retravaille.",
    },
    {
      sante: 'sociale', short: 'Vie sociale',
      title: "Tes moments avec tes frères, tes amis, ta communauté ?",
      sub: "Mosquée, sorties, appels : avoir l'énergie d'y aller.",
      bg: "images/q6-bg.jpg",
      optionImages: ["images/q6-a.jpg", "images/q6-b.jpg", "images/q6-c.jpg"],
      options: [
        "Je suis présent et j'y vais avec plaisir.",
        "Je décline plus souvent qu'avant, par fatigue.",
        "Je m'isole, je n'ai plus l'énergie d'y aller.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est l'énergie que tu as pour les autres. Ce n'est pas de la distance : c'est la fatigue qui te coupe de ceux qui comptent. Ça se retravaille, et c'est souvent le premier signe qui revient quand le corps va mieux.",
    },
    {
      sante: 'physique', short: 'Ventre',
      title: "Le gras autour du ventre ?",
      sub: "Le signal numéro un du corps qui décroche.",
      bg: "images/q3-bg.jpg",
      optionImages: ["images/q3-a.jpg", "images/q3-b.jpg", "images/q3-c.jpg"],
      options: [
        "Sous contrôle, ma ceinture n'a pas bougé.",
        "Il s'installe doucement, malgré mes efforts.",
        "Visible et tenace, rien ne semble le déloger.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ce poids qui s'installe malgré toi. Ton corps est une amānah : il te parle à travers ce ventre qui ne bouge pas. Il demande surtout qu'on l'écoute, et ça se retravaille.",
    },
    {
      sante: 'mentale', short: 'Motivation',
      title: "Ta motivation à tenir tes engagements ?",
      sub: "Sport, discipline, adoration : ce qui te fait avancer.",
      bg: "images/q4-bg.jpg",
      optionImages: ["images/q4-a.jpg", "images/q4-b.jpg", "images/q4-c.jpg"],
      options: [
        "Intacte. J'ai toujours faim de mieux faire.",
        "Plus tiède qu'avant. Je me force davantage.",
        "Éteinte. Je n'ai plus le feu d'avant.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ta motivation qui s'essouffle. Le feu qui te faisait avancer, dans ton sport comme dans ta pratique, est plus faible. Ce n'est pas irréversible : un feu se rallume, souvent avec un cadre simple et quelqu'un qui te suit.",
    },
    {
      sante: 'physique', short: 'Sommeil',
      title: "La qualité de ton sommeil ?",
      sub: "Le vrai marqueur de récupération.",
      bg: "images/q5-bg.jpg",
      optionImages: ["images/q5-a.jpg", "images/q5-b.jpg", "images/q5-c.jpg"],
      options: [
        "Profond et réparateur, je récupère vite.",
        "Correct mais haché, je ne me sens pas frais.",
        "Mauvais. Réveils, ruminations, fatigue chronique.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ton sommeil. Sans récupération, rien d'autre ne tient, ni ton corps, ni ta concentration dans la prière. C'est souvent le premier domino à réparer avant tout le reste.",
    },
    {
      sante: 'sociale', short: 'Famille',
      title: "Ta présence pour ta famille et ton couple ?",
      sub: "Pas physiquement présent : vraiment présent.",
      bg: "images/q6-bg.jpg",
      optionImages: ["images/q6-a.jpg", "images/q6-b.jpg", "images/q6-c.jpg"],
      options: [
        "Pleinement présent, disponible pour eux.",
        "Moins disponible qu'avant, je le sens.",
        "Absent même quand je suis là.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est l'énergie que tu as pour les tiens. Quand le corps est fatigué, il en reste moins pour ta famille. Prendre soin de toi, c'est aussi prendre soin d'eux.",
    },
    {
      sante: 'mentale', short: 'Humeur',
      title: "Ton humeur et ta patience au quotidien ?",
      sub: "Question directe. Réponse honnête.",
      bg: "images/q7-bg.jpg",
      optionImages: ["images/q7-a.jpg", "images/q7-b.jpg", "images/q7-c.jpg"],
      options: [
        "Stable. Je gère la pression sans craquer.",
        "Plus irritable, plus à fleur de peau.",
        "Cassant, sombre ou sans énergie souvent.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ton humeur. Quand le corps est épuisé, la patience s'use, et ça se ressent à la maison comme au travail. C'est un ressenti, et ça se retravaille.",
    },
    {
      sante: 'spirituelle', short: 'Prière',
      title: "Comment te sens-tu pendant la prière ?",
      sub: "Le lien entre ton corps et ton cœur dans l'adoration.",
      bg: "images/q8-bg.jpg",
      optionImages: ["images/q8-a.jpg", "images/q8-b.jpg", "images/q8-c.jpg"],
      options: [
        "Présent, concentré, apaisé.",
        "L'esprit ailleurs, difficile de me concentrer.",
        "Fatigué, mon corps me distrait de ce que je fais.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ta présence dans la prière. Ton corps fatigué te distrait au moment le plus important de ta journée. C'est exactement pour ça que Rijal Fit existe : relier ton corps à ton adoration, pas les séparer.",
    },
    {
      sante: 'spirituelle', short: 'Corps et adorations',
      title: "Pendant tes adorations, ton corps te suit ?",
      sub: "Debout, rukû, sujûd, jeûne : ton corps, pas ta foi.",
      bg: "images/q8-bg.jpg",
      optionImages: ["images/q8-a.jpg", "images/q8-b.jpg", "images/q8-c.jpg"],
      options: [
        "Sans gêne. Mon corps suit, même quand je jeûne.",
        "Quelques raideurs, douleurs ou coups de fatigue me gênent.",
        "Je raccourcis ou j'évite certaines positions à cause de mon corps.",
      ],
      problemText: "Ce qui pèse le plus ici, c'est ton corps dans l'adoration. Raideurs, douleurs ou fatigue te gênent là où tu voudrais être pleinement présent. Ça ne dit rien de ta foi : c'est un corps qui a besoin d'aide, et ça se retravaille.",
    },
  ];

  // Les 4 santés : un texte par palier (haut / moyen / bas).
  const SANTES = [
    {
      key: 'physique', label: 'Santé physique',
      texts: {
        haut: "Ton énergie, ton sommeil et ton ventre sont plutôt en ordre. C'est une vraie base. L'enjeu, c'est de la garder.",
        moyen: "Certains jours ton corps suit, d'autres non. Énergie, sommeil ou ventre : l'un des trois freine souvent les autres. C'est là qu'on agit en premier.",
        bas: "Ton corps te demande de l'aide : énergie, sommeil, ventre. Avec le rythme que tu as, c'est logique. Ça se retravaille, et le sommeil est souvent le premier levier.",
      },
    },
    {
      key: 'mentale', label: 'Santé mentale',
      texts: {
        haut: "Ta motivation tient, ton humeur aussi. Ton énergie mentale est une force : garde-la.",
        moyen: "Ta motivation est plus tiède, ton humeur plus sensible. Ce n'est pas un manque de volonté, c'est ce que tu ressens aujourd'hui. Ça mérite qu'on s'y arrête.",
        bas: "Ta motivation ou ton humeur sont fatiguées en ce moment. Ce n'est pas un défaut de caractère, c'est un ressenti. Ça se retravaille, et c'est souvent le corps qui rallume le reste.",
      },
    },
    {
      key: 'sociale', label: 'Santé sociale',
      texts: {
        haut: "Tu es présent pour les tiens, ta famille comme tes frères. C'est précieux. Garde l'énergie qui te permet de l'être.",
        moyen: "Tu es moins disponible qu'avant et tu le sens. Souvent, c'est la fatigue qui prend la place, pas le manque d'amour.",
        bas: "Tu as l'impression d'être là sans être vraiment là, ou de t'éloigner des autres. C'est lourd à porter. Quand le corps retrouve de l'énergie, la présence revient souvent avec.",
      },
    },
    {
      key: 'spirituelle', label: 'Santé spirituelle',
      question: "Ton corps t'aide-t-il dans tes adorations ?",
      texts: {
        haut: "Pendant la prière et les adorations, ton corps te suit. Il est au service de ton adoration. C'est une amānah bien tenue.",
        moyen: "Pendant la prière, ton esprit part parfois ailleurs, ou le corps proteste un peu. La fatigue et le sommeil y sont souvent pour quelque chose. C'est le corps qu'on peut aider.",
        bas: "Pendant tes adorations, ton corps te distrait : fatigue, lourdeur, douleurs. Ça ne dit rien de ta foi, c'est un corps qui a besoin d'aide. Ça se retravaille.",
      },
    },
  ];

  const ZONES = {
    stable: {
      key: 'stable', min: 0, max: 6,
      color: '#4A5240', bg: '#eef0ea',
      name: 'Réalignement stable',
      tagline: "Ta base tient. C'est une vraie force. L'enjeu maintenant : la garder, avec un cadre simple.",
      message: "Ta base tient, c'est une vraie force : ne la sous-estime pas. « Stable » ne veut pas dire « à l'abri ». Ton corps est une amānah, il demande d'être entretenu, pas d'être parfait. Si tu veux verrouiller ça durablement, avec un cadre qui tient dans ta vraie vie, je suis là.",
    },
    yoyo: {
      key: 'yoyo', min: 7, max: 12,
      color: '#C9A84C', bg: '#faf4e4',
      name: 'Le cycle yoyo',
      tagline: "Ton corps envoie des signaux. Tu te reprends, tu tiens, puis la fatigue revient. C'est un cycle, et un cycle se casse.",
      message: "Ce que tu ressens là, ce n'est pas un manque de volonté. C'est le cycle : tu te reprends, tu tiens, la fatigue s'installe, tu redécroches. Le problème n'est pas le programme : on n'a jamais trouvé la vraie racine de ton blocage. Ton corps a un droit sur toi, et là, il te parle. C'est le bon moment pour l'écouter.",
    },
    decrochage: {
      key: 'decrochage', min: 13, max: 18,
      color: '#a13a3a', bg: '#f6e9e9',
      name: 'Le moment de se reprendre',
      tagline: "Aujourd'hui, c'est lourd, et c'est normal. Ce n'est pas une fatalité : on peut se reprendre, une étape à la fois.",
      message: "Je ne vais pas te mentir : ce que tu ressens est lourd, et c'est réel. Mais ce n'est pas une fatalité. Ton corps a un droit sur toi : pas pour te juger, pour t'aider à te reprendre. J'ai accompagné des frères exactement dans ta situation, et le premier pas n'est jamais le plus dur physiquement : c'est de décider de ne plus porter ça seul.",
    },
  };

  function getZone(score) {
    if (score <= ZONES.stable.max) return ZONES.stable;
    if (score <= ZONES.yoyo.max) return ZONES.yoyo;
    return ZONES.decrochage;
  }

  // ── État ──
  let currentQuestion = -1; // -1 = avant les questions
  const answers = new Array(QUESTIONS.length).fill(null);
  const lead = { prenom: '', email: '', age: null };

  // ── Écrans ──
  const screens = {
    intro: document.getElementById('screen-intro'),
    depart: document.getElementById('screen-depart'),
    question: document.getElementById('screen-question'),
    result: document.getElementById('screen-result'),
  };
  const progressFill = document.getElementById('progress-fill');
  const topbarCount = document.getElementById('topbar-count');

  function showScreen(name) {
    Object.values(screens).forEach((el) => { el.hidden = true; });
    screens[name].hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateTopbar() {
    const done = currentQuestion < 0 ? 0 : Math.min(currentQuestion, QUESTIONS.length);
    progressFill.style.width = `${Math.round((done / QUESTIONS.length) * 100)}%`;
    topbarCount.textContent = `${done} / ${QUESTIONS.length}`;
  }

  // ── Enregistrement du lead (jamais bloquant pour la personne) ──
  async function sendLead(payload, waitMs) {
    const request = fetch('/api/log-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => console.error('log-lead a échoué', err));
    if (waitMs) {
      await Promise.race([request, new Promise((resolve) => setTimeout(resolve, waitMs))]);
    }
  }

  // ── Intro → départ ──
  document.getElementById('start-btn').addEventListener('click', () => {
    showScreen('depart');
  });

  // ── Départ : prénom, email, âge ──
  const departForm = document.getElementById('depart-form');
  const departError = document.getElementById('depart-error');

  departForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    departError.hidden = true;

    if (!departForm.checkValidity()) {
      departForm.reportValidity();
      return;
    }

    lead.prenom = document.getElementById('d-prenom').value.trim();
    lead.email = document.getElementById('d-email').value.trim();
    const ageValue = document.getElementById('d-age').value;
    lead.age = ageValue ? Number(ageValue) : null;

    const submitBtn = departForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    // L'email est enregistré dès maintenant : même si la personne s'arrête en
    // route, tu la gardes dans ta base (statut « Démarré » dans la Sheet).
    await sendLead({
      event: 'start',
      date: new Date().toISOString(),
      prenom: lead.prenom,
      email: lead.email,
      age: lead.age,
    }, 1500);
    submitBtn.disabled = false;

    currentQuestion = 0;
    renderQuestion(0);
  });

  // ── Questions ──
  function renderQuestion(index) {
    const q = QUESTIONS[index];
    document.getElementById('q-label').textContent = `Question ${index + 1} / ${QUESTIONS.length}`;
    document.getElementById('q-title').textContent = q.title;
    document.getElementById('q-sub').textContent = q.sub;

    const questionScreen = document.getElementById('screen-question');
    questionScreen.style.backgroundImage = q.bg ? `url('${q.bg}')` : '';

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';
    const letters = ['A', 'B', 'C'];
    q.options.forEach((optionText, optIndex) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-card';
      btn.innerHTML = `
        <span class="option-card__thumb">
          <img src="${q.optionImages[optIndex]}" alt="" />
          <span class="option-card__badge">${letters[optIndex]}</span>
        </span>
        <span>${optionText}</span>
      `;
      btn.addEventListener('click', () => selectOption(index, optIndex));
      optionsEl.appendChild(btn);
    });

    document.getElementById('prev-btn').style.visibility = 'visible';
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
      finish();
    }
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion -= 1;
      renderQuestion(currentQuestion);
    } else {
      showScreen('depart');
    }
  });

  document.getElementById('quit-btn').addEventListener('click', () => {
    if (confirm('Quitter le bilan ? Tes réponses ne seront pas gardées.')) {
      currentQuestion = -1;
      answers.fill(null);
      updateTopbar();
      showScreen('intro');
    }
  });

  // ── Calculs ──
  function computeScore() {
    return answers.reduce((sum, a) => sum + (a === null ? 0 : a), 0);
  }

  // Une santé = la somme des points de ses questions, ramenée en pourcentage.
  // Le plancher est à 20 % : un bilan ne doit jamais afficher « 0 % ».
  function computeSante(key) {
    const indexes = QUESTIONS.map((q, i) => (q.sante === key ? i : -1)).filter((i) => i >= 0);
    const points = indexes.reduce((sum, i) => sum + (answers[i] === null ? 0 : answers[i]), 0);
    const ratio = points / (indexes.length * 2);
    const pct = Math.round((100 - 80 * ratio) / 5) * 5;
    const tier = ratio <= 0.25 ? 'haut' : ratio <= 0.5 ? 'moyen' : 'bas';
    return { key, pct, tier, ratio };
  }

  // Ce qui pèse le plus, dans la santé à regarder en premier : la question de
  // cette santé qui a obtenu le plus de points. Le message du bas de page parle
  // donc toujours de la même chose que l'étiquette « À regarder en premier ».
  function getProblemIndex(priority) {
    if (!priority) return -1;
    let bestIndex = -1;
    let bestValue = 0;
    QUESTIONS.forEach((q, i) => {
      if (q.sante !== priority.key) return;
      const val = answers[i] === null ? 0 : answers[i];
      if (val > bestValue) { bestValue = val; bestIndex = i; }
    });
    return bestIndex;
  }

  function toEmbedUrl(url) {
    if (!url) return '';
    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
    return url;
  }

  // ── Fin du bilan ──
  function finish() {
    const score = computeScore();
    const zone = getZone(score);
    const santes = SANTES.map((s) => ({ ...s, ...computeSante(s.key) }));
    // La santé à regarder en premier : la plus basse, si elle n'est pas déjà « haute ».
    let lowest = santes[0];
    santes.forEach((s) => { if (s.ratio > lowest.ratio) lowest = s; });
    const priority = lowest.tier === 'haut' ? null : lowest;

    const topIndex = getProblemIndex(priority);
    const problemText = topIndex >= 0
      ? `Ce qui ressort de tes réponses : ta ${priority.label.toLowerCase()} (${priority.pct} %) est celle qui demande le plus d'attention. ${QUESTIONS[topIndex].problemText}`
      : '';

    sendLead({
      event: 'result',
      date: new Date().toISOString(),
      prenom: lead.prenom,
      email: lead.email,
      age: lead.age,
      score,
      zone: zone.name,
      physique: santes[0].pct,
      mentale: santes[1].pct,
      sociale: santes[2].pct,
      spirituelle: santes[3].pct,
      santeBasse: priority ? priority.label : 'Aucune',
      problemeN1: topIndex >= 0 ? QUESTIONS[topIndex].short : 'Aucun',
      // Tout ce qui s'affiche sur la page, pour que l'email soit le même retour.
      tagline: zone.tagline,
      zoneColor: zone.color,
      message: zone.message,
      problemText,
      videoUrl: VIDEOS[zone.key] || '',
      sante: santes.map((s) => ({
        label: s.label,
        question: s.question || '',
        pct: s.pct,
        tier: s.tier,
        priority: !!(priority && priority.key === s.key),
        text: s.texts[s.tier],
      })),
    });

    renderResult(zone, santes, priority, problemText);
  }

  function renderResult(zone, santes, priority, problemText) {
    const header = document.getElementById('result-header');
    header.classList.remove('result-header--stable', 'result-header--yoyo', 'result-header--decrochage');
    header.classList.add(`result-header--${zone.key}`);

    const badge = document.getElementById('result-badge');
    badge.innerHTML = `<span class="result-header__badge-square" style="background:${zone.color}"></span>Ton profil`;
    badge.style.background = 'rgba(255,255,255,.12)';
    badge.style.color = '#fff';

    document.getElementById('result-hello').textContent = lead.prenom ? `${lead.prenom}, voici ton bilan :` : 'Voici ton bilan :';
    document.getElementById('result-zone-name').textContent = zone.name;
    document.getElementById('result-zone-tagline').textContent = zone.tagline;

    document.getElementById('sante-bars').innerHTML = santes.map((s) => `
      <div class="sante-card sante-card--${s.tier}">
        <div class="sante-card__head">
          <span class="sante-card__label">${s.label}</span>
          <span class="sante-card__pct">${s.pct} %</span>
        </div>
        ${s.question ? `<p class="sante-card__question">${s.question}</p>` : ''}
        <div class="sante-card__track"><div class="sante-card__fill" style="width:${s.pct}%"></div></div>
        ${priority && priority.key === s.key ? '<span class="sante-card__tag">À regarder en premier</span>' : ''}
        <p class="sante-card__text">${s.texts[s.tier]}</p>
      </div>
    `).join('');

    const embed = toEmbedUrl(VIDEOS[zone.key]);
    const videoBox = document.getElementById('result-video');
    if (embed) {
      videoBox.innerHTML = `<iframe src="${embed}" title="Ton message personnel" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      videoBox.hidden = false;
    } else {
      videoBox.hidden = true;
      videoBox.innerHTML = '';
    }

    document.getElementById('message-zone-text').textContent = zone.message;
    document.getElementById('message-problem-text').textContent = problemText;

    const cta = document.getElementById('cta-calendly');
    cta.href = CALENDLY_URL;
    const wa = document.getElementById('cta-whatsapp');
    if (WHATSAPP_URL) {
      wa.href = WHATSAPP_URL;
      wa.hidden = false;
    } else {
      wa.hidden = true;
    }

    showScreen('result');
  }

  updateTopbar();
})();
