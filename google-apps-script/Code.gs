// À coller dans l'éditeur Apps Script d'une Google Sheet (Extensions > Apps
// Script), puis déployer comme application web. Voir README.md pour les
// étapes complètes.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Score', 'Zone']);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.date || '',
    data.prenom || '',
    data.nom || '',
    data.email || '',
    data.telephone || '',
    data.score || '',
    data.zone || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
