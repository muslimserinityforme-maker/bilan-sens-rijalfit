const Anthropic = require('@anthropic-ai/sdk');
const PDFDocument = require('pdfkit');

const MODEL = 'claude-sonnet-5';

const KAKI = '#4A5240';
const KAKI_DARK = '#363d2f';
const OR = '#C9A84C';
const BEIGE = '#F5F0E8';
const NOIR = '#1A1A1A';

// Limite basique anti-abus : sans ça, un bot ou quelqu'un qui spam le
// formulaire ferait payer des appels Claude sans limite. Ce compteur vit en
// mémoire le temps qu'une instance serverless reste "chaude" — ce n'est pas
// une protection parfaite (redémarre à froid, pas partagé entre régions), mais
// c'est un premier filtre gratuit. Le vrai filet de sécurité reste le plafond
// de dépense à régler sur console.anthropic.com (voir README).
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const rateLimitStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  return req.socket && req.socket.remoteAddress || 'unknown';
}

// Envoie le lead vers une feuille Google Sheets si l'URL du webhook Apps
// Script est configurée (voir google-apps-script/Code.gs + README). Échec
// silencieux (loggé) pour ne jamais bloquer la génération du bilan à cause
// d'un souci sur la feuille.
async function logLeadToSheet(lead) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error('generate-bilan: échec envoi Google Sheets', err);
  }
}

const ACTIVITY_MULTIPLIER = {
  'sédentaire': 1.2,
  'modéré': 1.375,
  'actif': 1.55,
};

const CALORIE_ADJUSTMENT = {
  'perte de graisse': 0.85,
  'prise de muscle': 1.10,
  'recomposition': 1.0,
  'maintien': 1.0,
};

// Formules reconnues en sciences du sport : Deurenberg (estimation de la masse
// grasse à partir de l'IMC et de l'âge, sans mesures au ruban) puis Katch-McArdle
// (métabolisme de base à partir de la masse maigre). Ce sont des ESTIMATIONS —
// jamais présentées comme une mesure clinique (DEXA, impédancemétrie, plis cutanés).
function computeBodyComposition(data, imc) {
  const age = Number(data.age);
  const poids = Number(data.poids_kg);

  const bodyFatPercent = Math.min(45, Math.max(6, 1.20 * imc + 0.23 * age - 16.2));
  const masseGrasse = +(poids * bodyFatPercent / 100).toFixed(1);
  const masseMaigre = +(poids - masseGrasse).toFixed(1);

  const bmr = Math.round(370 + 21.6 * masseMaigre);
  const activityMultiplier = ACTIVITY_MULTIPLIER[data.niveau_activite] || 1.375;
  const tdee = Math.round(bmr * activityMultiplier);

  const adjustment = CALORIE_ADJUSTMENT[data.objectif_corporel] || 1.0;
  const objectifKcal = Math.round(tdee * adjustment);

  const proteines_g = Math.round(2.0 * poids);
  const lipides_g = Math.round(0.9 * poids);
  const kcalProtLip = proteines_g * 4 + lipides_g * 9;
  const glucides_g = Math.max(50, Math.round((objectifKcal - kcalProtLip) / 4));

  return {
    bodyFatPercent: +bodyFatPercent.toFixed(1),
    masseGrasse,
    masseMaigre,
    bmr,
    tdee,
    objectifKcal,
    proteines_g,
    lipides_g,
    glucides_g,
  };
}

// Le bilan est généré en 2 appels à Claude EN PARALLÈLE (Promise.all) plutôt
// qu'un seul gros appel : sur le plan Vercel Hobby, une fonction serverless a
// 60 secondes maximum. Un bilan complet en 14 sections dans un seul appel soit
// dépassait ce délai (contenu trop long à générer), soit se faisait couper en
// plein milieu si on réduisait trop la longueur demandée (JSON invalide). En
// divisant le contenu en deux moitiés indépendantes qui tournent en même temps,
// chaque appel est deux fois plus court à générer, donc le tout tient largement
// dans le délai — sans sacrifier la richesse du contenu.

