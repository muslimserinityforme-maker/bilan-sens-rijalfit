// "Ton Bilan Santé" journalise la personne en deux temps :
//  - event "start"  : dès qu'elle donne prénom + email (même si elle abandonne ensuite) ;
//  - event "result" : à la fin du bilan, avec ses 4 pourcentages.
// Aucune IA, aucun PDF : cette fonction ne fait que nettoyer les champs
// reçus et les transmettre au script Google Apps (Sheet + email).

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 60;
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
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

const text = (value, max) => (value == null ? '' : String(value).slice(0, max));
const pct = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(100, Math.max(0, Math.round(n))) : null;
};

async function logLeadToSheet(lead) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return;
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
  } catch (err) {
    console.error('log-lead: échec envoi Google Sheets', err);
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.status(429).json({ error: 'Trop de tentatives.' });
    return;
  }

  const data = req.body || {};
  const email = text(data.email, 120).trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Email invalide.' });
    return;
  }

  const age = Number(data.age);
  const lead = {
    event: data.event === 'result' ? 'result' : 'start',
    date: text(data.date, 40) || new Date().toISOString(),
    prenom: text(data.prenom, 60).trim(),
    email,
    age: Number.isFinite(age) && age >= 10 && age <= 110 ? Math.round(age) : null,
  };

  if (lead.event === 'result') {
    Object.assign(lead, {
      score: pct(data.score),
      zone: text(data.zone, 60),
      physique: pct(data.physique),
      mentale: pct(data.mentale),
      sociale: pct(data.sociale),
      spirituelle: pct(data.spirituelle),
      santeBasse: text(data.santeBasse, 40),
      problemeN1: text(data.problemeN1, 40),
      sante: (Array.isArray(data.sante) ? data.sante : []).slice(0, 4).map((s) => ({
        label: text(s && s.label, 40),
        pct: pct(s && s.pct),
        text: text(s && s.text, 400),
      })),
    });
  }

  console.log('BILAN_SANTE_LEAD', JSON.stringify({ event: lead.event, zone: lead.zone }));
  await logLeadToSheet(lead);

  res.status(200).json({ status: 'ok' });
};
