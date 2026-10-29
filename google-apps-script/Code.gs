// À coller dans l'éditeur Apps Script de la Google Sheet (Extensions > Apps
// Script), puis déployer comme application web. Voir README.md pour les
// étapes complètes.
//
// Reçoit trois types d'envois depuis le site :
// 1. "Ton Bilan Santé" (event "start" puis "result") : un seul rang par
//    personne dans l'onglet « Bilans ». Statut « Démarré » dès que la personne
//    donne son email, passé à « Terminé » avec ses 4 pourcentages quand elle
//    finit le bilan (et c'est là que l'email de résultat lui est envoyé).
// 2. L'outil autonome Bilan Morpho-Anatomique (type "morpho") : onglet
//    « Bilan Morpho ».
// 3. L'ancien format du quiz (sans "event"), gardé pour que les pages encore
//    ouvertes dans un navigateur continuent de fonctionner : onglet 1.
//
// Les emails partent du compte Gmail qui a déployé ce script — pas de service
// tiers, pas de clé API.

var CALENDLY_URL = 'https://calendly.com/muslimserinityforme/programme-ton-bilan-intermediaire';

var BILAN_COLUMNS = [
  'Date', 'Prénom', 'Email', 'Âge', 'Statut',
  'Score', 'Zone', 'Physique %', 'Mentale %', 'Sociale %', 'Spirituelle %',
  'Santé à regarder en premier', 'Problème n°1', 'Date résultat',
];

var COLUMNS = [
  'Date', 'Prénom', 'Nom', 'Email', 'Téléphone',
  'Âge', 'Taille', 'Poids', 'Activité', 'Objectif', 'IMC',
  'Score', 'Zone', 'Signal contexte pro',
  'Tour de taille', 'Tour de hanches', 'Tour de cuisse', 'Tour de bras', 'Tour de poitrine',
  'Bras vs jambes', 'Buste vs jambes', 'Clavicules vs hanches', 'Cage vs hanches',
  'Valgus coude', 'Bassin', 'Abdomen', 'Fémur', 'Tibia', 'Calcanéum',
  'Stockage graisse', 'Texture ventre', 'Posture', 'Douleurs articulaires', 'Cellulite', 'Ventre soir',
  'Mobilité orteils', 'Mobilité accroupir', 'Mobilité bras',
  'Morphotype', 'Type de ventre', 'Analyse hormonale',
  'Profil psy (base)', 'Profil psy (phase)', 'Orientation vente',
];

var MORPHO_COLUMNS = [
  'Date', 'Email', 'Clavicule', 'Bras', 'Torse', 'Valgus', 'Cage thoracique',
  'Abdomen', 'Bassin', 'Dorsaux', 'Fémur', 'Tibia', 'Calcanéum',
  'Nb exercices proscrits', 'Détail',
];

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, version: 'bilan-sante-1' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  if (data.type === 'morpho') {
    appendMorphoToSheet(data);
    sendMorphoBilanEmail(data);
  } else if (data.event === 'start' || data.event === 'result') {
    saveBilan(data);
    if (data.event === 'result') sendBilanSanteEmail(data);
  } else {
    appendToSheet(data);
    sendBilanEmail(data);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getBilanSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Bilans');
  if (!sheet) {
    sheet = ss.insertSheet('Bilans');
    sheet.appendRow(BILAN_COLUMNS);
  }
  return sheet;
}

// Dernière ligne « Démarré » de cet email (colonnes C = email, E = statut).
function findOpenBilanRow(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var rows = sheet.getRange(2, 3, last - 1, 3).getValues();
  for (var i = rows.length - 1; i >= 0; i--) {
    if (String(rows[i][0]).toLowerCase() === email && rows[i][2] === 'Démarré') return i + 2;
  }
  return 0;
}

