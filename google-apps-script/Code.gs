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

function sendBilanSanteEmail(data) {
  if (!data.email) return;

  var prenom = data.prenom || '';
  var body = (prenom ? 'Salam ' + prenom + ',\n\n' : 'Salam,\n\n') +
    'Voici ton Bilan Santé.\n\n' +
    'Ton profil : ' + (data.zone || '') + '\n\n';

  (data.sante || []).forEach(function (s) {
    body += '— ' + s.label + ' : ' + s.pct + ' %\n' + s.text + '\n\n';
  });

  body +=
    'Ce bilan repose sur tes réponses, donc sur ton ressenti. Il t\'aide à regarder ' +
    'plus précisément. Pour être sûr de ton état de santé, seul un bilan médical le dit.\n\n' +
    'Si tu veux qu\'on en parle, je t\'offre un appel découverte de 30 minutes :\n' +
    CALENDLY_URL + '\n\n' +
    'Ton corps a un droit sur toi.\n' +
    '— Matthieu, Rijal Fit';

  MailApp.sendEmail({
    to: data.email,
    subject: 'Ton Bilan Santé — Rijal Fit',
    body: body,
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
  var subject = 'Ton Bilan Sens — Rijal Fit';

  var body =
    (prenom ? 'Salam ' + prenom + ',\n\n' : 'Salam,\n\n') +
    'Voici le récapitulatif de ton Bilan Sens :\n\n' +
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
