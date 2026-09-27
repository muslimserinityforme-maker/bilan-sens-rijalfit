// À coller dans l'éditeur Apps Script d'une Google Sheet (Extensions > Apps
// Script), puis déployer comme application web. Voir README.md pour les
// étapes complètes.
//
// Fait deux choses à chaque soumission du quiz :
// 1. Ajoute une ligne à la Google Sheet (trace complète du lead + analyse).
// 2. Envoie le Bilan Sens par email au prospect (depuis le compte Gmail qui
//    a déployé ce script — pas de service tiers, pas de clé API).

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
];

var MORPHO_COLUMNS = [
  'Date', 'Email', 'Clavicule', 'Bras', 'Torse', 'Valgus', 'Cage thoracique',
  'Abdomen', 'Bassin', 'Dorsaux', 'Fémur', 'Tibia', 'Calcanéum',
  'Nb exercices proscrits', 'Détail',
];

function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  if (data.type === 'morpho') {
    appendMorphoToSheet(data);
    sendMorphoBilanEmail(data);
  } else {
    appendToSheet(data);
    sendBilanEmail(data);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
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