const SHARED_CONTEXT = `Tu es le rédacteur du "Bilan de Sens" de Rijal Fit — la première étape de la Méthode du Réalignement, un coaching de réalignement corps-foi pour hommes musulmans.

## Qui est Rijal Fit
Rijal Fit aide les hommes musulmans (souvent d'anciens sportifs) qui ont laissé filer leur forme physique sous le poids du travail et de la famille, qui font le "yoyo" (ils se reprennent en main puis décrochent), et dont la pratique religieuse (prières notamment) souffre de leur fatigue et de leur manque d'énergie.
Mécanisme unique — La Méthode du Réalignement, en 3 temps :
1. Le Bilan de Sens — identifier la vraie racine du blocage avant tout programme (c'est ce que tu rédiges).
2. Le Programme Ancré — chaque effort relié à l'identité islamique de l'homme.
3. L'Autonomie — comprendre ses mécanismes pour se reprendre seul en cas de rechute.
Différenciateur : "Je commence par ton pourquoi avant ton programme." Les autres coachs prescrivent un programme sans comprendre. Rijal Fit commence par la vraie racine du blocage.
Vérité-cœur de la marque : le corps est une amānah (un dépôt confié par Allah) — pas un trophée. Chaque effort physique est relié à l'adoration, pas à l'ego ou l'esthétique pure.

## Ta voix (à respecter strictement)
Douce, ferme, directe et bienveillante — énergie calme, jamais de hype ni de cris. Tutoiement fraternel.
Structure : question qui ouvre → affirmation directe qui tranche. Phrases courtes. Une idée par phrase.
On valide avant de corriger ("c'est logique au vu de tes journées, mais...").
Mots signature à utiliser avec parcimonie et à bon escient : "Habibi" (jamais pour un converti sans certitude que le mot lui parle — dans le doute, ouvre sans ce mot), "amānah", "réalignement".
IMPORTANT — parle simplement : même quand tu expliques des notions physiologiques (métabolisme, hormones, morphotype), reste dans un langage accessible, comme si tu parlais à un ami autour d'un café. Jamais de jargon d'endocrinologie ou de biomécanique pointu. Une idée simple par phrase, pas de dialogue technique.
À ÉVITER ABSOLUMENT : style dur ou rabaissant ("t'as encore raté", "arrête tes excuses") ; hype et promesses de résultats chiffrés ou garantis ("transforme ton corps en 30 jours", "résultats garantis") ; jargon esthétique ou de compétition ("sèche", "prise de masse") ; vocabulaire corporate/coach business générique ; ostentation.

## Règles de conformité (impératives)
- Aucune garantie de résultat. Tu proposes un accompagnement (obligation de moyens), jamais une promesse de transformation garantie. Le résultat reste "entre les mains d'Allah" — tu peux le formuler ainsi si le ton s'y prête.
- Tu n'es PAS un médecin. Si l'utilisateur mentionne une pathologie (asthme, maladie cœliaque, diabète, douleurs chroniques, etc.), tu dois systématiquement recommander un suivi médical en parallèle et rappeler que ce document ne remplace pas un avis médical. Ne donne JAMAIS de prescription médicale, de dosage, ou de diagnostic médical précis — reste sur des recommandations générales de bien-être et d'adaptation de l'effort physique.
- Les chiffres de composition corporelle (masse grasse, masse maigre, métabolisme, calories, macros) que tu reçois sont des ESTIMATIONS calculées par formules reconnues (Deurenberg, Katch-McArdle) — jamais une mesure clinique. Présente-les toujours comme des estimations, jamais comme des faits mesurés.
- N'invente aucun détail médical, familial ou personnel qui ne t'a pas été donné explicitement. Base-toi uniquement sur les réponses fournies. Si une information manque, reste général plutôt que d'inventer.
- Jamais d'ostentation, jamais de jugement moral sur la pratique religieuse de la personne — bienveillance uniquement.

## Ta tâche
Tu reçois les réponses détaillées d'un utilisateur à un questionnaire d'intake, plus des chiffres déjà calculés (IMC, masse grasse/maigre estimées, métabolisme de base, dépense énergétique totale, objectif calorique et macros). Tu rédiges une PARTIE d'un Bilan de Sens personnalisé (l'autre partie est rédigée séparément), dans le format JSON exact demandé ci-dessous — comme si le coach Matthieu (fondateur de Rijal Fit) l'avait rédigé lui-même après avoir échangé longuement avec cette personne. Vise la précision et la personnalisation d'un vrai bilan de coach expert (pas des généralités interchangeables) : reprends ses mots, ses détails précis (localisation des douleurs, moment de la journée, verbatims) — mais explique tout SIMPLEMENT, sans dialogue technique.

IMPORTANT — reste concis : chaque section doit rester COURTE (2 à 4 phrases maximum). La personnalisation vient de la précision des détails repris, pas de la longueur de chaque section.

Réponds UNIQUEMENT avec un objet JSON valide (aucun texte avant ou après, aucun bloc markdown \`\`\`), en français, avec EXACTEMENT les clés demandées ci-dessous — aucune autre clé, aucun texte d'intro.`;

