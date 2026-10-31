// Page « Ressources gratuites » de rijal-fit.vercel.app : enregistre le prénom et
// l'e-mail d'une personne qui demande un PDF, dans l'onglet « Bilans » de la Sheet.
// Envoyé comme un event "start" (statut « Démarré ») : le script Google n'a pas à
// être redéployé. La colonne « Âge » indique la ressource et l'accord pour les conseils.

const ORIGINE = 'https://rijal-fit.vercel.app';

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ORIGINE);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée.' });
    return;
  }
  if (isRateLimited(getClientIp(req))) {
    res.status(429).json({ error: 'Trop de tentatives.' });
    return;
  }

  const data = req.body || {};
  const email = text(data.email, 120).trim();
  const prenom = text(data.prenom, 60).trim();
  if (!prenom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Prénom ou e-mail invalide.' });
    return;
  }

  const ressource = text(data.ressource, 40).replace(/^pdf\//, '').replace(/\.pdf$/, '');
  const conseils = data.conseils === true ? 'conseils : oui' : 'conseils : non';

  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    res.status(500).json({ error: 'Enregistrement indisponible.' });
    return;
  }

  try {
    const reponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'start',
        date: new Date().toISOString(),
        prenom,
        email,
        age: `PDF ${ressource} · ${conseils}`,
      }),
    });
    if (!reponse.ok) throw new Error(`Google a répondu ${reponse.status}`);
  } catch (err) {
    console.error('log-ressource: échec envoi Google Sheets', err);
    res.status(502).json({ error: 'Enregistrement impossible.' });
    return;
  }

  res.status(200).json({ status: 'ok' });
};
