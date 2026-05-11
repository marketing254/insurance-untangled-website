/**
 * RIDA Academy — Form Submissions Handler
 * Deploy as: Extensions → Apps Script → Deploy → Web App
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Copy the deployed Web App URL into RIDA_FORM_ENDPOINT in forms.js
 *
 * Sheet tabs this script writes to (create them manually or they auto-create):
 *   waitlist_signups      — summit waitlist (email)
 *   newsletter_signups    — event newsletter (email)
 *   webinar_access        — webinar gate form (name, email, webinar)
 *   partner_inquiries     — partner page form
 *   growth_engine_leads   — marketing consultation form
 *   general_submissions   — catch-all fallback
 */

var NOTIFY_EMAIL = 'rushdhaakbar82@gmail.com';
var SHEET_ID     = '1FOeB6lyOCKzj4u9caLPxModWYrpCILE0h4-7O_0yR4s';

// Map form_type → sheet tab name
var SHEET_MAP = {
  waitlist:       'waitlist_signups',
  newsletter:     'newsletter_signups',
  webinar_access: 'webinar_access',
  partner:        'partner_inquiries',
  growth_engine:  'growth_engine_leads'
};

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    var params = e.parameter || {};
    var formType = params.form_type || 'general';
    var tabName  = SHEET_MAP[formType] || 'general_submissions';

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(tabName);

    // Auto-create tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }

    // Build the data row — collect all params except form_type
    var timestamp = new Date();
    var keys = Object.keys(params).filter(function(k) { return k !== 'form_type'; });

    // Write header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = ['Timestamp'].concat(keys);
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Build data row aligned to existing headers
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var dataRow = headerRow.map(function(h) {
      if (h === 'Timestamp') return timestamp;
      return params[h] || '';
    });
    sheet.appendRow(dataRow);

    // Send email notification
    var subject = '🔔 New ' + formType.replace(/_/g,' ') + ' — RID Academy';
    var body    = 'New form submission received.\n\n'
      + 'Type: ' + formType + '\n'
      + 'Time: ' + timestamp.toLocaleString() + '\n\n'
      + keys.map(function(k) { return k + ': ' + params[k]; }).join('\n');

    MailApp.sendEmail({
      to:      NOTIFY_EMAIL,
      subject: subject,
      body:    body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