const SYSTEM_PROMPT_A = `${SHARED_CONTEXT}

{
  "ouverture": "Un paragraphe d'ouverture chaleureux et direct (3-4 phrases) qui nomme la douleur exacte de la personne à partir de ses réponses (ce qui la fait tenir, ce qui la fait décrocher, le déclencheur émotionnel si mentionné) — dans le ton Rijal Fit.",
  "analyse_morphologique": "2-4 phrases : sa posture, son morphotype (silhouette naturelle) et où se situe sa prise de poids (type de ventre) — et ce que ça signifie concrètement pour son corps et son entraînement à venir. Langage simple, pas de jargon anatomique.",
  "composition_corporelle": "2-4 phrases : ce que veulent dire son IMC et ses estimations de masse grasse/masse maigre (données déjà calculées, à reprendre telles quelles) — sans dramatiser, en rappelant que ce sont des estimations.",
  "metabolisme": "2-4 phrases : son métabolisme de base et sa dépense énergétique totale (déjà calculés), et pourquoi l'objectif calorique et les macros proposés (déjà calculés) sont cohérents avec son objectif corporel.",
  "evolution_hormonale": "2-4 phrases très simples : en fonction de son âge, comment évoluent naturellement la testostérone et l'hormone de croissance chez l'homme avec le temps, et ce que ça change concrètement pour lui (énergie, récupération, motivation) — jamais alarmiste, toujours actionnable.",
  "hypothese_globale": "2-4 phrases : une hypothèse globale reliant les causes physiques, environnementales (rythme de vie, travail, sédentarité) et nutritionnelles de sa situation, et les conséquences globales que ça a sur sa vie aujourd'hui.",
  "sommeil_energie": "2-4 phrases : analyse du sommeil (durée, endormissement) et du niveau/pattern d'énergie dans la journée, et de son impact sur la capacité à tenir dans la durée."
}`;

const SYSTEM_PROMPT_B = `${SHARED_CONTEXT}

{
  "nutrition": "2-4 phrases : l'alimentation type décrite, l'hydratation et le rapport à la nourriture sous stress — en reliant si pertinent au niveau d'énergie et au poids.",
  "dimension_spirituelle": "2-4 phrases : relie l'état physique global (corps, hormones, morphotype, fatigue) à sa pratique religieuse et à la vérité du corps comme amānah — comment ça relativise et donne du sens à ce qu'il vit physiquement.",
  "ce_que_corps_raconte": "2-3 phrases : une synthèse narrative courte et marquante de ce que le corps de cette personne raconte de son histoire des derniers mois/années.",
  "pourquoi_maintenant": "2-4 phrases : pourquoi c'est le bon moment pour se prendre en main maintenant (âge, trajectoire actuelle si rien ne change, déclencheur personnel/familial mentionné) — urgence bienveillante, jamais anxiogène.",
  "projection": "2-3 phrases : projection simple et honnête de ce qui devient possible s'il avance avec méthode (jamais un chiffre garanti — toujours formulé comme un possible, 'entre les mains d'Allah').",
  "solutions_10_points": "Exactement 10 recommandations concrètes, UNE PHRASE COURTE chacune (pas de développement), numérotées '1. ... 2. ... ' etc dans une seule chaîne de texte (retours à la ligne entre chaque), adaptées à sa situation précise (santé, sommeil, nutrition, spirituel, objectif).",
  "limites_honnetes": "2-3 phrases : les limites honnêtes de l'accompagnement — rappel que ce n'est pas un avis médical, que les chiffres de composition corporelle sont des estimations, et toute réserve nécessaire selon les pathologies citées."
}`;

