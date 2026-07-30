// Le diagnostic est maintenant un quiz scoré côté client (pas d'appel Claude,
// pas de PDF) — cette fonction ne sert qu'à journaliser le lead (nom/prénom/
// email/téléphone/score/zone) une fois le quiz terminé, avant d'afficher le
// résultat. Beaucoup plus simple et fiable que l'ancienne génération IA.

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
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
  if (!data.prenom || !data.nom || !data.email || !data.telephone) {
    res.status(400).json({ error: 'Champs manquants.' });
    return;
  }

  const lead = {
    date: data.date || new Date().toISOString(),
    prenom: data.prenom,
    nom: data.nom,
    email: data.email,
    telephone: data.telephone,
    score: data.score,
    zone: data.zone,
  };

  console.log('DIAGNOSTIC_LEAD', JSON.stringify(lead));
  await logLeadToSheet(lead);

  res.status(200).json({ status: 'ok' });
};
