/**
 * RIDA Academy — Google Apps Script Text Proxy
 * File: data/proxy.gs
 *
 * ONE-TIME SETUP:
 * 1. Go to script.google.com → New Project  (use script.google.com, NOT the Workspace app)
 * 2. Delete the default code, paste this entire file
 * 3. Click Deploy → New Deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click Deploy — copy the Web App URL
 *    ✅ URL must look like: https://script.google.com/macros/s/AKfy.../exec
 *    ❌ NOT like: https://script.google.com/a/macros/yourdomain.com/s/.../exec
 *       (The /a/macros/domain/ format does NOT send CORS headers — browsers will block it)
 * 5. Open data/sheets.js → paste the URL as the value of RIDA_APPS_SCRIPT_PROXY
 *
 * USAGE (called automatically by sheets.js):
 *   ?id=DRIVE_FILE_ID          — reads any Drive file you own (VTT, txt, etc.)
 *   ?docUrl=ENCODED_EXPORT_URL — fetches a Google Doc export URL server-side
 */

// Allowed origins for CORS — add your production domain here
var ALLOWED_ORIGINS = [
  'https://www.ridacademy.com',
  'https://ridacademy.com',
  'http://127.0.0.1:5500',   // local dev (Live Server)
  'http://localhost:5500',
  'http://localhost:3000'
];

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};
  var id     = params.id     || '';
  var docUrl = params.docUrl || '';

  try {
    var content = '';

    if (id) {
      // Read a Drive file directly (VTT, txt, csv, etc.)
      // Note: for Google Docs use ?docUrl= instead — getBlob() on a Doc returns a PDF
      var file = DriveApp.getFileById(id);
      var blob = file.getBlob();
      // Reject binary/PDF blobs — Google Docs should use ?docUrl= path
      if (blob.getContentType() === 'application/pdf' ||
          blob.getContentType().indexOf('vnd.google-apps') !== -1) {
        content = 'ERROR: This is a Google-native file. Use ?docUrl= with the export URL instead.';
      } else {
        content = blob.getDataAsString('UTF-8');
      }

    } else if (docUrl) {
      // Fetch an export URL (Google Doc txt export, etc.) server-side
      var decoded  = decodeURIComponent(docUrl);
      var response = UrlFetchApp.fetch(decoded, {
        muteHttpExceptions: true,
        followRedirects:    true
      });
      var code = response.getResponseCode();
      if (code >= 400) {
        content = 'ERROR: Export URL returned HTTP ' + code;
      } else {
        content = response.getContentText('UTF-8');
      }

    } else {
      content = 'ERROR: Provide ?id=DRIVE_FILE_ID or ?docUrl=ENCODED_EXPORT_URL';
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