function buildUserPrompt(data, imc, body) {
  const enfants = data.situation_familiale === 'marié avec enfants' ? ' (avec enfants)' : '';
  const tendancePoids = data.poids_il_y_a_2_ans
    ? `${data.poids_il_y_a_2_ans} kg il y a 2 ans → ${data.poids_kg} kg aujourd'hui`
    : 'non précisée';

  return `Voici les réponses détaillées de la personne aux questions du Bilan de Sens, et les données déjà calculées à reprendre telles quelles (ne recalcule rien, n'invente aucun autre chiffre) :

## Objectif
- Objectif principal : ${data.objectif_principal}
- Objectif corporel recherché : ${data.objectif_corporel || 'non précisé'}

## Profil
- Prénom : ${data.prenom}
- Âge : ${data.age} ans
- Taille : ${data.taille_cm} cm
- Poids : ${data.poids_kg} kg
- Évolution du poids : ${tendancePoids}
- Niveau d'activité physique quotidien : ${data.niveau_activite || 'non précisé'}
- Situation familiale : ${data.situation_familiale || 'non précisé'}${enfants}

## Données calculées (formules Deurenberg + Katch-McArdle — à présenter comme des ESTIMATIONS)
- IMC : ${imc}
- Masse grasse estimée : ${body.bodyFatPercent}% soit environ ${body.masseGrasse} kg
- Masse maigre estimée : environ ${body.masseMaigre} kg
- Métabolisme de base (Katch-McArdle) : ${body.bmr} kcal/jour
- Dépense énergétique totale estimée (TDEE) : ${body.tdee} kcal/jour
- Objectif calorique quotidien proposé : ${body.objectifKcal} kcal/jour
- Répartition macros proposée : ${body.proteines_g} g de protéines, ${body.glucides_g} g de glucides, ${body.lipides_g} g de lipides par jour

## Santé, posture & morphologie
- Pathologies / douleurs mentionnées (localisation, ancienneté) : ${data.sante}
- Posture perçue : ${data.posture || 'non précisé'}
- Morphotype (silhouette naturelle) : ${data.morphotype || 'non précisé'}
- Type de prise de poids (où ça se stocke) : ${data.type_ventre || 'non précisé'}

## Sommeil & énergie
- Qualité du sommeil perçue : ${data.qualite_sommeil || 'non précisé'}
- Heures de sommeil moyennes : ${data.heures_sommeil || 'non précisé'}
- Endormissement : ${data.endormissement || 'non précisé'}
- Niveau d'énergie quotidien auto-évalué : ${data.energie} / 10
- Moment de la journée où le manque d'énergie se fait le plus sentir : ${data.pattern_energie || 'non précisé'}

## Nutrition
- Journée alimentaire type : ${data.alimentation_type || 'non précisé'}
- Hydratation : ${data.hydratation || 'non précisé'}
- Rapport à la nourriture sous stress : ${data.rapport_nourriture || 'non précisé'}
- Intolérances / restrictions : ${data.intolerances || 'aucune mentionnée'}

## Tentatives passées
- Ce qui a tenu / n'a pas tenu : ${data.tentatives_passees}

## Métier
- Profession : ${data.profession || 'non précisé'}

## Famille
- Situation vécue en tant que mari/père : ${data.vie_famille || 'non précisé'}
- Déclencheur émotionnel identifié : ${data.declencheur || 'non précisé'}

## Pratique religieuse
- Difficultés dans les prières : ${data.difficulte_prieres || 'non précisé'}
- Gêne physique pendant la prière : ${data.gene_priere || 'non précisé'}

## Engagement
- Temps hebdomadaire disponible : ${data.temps_semaine || 'non précisé'}
- Horizon souhaité : ${data.horizon || 'non précisé'}

Rédige le Bilan de Sens de cette personne, au format JSON exact demandé dans tes instructions, avec le niveau de précision d'un vrai bilan de coach expert mais expliqué SIMPLEMENT. N'utilise que les informations ci-dessus — n'invente rien, ne recalcule aucun chiffre.`;
}

function extractJson(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }
  return trimmed;
}

function slugify(str) {
  return String(str || 'rijalfit')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'rijalfit';
}

