/**
 * Insurance Untangled — Combined Apps Script
 * File: data/iu-form-handler.gs
 *
 * Handles ALL form submissions and transcript/doc proxying for insuranceuntangled.com.
 *
 * ─── DEPLOYMENT ───────────────────────────────────────────────────────────────
 * 1. script.google.com → paste this entire file
 * 2. Deploy → New Deployment → Web app
 *    - Execute as:   Me
 *    - Who has access: Anyone
 * 3. Copy the /exec URL → paste it everywhere you see AKfycbx... in components/
 *
 * ─── WHAT IT HANDLES ──────────────────────────────────────────────────────────
 * doGet:
 *   ?callback=X&url=Y          → JSONP transcript proxy (PodcastEpisodeClient)
 *   ?id=DRIVE_FILE_ID          → proxy: reads Drive file (transcript VTT/txt)
 *   ?docUrl=ENCODED_EXPORT_URL → proxy: fetches Google Doc export server-side
 *   ?form_type=XXX&...         → form: saves submission to appropriate sheet tab
 *
 * doPost:
 *   JSON or form-encoded body   → form: saves POST-based submission
 * ──────────────────────────────────────────────────────────────────────────────
 */

// ─── CONFIG ──────────────────────────────────────────────────────────────────

var NOTIFY_EMAIL = 'support@insuranceuntangled.com';

// The same Google Sheet your Next.js app reads podcast/webinar/blog data from.
var SHEET_ID = '167uuWRXLROf2MC91By9ofA-G6RTvePN0yEwItJdmQAU';

// ─── FORM TYPE → SHEET TAB MAPPING ───────────────────────────────────────────
// Every known form_type gets its OWN dedicated tab.
// Tabs are auto-created on first submission if they do not already exist.
//
// form_type        source component / page          tab name
// ─────────────────────────────────────────────────────────────────────────────
//  podcast_gate    PodcastGrid.tsx                  Podcast Access
//  webinar_access  EventsList.tsx WebinarGateForm   Webinar Access
//  newsletter      NewsletterForm.tsx (homepage)    Newsletter
//  newsletter_blog NewsletterForm.tsx (blog posts)  Newsletter Blog
//  email_popup     EmailPopup.tsx                   Email Popup
//  contact         ContactForm.tsx (/contact)       Contact
//  guest           GuestForm.tsx (/be-a-guest)      Guest Applications

var SHEET_MAP = {
  podcast_gate:      'Podcast Access',
  webinar_access:    'Webinar Access',
  newsletter:        'Newsletter',
  newsletter_blog:   'Newsletter Blog',
  email_popup:       'Email Popup',
  contact:           'Contact',
  guest:             'Guest Applications',
  data_deletion:     'Data Deletion Requests'  // GDPR/CCPA right-to-be-forgotten requests
  // Any unknown form_type creates a tab named after itself — no silent discard.
};

// ─── BACKUP CONFIG ───────────────────────────────────────────────────────────
// Folder ID in Google Drive where daily Sheet copies will be saved.
// Create a folder, open it, and copy the ID from the URL:
//   https://drive.google.com/drive/folders/<FOLDER_ID_HERE>
// Leave blank to disable automated backups.
var BACKUP_FOLDER_ID = '';

// Keep this many most-recent backups; older ones are auto-deleted.
var BACKUP_RETENTION_COUNT = 30;

// Honeypot field — bots fill this; we silently drop the submission
var HONEYPOT_FIELD = 'hp_field';

// ─── ROUTING ─────────────────────────────────────────────────────────────────

