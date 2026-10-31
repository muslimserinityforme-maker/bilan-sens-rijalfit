// Donne un PDF réservé aux personnes qui ont laissé leur e-mail : le lien vient de
// api/log-ressource.js, il est signé et expire après une heure.

const crypto = require('crypto');

const FICHIERS = { 'episode-1': require('./_ressources/episode-1') };

const signer = (fichier, expire) => crypto
  .createHmac('sha256', process.env.GOOGLE_SHEETS_WEBHOOK_URL || '')
  .update(`${fichier}.${expire}`)
  .digest('hex');

function creerLien(fichier) {
  const expire = Date.now() + 60 * 60 * 1000;
  return `https://ton-bilan-sante.vercel.app/api/ressource?f=${fichier}&exp=${expire}&sig=${signer(fichier, expire)}`;
}

function lienValide(fichier, expire, signature) {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) return false;
  if (!Object.prototype.hasOwnProperty.call(FICHIERS, fichier)) return false;
  if (!(Number(expire) > Date.now())) return false;
  const attendue = Buffer.from(signer(fichier, expire));
  const recue = Buffer.from(String(signature || ''));
  return attendue.length === recue.length && crypto.timingSafeEqual(attendue, recue);
}

module.exports = (req, res) => {
  const { f, exp, sig } = req.query || {};
  if (!lienValide(f, exp, sig)) {
    res.status(403).send('Ce lien a expiré. Laisse ton e-mail sur https://rijal-fit.vercel.app/ressources.html pour recevoir le PDF.');
    return;
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="rijal-fit-${f}.pdf"`);
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).send(Buffer.from(FICHIERS[f], 'base64'));
};

module.exports.creerLien = creerLien;
module.exports.FICHIERS = FICHIERS;