function buildPdf(bilan, data, imc, body) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50, bufferPages: true });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageWidth = doc.page.width;

    function band(height, color) {
      doc.rect(0, 0, pageWidth, height).fill(color);
    }

    function sectionTitle(title) {
      doc.moveDown(1);
      doc.fillColor(KAKI).font('Helvetica-Bold').fontSize(14).text(title);
      const y = doc.y + 2;
      doc.moveTo(50, y).lineTo(150, y).lineWidth(2).strokeColor(OR).stroke();
      doc.moveDown(0.6);
      doc.fillColor(NOIR).font('Helvetica').fontSize(11);
    }

    function paragraph(text) {
      doc.font('Helvetica').fontSize(11).fillColor(NOIR)
        .text(text || '', { align: 'left', lineGap: 4 });
      doc.moveDown(0.7);
    }

    function keyValue(label, value) {
      doc.font('Helvetica-Bold').fontSize(10.5).fillColor(KAKI_DARK).text(label + ' ', { continued: true });
      doc.font('Helvetica').fillColor(NOIR).text(value);
    }

    // ── Header band ──
    band(110, KAKI);
    doc.fillColor(OR).font('Helvetica-Bold').fontSize(11)
      .text('RIJAL FIT', 50, 34, { characterSpacing: 2 });
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(22)
      .text(`BILAN DE SENS — ${String(data.prenom || '').toUpperCase()}`, 50, 54, { width: pageWidth - 100 });

    doc.y = 140;
    doc.fillColor(NOIR).font('Helvetica-Oblique').fontSize(11.5)
      .text(bilan.ouverture || '', { align: 'left', lineGap: 4 });
    doc.moveDown(0.5);

    sectionTitle('01 — Ton profil');
    keyValue('Prénom :', data.prenom || '');
    keyValue('Âge :', `${data.age || ''} ans`);
    keyValue('Taille :', `${data.taille_cm || ''} cm`);
    keyValue('Poids :', `${data.poids_kg || ''} kg${data.poids_il_y_a_2_ans ? ` (${data.poids_il_y_a_2_ans} kg il y a 2 ans)` : ''}`);
    keyValue('Profession :', data.profession || 'non précisé');
    keyValue('Niveau d\'activité :', data.niveau_activite || 'non précisé');
    keyValue('Situation familiale :', data.situation_familiale || 'non précisé');
    keyValue('Énergie quotidienne :', `${data.energie || ''} / 10`);
    doc.moveDown(0.5);

    sectionTitle('02 — Analyse morphologique');
    paragraph(bilan.analyse_morphologique);

    sectionTitle('03 — Composition corporelle (estimations)');
    keyValue('IMC :', `${imc}`);
    keyValue('Masse grasse estimée :', `${body.bodyFatPercent}% — environ ${body.masseGrasse} kg`);
    keyValue('Masse maigre estimée :', `environ ${body.masseMaigre} kg`);
    doc.moveDown(0.4);
    paragraph(bilan.composition_corporelle);

    sectionTitle('04 — Métabolisme & besoins (estimations)');
    keyValue('Métabolisme de base :', `${body.bmr} kcal/jour`);
    keyValue('Dépense totale estimée :', `${body.tdee} kcal/jour`);
    keyValue('Objectif calorique :', `${body.objectifKcal} kcal/jour`);
    keyValue('Macros cibles :', `${body.proteines_g} g protéines · ${body.glucides_g} g glucides · ${body.lipides_g} g lipides`);
    doc.moveDown(0.4);
    paragraph(bilan.metabolisme);

    sectionTitle('05 — Ton évolution hormonale');
    paragraph(bilan.evolution_hormonale);

    sectionTitle('06 — Hypothèse globale');
    paragraph(bilan.hypothese_globale);

    sectionTitle('07 — Sommeil & énergie');
    paragraph(bilan.sommeil_energie);

    sectionTitle('08 — Ton alimentation');
    paragraph(bilan.nutrition);

    sectionTitle('09 — Dimension spirituelle');
    paragraph(bilan.dimension_spirituelle);

    sectionTitle('10 — Ce que ton corps raconte');
    paragraph(bilan.ce_que_corps_raconte);

    sectionTitle('11 — Pourquoi se prendre en main maintenant');
    paragraph(bilan.pourquoi_maintenant);

    sectionTitle('12 — Projection si tu avances');
    paragraph(bilan.projection);

    sectionTitle('13 — 10 solutions concrètes');
    paragraph(bilan.solutions_10_points);

    sectionTitle('14 — Les limites honnêtes de ce bilan');
    paragraph(bilan.limites_honnetes);
    doc.font('Helvetica-Oblique').fontSize(9.5).fillColor('#5a5a5a')
      .text('Ce document est un outil d\'accompagnement sportif et de bien-être. Les chiffres de composition corporelle sont des estimations par formules reconnues, pas une mesure clinique. Ce document ne se substitue en aucun cas à un avis médical.', { lineGap: 3 });

    // ── Closing page ──
    doc.addPage();
    band(doc.page.height, BEIGE);
    doc.y = 100;
    doc.fillColor(KAKI).font('Helvetica-Bold').fontSize(20)
      .text('« Ton corps a un droit sur toi. »', 50, doc.y, { align: 'center', width: pageWidth - 100 });
    doc.moveDown(0.3);
    doc.fillColor(KAKI_DARK).font('Helvetica').fontSize(11)
      .text('— Le Prophète Muhammad (paix et salut sur lui)', { align: 'center', width: pageWidth - 100 });

    doc.moveDown(3);
    doc.fillColor(NOIR).font('Helvetica-Bold').fontSize(14)
      .text('Fais de ton corps un empire et sois un muslim en forme.', 50, doc.y, { align: 'center', width: pageWidth - 100 });

    doc.moveDown(3);
    doc.fillColor(NOIR).font('Helvetica').fontSize(11)
      .text('Si tu veux qu\'on en parle, réserve un appel découverte — gratuit, 30 minutes, sans engagement.', 50, doc.y, { align: 'center', width: pageWidth - 100 });
    doc.moveDown(0.5);
    doc.fillColor(KAKI).font('Helvetica-Bold').fontSize(11)
      .text('calendly.com/muslimserinityforme/programme-ton-bilan-intermediaire', { align: 'center', width: pageWidth - 100, link: 'https://calendly.com/muslimserinityforme/programme-ton-bilan-intermediaire' });

    doc.end();
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: "Le moteur de génération n'est pas encore configuré. Réessaie plus tard." });
    return;
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.status(429).json({ error: "Trop de tentatives depuis cette connexion. Réessaie un peu plus tard, ou contacte-nous directement si c'est urgent." });
    return;
  }

  const data = req.body || {};

  if (!data.consentement) {
    res.status(400).json({ error: 'Le consentement est requis pour générer ton bilan.' });
    return;
  }

  const required = [
    'prenom', 'nom', 'email', 'telephone',
    'objectif_principal', 'age', 'taille_cm', 'poids_kg', 'sante', 'energie',
    'tentatives_passees', 'autonomie_decision',
  ];
  for (const field of required) {
    if (!data[field]) {
      res.status(400).json({ error: `Champ manquant : ${field}` });
      return;
    }
  }

  // Lead capturé pour suivi commercial — jamais inclus dans le bilan envoyé à la
  // personne. Loggé côté Vercel ET envoyé vers Google Sheets si configuré
  // (voir README) pour que tu puisses vraiment le retrouver et le relancer.
  const lead = {
    date: new Date().toISOString(),
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    telephone: data.telephone,
    profession: data.profession || null,
    autonomie_decision: data.autonomie_decision,
    temps_semaine: data.temps_semaine || null,
    horizon: data.horizon || null,
    objectif_principal: data.objectif_principal || null,
  };
  console.log('BILAN_SENS_LEAD', JSON.stringify(lead));
  await logLeadToSheet(lead);

  const taille_m = Number(data.taille_cm) / 100;
  const imc = taille_m > 0 ? +(Number(data.poids_kg) / (taille_m * taille_m)).toFixed(1) : null;
  const body = computeBodyComposition(data, imc);

  let bilan;
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const userPrompt = buildUserPrompt(data, imc, body);

    const [messageA, messageB] = await Promise.all([
      client.messages.create({
        model: MODEL,
        max_tokens: 1800,
        system: SYSTEM_PROMPT_A,
        messages: [{ role: 'user', content: userPrompt }],
      }),
      client.messages.create({
        model: MODEL,
        max_tokens: 1800,
        system: SYSTEM_PROMPT_B,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    ]);

    const textOf = (message) => message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    const textA = textOf(messageA);
    const textB = textOf(messageB);

    let bilanA;
    let bilanB;
    try {
      bilanA = JSON.parse(extractJson(textA));
    } catch (parseErr) {
      console.error('generate-bilan: JSON invalide côté A. stop_reason=', messageA.stop_reason, 'RAW_A=', textA.slice(0, 2000));
      throw parseErr;
    }
    try {
      bilanB = JSON.parse(extractJson(textB));
    } catch (parseErr) {
      console.error('generate-bilan: JSON invalide côté B. stop_reason=', messageB.stop_reason, 'RAW_B=', textB.slice(0, 2000));
      throw parseErr;
    }
    bilan = Object.assign({}, bilanA, bilanB);
  } catch (err) {
    console.error('generate-bilan: échec de la génération', err);
    res.status(502).json({ error: 'La génération du bilan a échoué. Réessaie dans quelques instants.' });
    return;
  }

  try {
    const pdfBuffer = await buildPdf(bilan, data, imc, body);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Bilan-de-Sens-${slugify(data.prenom)}.pdf"`);
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('generate-bilan: échec de la génération du PDF', err);
    res.status(500).json({ error: 'Erreur lors de la génération du PDF.' });
  }
};