function saveBilan(data) {
  var sheet = getBilanSheet();
  var email = String(data.email || '').toLowerCase();

  if (data.event === 'start') {
    sheet.appendRow([data.date || '', data.prenom || '', data.email || '', data.age || '', 'Démarré', '', '', '', '', '', '', '', '', '']);
    return;
  }

  var finished = [
    'Terminé',
    data.score != null ? data.score : '',
    data.zone || '',
    data.physique != null ? data.physique : '',
    data.mentale != null ? data.mentale : '',
    data.sociale != null ? data.sociale : '',
    data.spirituelle != null ? data.spirituelle : '',
    data.santeBasse || '',
    data.problemeN1 || '',
    data.date || '',
  ];
  var rowNumber = findOpenBilanRow(sheet, email);
  if (rowNumber) {
    sheet.getRange(rowNumber, 5, 1, finished.length).setValues([finished]);
  } else {
    sheet.appendRow([data.date || '', data.prenom || '', data.email || '', data.age || ''].concat(finished));
  }
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Même retour que sur le site : profil, 4 santés en pourcentage avec leur
// commentaire, « À regarder en premier », message personnel, appel découverte.
function sendBilanSanteEmail(data) {
  if (!data.email) return;

  var prenom = data.prenom || '';
  var sante = data.sante || [];
  var tierColors = { haut: '#4A5240', moyen: '#C9A84C', bas: '#a13a3a' };
  var question = 'Tu as le sentiment d\'être en bonne santé ? Mais est-ce que tu l\'es vraiment ?';
  var honesty = 'Ce bilan repose sur tes réponses, donc sur ton ressenti. Il t\'aide à regarder ' +
    'plus précisément. Pour être sûr de ton état de santé, seul un bilan médical le dit.';
  var zoneColor = /^#[0-9a-fA-F]{6}$/.test(data.zoneColor || '') ? data.zoneColor : '#4A5240';

  // ── Version texte ──
  var text = (prenom ? 'Salam ' + prenom + ',\n\n' : 'Salam,\n\n') +
    'Voici ton Bilan Santé.\n\n' +
    'Ton profil : ' + (data.zone || '') + '\n' +
    (data.tagline ? data.tagline + '\n' : '') + '\n' +
    question + '\n\n';
  sante.forEach(function (s) {
    text += '— ' + s.label + ' : ' + s.pct + ' %' + (s.priority ? '  (À regarder en premier)' : '') + '\n';
    if (s.question) text += s.question + '\n';
    text += s.text + '\n\n';
  });
  text += honesty + '\n\n';
  if (data.videoUrl) text += 'Ma vidéo pour toi : ' + data.videoUrl + '\n\n';
  text += 'Ton message personnel\n' + (data.message || '') + '\n\n' + (data.problemText || '') + '\n— Matthieu, Coach Rijal Fit\n\n' +
    'On en parle ? Un appel découverte de 30 minutes, offert, sans pression :\n' + CALENDLY_URL + '\n\n' +
    'Ton corps a un droit sur toi.\n— Rijal Fit';

  // ── Version HTML (mise en page du site) ──
  var cards = sante.map(function (s) {
    var color = tierColors[s.tier] || tierColors.moyen;
    var pct = Math.max(0, Math.min(100, Number(s.pct) || 0));
    return '' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-left:5px solid ' + color + ';margin:0 0 14px 0;border-radius:6px;">' +
      '<tr><td style="padding:16px 18px;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>' +
      '<td style="font-size:18px;font-weight:bold;color:#363d2f;">' + escapeHtml(s.label) + '</td>' +
      '<td align="right" style="font-size:22px;font-weight:bold;color:#1A1A1A;">' + pct + ' %</td>' +
      '</tr></table>' +
      (s.question ? '<div style="font-size:13px;font-style:italic;color:#6b7280;margin-top:2px;">' + escapeHtml(s.question) + '</div>' : '') +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#E9E4D8;border-radius:7px;margin:10px 0;"><tr>' +
      '<td width="' + pct + '%" style="background:' + color + ';height:12px;line-height:12px;font-size:1px;border-radius:7px;">&nbsp;</td>' +
      (pct < 100 ? '<td style="font-size:1px;line-height:12px;">&nbsp;</td>' : '') +
      '</tr></table>' +
      (s.priority ? '<div style="display:inline-block;background:#f6e9e9;color:#a13a3a;font-size:11px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:12px;margin-bottom:8px;">À regarder en premier</div>' : '') +
      '<div style="font-size:15px;line-height:1.6;color:#3a3a3a;">' + escapeHtml(s.text) + '</div>' +
      '</td></tr></table>';
  }).join('');

  var html = '' +
    '<div style="background:#F5F0E8;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1A1A1A;">' +
    '<div style="max-width:560px;margin:0 auto;">' +
    '<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#6b7280;">Rijal Fit · Ton Bilan Santé</div>' +
    '<p style="font-size:16px;margin:14px 0 6px 0;">' + (prenom ? 'Salam ' + escapeHtml(prenom) + ',' : 'Salam,') + '</p>' +
    '<div style="background:' + zoneColor + ';border-radius:8px;padding:22px 20px;margin:12px 0 22px 0;text-align:center;">' +
    '<div style="font-size:13px;color:#ffffff;opacity:.85;">Ton profil</div>' +
    '<div style="font-size:26px;font-weight:bold;color:#ffffff;margin:4px 0 8px 0;">' + escapeHtml(data.zone || '') + '</div>' +
    '<div style="font-size:15px;line-height:1.5;color:#ffffff;">' + escapeHtml(data.tagline || '') + '</div>' +
    '</div>' +
    '<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#C9A84C;font-weight:bold;">Tes 4 santés</div>' +
    '<h2 style="font-size:19px;line-height:1.35;color:#363d2f;margin:6px 0 16px 0;font-style:italic;">' + escapeHtml(question) + '</h2>' +
    cards +
    '<p style="font-size:13px;font-style:italic;color:#6b7280;line-height:1.6;margin:8px 0 26px 0;">' + escapeHtml(honesty) + '</p>' +
    '<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#C9A84C;font-weight:bold;margin-bottom:10px;">Ton message personnel</div>' +
    (data.videoUrl ? '<p style="margin:0 0 12px 0;"><a href="' + escapeHtml(data.videoUrl) + '" style="color:#363d2f;font-weight:bold;">▶ Regarde ma vidéo pour toi</a></p>' : '') +
    '<div style="background:#ffffff;border-radius:8px;padding:20px;">' +
    '<p style="font-size:15px;line-height:1.7;font-style:italic;color:#2a2a2a;margin:0 0 12px 0;">' + escapeHtml(data.message || '') + '</p>' +
    (data.problemText ? String(data.problemText).split('\n\n').map(function (t) {
      return '<p style="font-size:15px;line-height:1.7;font-style:italic;color:#2a2a2a;margin:0 0 12px 0;">' + escapeHtml(t) + '</p>';
    }).join('') : '') +
    '<p style="font-size:14px;font-weight:bold;color:#4A5240;margin:0;">— Matthieu, Coach Rijal Fit</p>' +
    '</div>' +
    '<div style="background:#4A5240;border-radius:8px;padding:28px 20px;margin-top:26px;text-align:center;">' +
    '<div style="font-size:24px;font-weight:bold;color:#ffffff;margin-bottom:8px;">On en parle ?</div>' +
    '<div style="font-size:15px;line-height:1.6;color:#d1cfc9;margin-bottom:18px;">Un appel découverte de 30 minutes, offert, pour regarder ta situation précise. Sans pression.</div>' +
    '<a href="' + CALENDLY_URL + '" style="display:inline-block;background:#C9A84C;color:#1A1A1A;text-decoration:none;font-weight:bold;font-size:16px;padding:14px 26px;border-radius:6px;">Réserver mon appel découverte</a>' +
    '<div style="font-size:12px;color:#a0a89a;margin-top:12px;">Gratuit · 30 min · Sans engagement</div>' +
    '</div>' +
    '<p style="font-size:13px;color:#6b7280;text-align:center;margin:22px 0 0 0;">Ton corps a un droit sur toi.<br>— Rijal Fit</p>' +
    '</div></div>';

  MailApp.sendEmail({
    to: data.email,
    subject: 'Ton Bilan Santé — Rijal Fit',
    body: text,
    htmlBody: html,
    name: 'Rijal Fit',
  });
}

function appendMorphoToSheet(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Bilan Morpho');
  if (!sheet) {
    sheet = ss.insertSheet('Bilan Morpho');
    sheet.appendRow(MORPHO_COLUMNS);
  }

  var p = data.params || {};
  var items = data.items || [];
  var detail = items.map(function (it) {
    return '[' + it.group + '] ' + it.exercise;
  }).join(' ; ');

  sheet.appendRow([
    data.date || '',
    data.email || '',
    p.clavicule || '',
    p.bras || '',
    p.torse || '',
    p.valgus || '',
    p.cage || '',
    p.abdomen || '',
    p.bassin || '',
    p.dorsaux || '',
    p.femur || '',
    p.tibia || '',
    p.calcaneum || '',
    items.length,
    detail,
  ]);
}

function sendMorphoBilanEmail(data) {
  if (!data.email) return;

  var items = data.items || [];
  var subject = 'Ton Bilan Morpho-Anatomique — Rijal Fit';

  var order = ['Pectoraux', 'Dos', 'Épaules', 'Jambes', 'Biceps', 'Triceps'];
  var byGroup = {};
  order.forEach(function (g) { byGroup[g] = []; });
  items.forEach(function (it) {
    if (!byGroup[it.group]) byGroup[it.group] = [];
    byGroup[it.group].push(it);
  });

  var body = 'Salam,\n\nVoici ton Bilan Morpho-Anatomique — les exercices à proscrire vu ta génétique :\n\n';
  order.forEach(function (g) {
    body += '— ' + g.toUpperCase() + ' —\n';
    if (byGroup[g].length === 0) {
      body += 'Aucune contre-indication.\n\n';
    } else {
      byGroup[g].forEach(function (it) {
        body += '✕ ' + it.exercise + '\n   ' + it.reason + '\n';
      });
      body += '\n';
    }
  });

  body +=
    'Ce bilan est offert gratuitement par Rijal Fit. Tu veux un programme ' +
    'complet adapté à ta génétique ?\n' +
    'https://calendly.com/muslimserinityforme/programme-ton-bilan-intermediaire\n\n' +
    'Ton corps a un droit sur toi.\n' +
    '— Rijal Fit';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    name: 'Rijal Fit',
  });
}

