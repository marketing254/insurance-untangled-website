/**
 * RIDA Academy — Combined Apps Script
 * File: data/combined.gs
 *
 * This single file replaces BOTH proxy.gs AND form-handler.gs.
 * Deploy this one file — you do NOT need proxy.gs or form-handler.gs separately.
 *
 * ─── ONE-TIME SETUP ───────────────────────────────────────────────────────────
 * 1. Go to https://script.google.com → New Project (use script.google.com, NOT
 *    the Workspace shortcut — the /a/macros/domain/ URL won't send CORS headers)
 * 2. Delete the default code and paste this ENTIRE file
 * 3. Click Deploy → New Deployment → Web app
 *    - Execute as:   Me
 *    - Who has access: Anyone
 * 4. Click Deploy → Authorize (sign in when prompted) → Copy the Web App URL
 *    ✅ URL looks like: https://script.google.com/macros/s/AKfy.../exec
 * 5. Paste that URL in TWO places:
 *    a) data/sheets.js  → RIDA_APPS_SCRIPT_PROXY  (for transcript/doc proxying)
 *    b) data/forms.js   → RIDA_FORM_ENDPOINT       (for form submissions)
 *
 * ─── WHAT THIS HANDLES ────────────────────────────────────────────────────────
 * doGet:
 *   ?id=DRIVE_FILE_ID          → proxy: reads any Drive file (VTT, txt, etc.)
 *   ?docUrl=ENCODED_EXPORT_URL → proxy: fetches a Google Doc export URL server-side
 *   ?form_type=XXX&field=val   → forms: saves a GET-based form submission to Sheets
 *
 * doPost:
 *   body (JSON or form params)  → forms: saves a POST-based form submission to Sheets
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Active notification recipient
var NOTIFY_EMAIL = 'rushdhaakbar82@gmail.com';

// Additional recipients — uncomment any to enable (separate with commas in one string, or send individually):
// var NOTIFY_EMAIL = 'rushdhaakbar82@gmail.com,rushdha@ekwa.com,lester@ekwa.com,chamika.p@ekwa.com,amani@ekwa.com,shezaan@ekwa.com';
//
// Or send to a specific extra address alongside the main one:
// var CC_EMAILS = 'rushdha@ekwa.com,lester@ekwa.com,chamika.p@ekwa.com,amani@ekwa.com,shezaan@ekwa.com';

var SHEET_ID     = '1FOeB6lyOCKzj4u9caLPxModWYrpCILE0h4-7O_0yR4s';

// Map form_type → sheet tab name (tabs are auto-created if they don't exist)
var SHEET_MAP = {
  waitlist:       'waitlist_signups',
  newsletter:     'newsletter_signups',
  webinar_access: 'webinar_access',
  partner:        'partner_inquiries',
  growth_engine:  'growth_engine_leads',
  articles_access: 'articles_access',
  contact:        'contact_submissions'
};

// Allowed origins for CORS headers (add your production domain)
var ALLOWED_ORIGINS = [
  'https://www.ridacademy.com',
  'https://ridacademy.com',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://localhost:3000'
];

// ─── ROUTING ─────────────────────────────────────────────────────────────────

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};

  // ── Proxy path: ?id= or ?docUrl= ──────────────────────────────────────────
  if (params.id || params.docUrl) {
    return handleProxy(params);
  }

  // ── Form path: ?form_type= ─────────────────────────────────────────────────
  if (params.form_type) {
    return handleForm(params);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'RIDA Combined Script' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var params = {};
  try {
    // Try JSON body first
    if (e.postData && e.postData.contents) {
      var parsed = JSON.parse(e.postData.contents);
      Object.keys(parsed).forEach(function(k) { params[k] = parsed[k]; });
    }
  } catch (_) {}
  // Merge URL parameters (override with body if both present)
  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(function(k) { params[k] = e.parameter[k]; });
  }
  return handleForm(params);
}

// ─── PROXY HANDLER ───────────────────────────────────────────────────────────

function handleProxy(params) {
  var id     = params.id     || '';
  var docUrl = params.docUrl || '';

  try {
    var content = '';

    if (id) {
      var file = DriveApp.getFileById(id);
      var blob = file.getBlob();
      if (blob.getContentType() === 'application/pdf' ||
          blob.getContentType().indexOf('vnd.google-apps') !== -1) {
        content = 'ERROR: This is a Google-native file. Use ?docUrl= with the export URL instead.';
      } else {
        content = blob.getDataAsString('UTF-8');
      }

    } else if (docUrl) {
      var decoded  = decodeURIComponent(docUrl);
      var response = UrlFetchApp.fetch(decoded, { muteHttpExceptions: true, followRedirects: true });
      var code     = response.getResponseCode();
      content = (code >= 400)
        ? 'ERROR: Export URL returned HTTP ' + code
        : response.getContentText('UTF-8');
    }

    return ContentService
      .createTextOutput(content)
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput('ERROR: ' + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// ─── FORM HANDLER ────────────────────────────────────────────────────────────

function handleForm(params) {
  var sheetError = null;
  var emailError = null;

  // ── 1. Write to sheet (primary goal — must not be blocked by email failure) ──
  try {
    var formType = params.form_type || 'general';
    var tabName  = SHEET_MAP[formType] || 'general_submissions';

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }

    var timestamp = new Date();
    var keys = Object.keys(params).filter(function(k) { return k !== 'form_type'; });

    // Write header row on very first submission to this tab
    if (sheet.getLastRow() === 0) {
      var headers = ['Timestamp'].concat(keys);
      sheet.appendRow(headers);

      // Style header row: Book Antiqua font, black background, yellow text
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontFamily('Book Antiqua');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      headerRange.setBackground('#000000');
      headerRange.setFontColor('#E2D603');
      headerRange.setHorizontalAlignment('center');

      // Apply Book Antiqua to the whole sheet (data rows will inherit it)
      sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).setFontFamily('Book Antiqua');

      sheet.setFrozenRows(1);
    }

    // Align columns to existing headers
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var dataRow   = headerRow.map(function(h) {
      if (h === 'Timestamp') return timestamp;
      return params[h] !== undefined ? params[h] : '';
    });
    sheet.appendRow(dataRow);

  } catch (err) {
    sheetError = err.message;
  }

  // ── 2. Email notification (best-effort — never blocks sheet write) ──────────
  if (!sheetError) {
    try {
      var fType    = params.form_type || 'general';
      var fKeys    = Object.keys(params).filter(function(k) { return k !== 'form_type'; });
      var subject  = '[RIDA] New ' + fType.replace(/_/g, ' ') + ' submission';
      var body     = 'New form submission received.\n\nType: ' + fType
                   + '\nTime: ' + new Date().toLocaleString()
                   + '\n\n' + fKeys.map(function(k) { return k + ': ' + params[k]; }).join('\n');
      MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body });
    } catch (emailErr) {
      emailError = emailErr.message;  // logged but does not fail the response
    }
  }

  // ── 3. Return result ─────────────────────────────────────────────────────────
  if (sheetError) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: sheetError }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, emailError: emailError || null }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── TEST FUNCTION — run this manually in the Apps Script editor ─────────────
// Click Run → testFormSubmission → check your spreadsheet for a new row
function testFormSubmission() {
  var result = handleForm({
    form_type:  'partner',
    first_name: 'Test',
    last_name:  'User',
    email:      'test@example.com',
    phone:      '555-0000',
    company:    'Test Dental',
    role:       'Owner',
    type:       'Speaking',
    topic:      'Test submission from Apps Script editor'
  });
  Logger.log(result.getContent());
}

// ─── RESTYLE EXISTING TABS — run once to apply header styling to all tabs ────
// Run this if tabs were created before the styling was added.
function reStyleAllSheetHeaders() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  Object.values(SHEET_MAP).forEach(function(tabName) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet || sheet.getLastRow() === 0) return;
    var numCols = sheet.getLastColumn();
    if (numCols === 0) return;

    // Header row styling
    var headerRange = sheet.getRange(1, 1, 1, numCols);
    headerRange.setFontFamily('Book Antiqua');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    headerRange.setBackground('#000000');
    headerRange.setFontColor('#E2D603');
    headerRange.setHorizontalAlignment('center');

    // Book Antiqua for all data rows
    var dataRows = sheet.getLastRow() - 1;
    if (dataRows > 0) {
      sheet.getRange(2, 1, dataRows, numCols).setFontFamily('Book Antiqua');
    }

    sheet.setFrozenRows(1);
    Logger.log('Styled: ' + tabName);
  });
}
