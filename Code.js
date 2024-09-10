function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Metrics CRUD App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getMetrics() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var headers = data.shift();
    
    var metrics = data.map(function(row) {
      var metric = {};
      headers.forEach(function(header, index) {
        metric[header] = row[index];
      });
      return metric;
    });
    
    return JSON.stringify(metrics);
  } catch (error) {
    Logger.log("Error in getMetrics: " + error.toString());
    return JSON.stringify({ error: error.toString() });
  }
}

function updateMetric(index, updatedMetric) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowToUpdate = index + 2; // +2 because index is 0-based and we have a header row
    
    headers.forEach(function(header, colIndex) {
      sheet.getRange(rowToUpdate, colIndex + 1).setValue(updatedMetric[header]);
    });
    
    return JSON.stringify({ success: true });
  } catch (error) {
    Logger.log("Error in updateMetric: " + error.toString());
    return JSON.stringify({ error: error.toString() });
  }
}