function appendToSheet(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  }

  sheet.appendRow([
    data.date || '',
    data.prenom || '',
    data.nom || '',
    data.email || '',
    data.telephone || '',
    data.age || '',
    data.taille || '',
    data.poids || '',
    data.activite || '',
    data.objectif || '',
    data.imc || '',
    data.score || '',
    data.zone || '',
    data.contexteProSignal != null ? data.contexteProSignal : '',
    data.tourTaille || '',
    data.tourHanches || '',
    data.tourCuisse || '',
    data.tourBras || '',
    data.tourPoitrine || '',
    data.brasJambes || '',
    data.busteJambes || '',
    data.claviculesHanches || '',
    data.cageHanches || '',
    data.valgus || '',
    data.bassin || '',
    data.abdomen || '',
    data.femur || '',
    data.tibia || '',
    data.calcaneum || '',
    data.stockageGraisse || '',
    data.ventreTexture || '',
    data.posture || '',
    data.douleursArticulaires || '',
    data.cellulite || '',
    data.ventreSoir || '',
    data.mobiliteOrteils || '',
    data.mobiliteAccroupir || '',
    data.mobiliteBras || '',
    data.morphotype || '',
    data.typeVentre || '',
    data.hormonalTitre || '',
    data.profilBase || '',
    data.profilPhase || '',
    data.orientationVente || '',
  ]);
}

function sendBilanEmail(data) {
  if (!data.email) return;

  var prenom = data.prenom || '';
  var subject = 'Ton Bilan Santé — Rijal Fit';

  var body =
    (prenom ? 'Salam ' + prenom + ',\n\n' : 'Salam,\n\n') +
    'Voici le récapitulatif de ton Bilan Santé :\n\n' +
    '— Ta zone : ' + (data.zone || '') + ' (' + (data.score || '') + '/18)\n' +
    '— IMC estimé : ' + (data.imc || '') + '\n' +
    '— Morphotype : ' + (data.morphotype || '') + '\n' +
    '— Type de ventre le plus probable : ' + (data.typeVentre || '') + '\n' +
    '— Analyse hormonale : ' + (data.hormonalTitre || '') + '\n\n' +
    'Ce n\'est qu\'un point de départ — un bilan complet et personnalisé ' +
    'mérite d\'être approfondi ensemble. Si tu veux qu\'on en parle :\n' +
    'https://calendly.com/muslimserinityforme/programme-ton-bilan-intermediaire\n\n' +
    'Ton corps a un droit sur toi.\n' +
    '— Rijal Fit';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    name: 'Rijal Fit',
  });
}