function doGet(e) {
  var params = (e && e.parameter) ? e.parameter : {};

  // JSONP transcript proxy (PodcastEpisodeClient fetchProxyText)
  if (params.callback) {
    return handleTranscriptProxy(params);
  }

  // File / doc proxy
  if (params.id || params.docUrl) {
    return handleProxy(params);
  }

  // Form submission
  if (params.form_type) {
    return handleForm(params);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Insurance Untangled Script' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var params = {};
  try {
    if (e.postData && e.postData.contents) {
      var parsed = JSON.parse(e.postData.contents);
      Object.keys(parsed).forEach(function(k) { params[k] = parsed[k]; });
    }
  } catch (_) {}
  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(function(k) { params[k] = e.parameter[k]; });
  }
  return handleForm(params);
}

// ─── TRANSCRIPT / DOC PROXY ──────────────────────────────────────────────────

function handleProxy(params) {
  var id     = params.id     || '';
  var docUrl = params.docUrl || '';

  try {
    var content = '';
    if (id) {
      var file = DriveApp.getFileById(id);
      var blob = file.getBlob();
      var ct   = blob.getContentType();
      if (ct === 'application/pdf' || ct.indexOf('vnd.google-apps') !== -1) {
        content = 'ERROR: Google-native file — use ?docUrl= with the export URL.';
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

// JSONP proxy — called by PodcastEpisodeClient with ?callback=X&docUrl=Y
function handleTranscriptProxy(params) {
  var callback = params.callback || 'cb';
  var docUrl   = params.docUrl   || '';
  var id       = params.id       || '';
  var url      = params.url      || '';

  try {
    var text = '';
    if (docUrl) {
      var decoded  = decodeURIComponent(docUrl);
      var response = UrlFetchApp.fetch(decoded, { muteHttpExceptions: true, followRedirects: true });
      if (response.getResponseCode() < 400) text = response.getContentText('UTF-8');
    } else if (id) {
      var file = DriveApp.getFileById(id);
      text = file.getBlob().getDataAsString('UTF-8');
    } else if (url) {
      var r = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
      if (r.getResponseCode() < 400) text = r.getContentText('UTF-8');
    }

    var payload = text
      ? JSON.stringify({ success: true,  text: text })
      : JSON.stringify({ success: false, error: 'No content returned' });

    return ContentService
      .createTextOutput(callback + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch (err) {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify({ success: false, error: err.message }) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

// ─── FORM HANDLER ────────────────────────────────────────────────────────────

function handleForm(params) {

  // ── Honeypot — silently discard bot submissions ──────────────────────────────
  if (params[HONEYPOT_FIELD] && params[HONEYPOT_FIELD].trim() !== '') {
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheetError = null;
  var emailError = null;

  // ── 1. Write to sheet ────────────────────────────────────────────────────────
  try {
    var formType = params.form_type || 'unknown';
    // Use the dedicated tab from SHEET_MAP; if not mapped, use the form_type itself as the tab name
    var tabName  = SHEET_MAP[formType] || formType;

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }

    var timestamp = new Date();
    var keys = Object.keys(params).filter(function(k) {
      return k !== 'form_type' && k !== HONEYPOT_FIELD;
    });

    // Auto-create header row on first submission
    if (sheet.getLastRow() === 0) {
      var headers = ['Timestamp'].concat(keys);
      sheet.appendRow(headers);

      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontFamily('Book Antiqua');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      headerRange.setBackground('#1b2a4a');  // IU navy
      headerRange.setFontColor('#14C6C0');   // IU teal
      headerRange.setHorizontalAlignment('center');
      sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).setFontFamily('Book Antiqua');
      sheet.setFrozenRows(1);
    }

    // Align data to existing header order
    var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var dataRow   = headerRow.map(function(h) {
      if (h === 'Timestamp') return timestamp;
      return (params[h] !== undefined) ? params[h] : '';
    });
    sheet.appendRow(dataRow);

  } catch (err) {
    sheetError = err.message;
  }

  // ── 2. Email notification (best-effort) ─────────────────────────────────────
  if (!sheetError) {
    try {
      var fType   = params.form_type || 'general';
      var fKeys   = Object.keys(params).filter(function(k) {
        return k !== 'form_type' && k !== HONEYPOT_FIELD;
      });
      var subject = '[Insurance Untangled] New ' + fType.replace(/_/g, ' ') + ' submission';
      var body    = 'New submission on insuranceuntangled.com\n\n'
                  + 'Type: ' + fType + '\nTime: ' + new Date().toLocaleString() + '\n\n'
                  + fKeys.map(function(k) { return k + ': ' + params[k]; }).join('\n');
      MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body });
    } catch (emailErr) {
      emailError = emailErr.message;
    }
  }

  // ── 3. Response ──────────────────────────────────────────────────────────────
  if (sheetError) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: sheetError }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, emailError: emailError || null }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── TEST FUNCTIONS — run manually in Apps Script editor ─────────────────────

function testPodcastGate() {
  Logger.log(handleForm({ form_type: 'podcast_gate', name: 'Dr. Jane Smith', email: 'jane@dental.com' }).getContent());
}

function testWebinarAccess() {
  Logger.log(handleForm({ form_type: 'webinar_access', name: 'Dr. John Doe', email: 'john@dental.com', webinar_title: 'Scale With Strategy' }).getContent());
}

function testContact() {
  Logger.log(handleForm({ form_type: 'contact', name: 'Test User', email: 'test@example.com', message: 'Hello from test' }).getContent());
}

function testNewsletter() {
  Logger.log(handleForm({ form_type: 'newsletter', name: 'Test', email: 'test@example.com' }).getContent());
}

// ─── RESTYLE ALL TABS — run once after deployment ────────────────────────────

function reStyleAllSheetHeaders() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var allTabs = [];
  Object.keys(SHEET_MAP).forEach(function(k) {
    var t = SHEET_MAP[k];
    if (allTabs.indexOf(t) === -1) allTabs.push(t);
  });
  allTabs.forEach(function(tabName) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet || sheet.getLastRow() === 0) return;
    var numCols = sheet.getLastColumn();
    if (numCols === 0) return;
    var headerRange = sheet.getRange(1, 1, 1, numCols);
    headerRange.setFontFamily('Book Antiqua');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    headerRange.setBackground('#1b2a4a');
    headerRange.setFontColor('#14C6C0');
    headerRange.setHorizontalAlignment('center');
    var dataRows = sheet.getLastRow() - 1;
    if (dataRows > 0) {
      sheet.getRange(2, 1, dataRows, numCols).setFontFamily('Book Antiqua');
    }
    sheet.setFrozenRows(1);
    Logger.log('Styled: ' + tabName);
  });
}

// ─── DAILY BACKUP — schedule this via Apps Script triggers ───────────────────
// Setup:
// 1. Set BACKUP_FOLDER_ID above to a Drive folder ID
// 2. In the Apps Script editor: Triggers (clock icon) → Add Trigger →
//    function: backupSpreadsheet
//    deployment: Head
//    event source: Time-driven
//    type: Day timer
//    time: 3am–4am (or your preferred off-peak hour)
//
// The script will:
//   - Copy the entire spreadsheet to the backup folder with a date-stamped name
//   - Auto-delete backups older than BACKUP_RETENTION_COUNT (default 30 days)
//   - Email NOTIFY_EMAIL if the backup fails

function backupSpreadsheet() {
  if (!BACKUP_FOLDER_ID) {
    Logger.log('BACKUP_FOLDER_ID not set — skipping backup');
    return;
  }
  try {
    var source = DriveApp.getFileById(SHEET_ID);
    var folder = DriveApp.getFolderById(BACKUP_FOLDER_ID);
    var today  = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd');
    var name   = 'IU-Backup-' + today;
    source.makeCopy(name, folder);
    Logger.log('Backup created: ' + name);

    // Prune old backups
    pruneOldBackups();
  } catch (err) {
    Logger.log('Backup failed: ' + err.message);
    try {
      MailApp.sendEmail({
        to:      NOTIFY_EMAIL,
        subject: '[Insurance Untangled] Sheet backup FAILED',
        body:    'The daily sheet backup encountered an error:\n\n' + err.message
                + '\n\nTime: ' + new Date().toLocaleString()
                + '\n\nCheck the Apps Script logs and verify BACKUP_FOLDER_ID is correct.'
      });
    } catch (_) {}
  }
}

function pruneOldBackups() {
  if (!BACKUP_FOLDER_ID) return;
  try {
    var folder  = DriveApp.getFolderById(BACKUP_FOLDER_ID);
    var files   = folder.getFiles();
    var backups = [];
    while (files.hasNext()) {
      var f = files.next();
      if (f.getName().indexOf('IU-Backup-') === 0) {
        backups.push({ file: f, date: f.getDateCreated() });
      }
    }
    backups.sort(function(a, b) { return b.date - a.date; });
    var toDelete = backups.slice(BACKUP_RETENTION_COUNT);
    toDelete.forEach(function(b) {
      b.file.setTrashed(true);
      Logger.log('Pruned: ' + b.file.getName());
    });
  } catch (err) {
    Logger.log('Prune failed: ' + err.message);
  }
}

// Run manually once to verify everything works before relying on the schedule
function testBackup() {
  backupSpreadsheet();
}

// ─── DATA DELETION HANDLER — for GDPR/CCPA right-to-be-forgotten ─────────────
// Run this manually when a deletion request comes in. It searches every form
// tab for the given email and removes matching rows, then logs the action.
//
// Usage from Apps Script editor:
//   1. Open the "Data Deletion Requests" tab
//   2. Find the email to delete
//   3. Run: deleteUserData('user@email.com')

function deleteUserData(targetEmail) {
  if (!targetEmail || !/@/.test(targetEmail)) {
    Logger.log('Provide a valid email');
    return;
  }
  var normalized = targetEmail.toLowerCase().trim();
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var deletedCount = 0;
  var affectedTabs = [];

  Object.keys(SHEET_MAP).forEach(function(formType) {
    var tabName = SHEET_MAP[formType];
    var sheet   = ss.getSheetByName(tabName);
    if (!sheet || sheet.getLastRow() < 2) return;

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var emailCol = headers.findIndex(function(h) { return String(h).toLowerCase() === 'email'; });
    if (emailCol === -1) return;

    var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
    var rowsToDelete = [];
    data.forEach(function(row, i) {
      if (String(row[emailCol] || '').toLowerCase().trim() === normalized) {
        rowsToDelete.push(i + 2); // +2: header row + 0-index
      }
    });
    // Delete from bottom up so indices stay valid
    rowsToDelete.reverse().forEach(function(rowNum) {
      sheet.deleteRow(rowNum);
      deletedCount++;
    });
    if (rowsToDelete.length > 0) affectedTabs.push(tabName + ' (' + rowsToDelete.length + ')');
  });

  Logger.log('Deleted ' + deletedCount + ' rows for ' + targetEmail + ' across: ' + (affectedTabs.join(', ') || 'no tabs'));

  // Email confirmation to the user
  try {
    MailApp.sendEmail({
      to:      targetEmail,
      subject: '[Insurance Untangled] Your data deletion request is complete',
      body:    'Hello,\n\nWe have completed your data deletion request as required by GDPR Article 17 / CCPA Section 1798.105.\n\n'
             + 'Records removed: ' + deletedCount + '\n'
             + 'Tabs affected: '   + (affectedTabs.join(', ') || 'none') + '\n\n'
             + 'You will no longer receive any communications from us. If you submit a new form in the future, '
             + 'a new record will be created.\n\n'
             + 'If you did not request this deletion, please reply to this email immediately.\n\n'
             + 'Thank you,\nInsurance Untangled\nsupport@insuranceuntangled.com'
    });
  } catch (err) {
    Logger.log('Confirmation email failed: ' + err.message);
  }
}
