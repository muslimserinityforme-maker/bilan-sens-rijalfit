// Reçoit un lead du "Bilan Morpho-Anatomique" (outil autonome, 11 menus
// déroulants) et le transmet au même webhook Apps Script que le Bilan Sens
// principal (même Google Sheet, un onglet dédié + un email dédié).

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
  if (!data.email || !Array.isArray(data.items)) {
    res.status(400).json({ error: 'Champs manquants.' });
    return;
  }

  const lead = {
    type: 'morpho',
    date: data.date || new Date().toISOString(),
    email: data.email,
    params: data.params || {},
    items: data.items,
  };

  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    res.status(500).json({ error: 'Webhook non configuré.' });
    return;
  }

  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('log-morpho-lead: échec envoi', err);
    res.status(502).json({ error: 'Échec envoi.' });
  }
};
