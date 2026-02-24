const DRY_RUN = true;

function getValidRecipients_(rows) {
  const seen = new Set();
  const recipients = [];

  rows.forEach((row) => {
    const email = (row.Email || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    const key = email.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    recipients.push({ ...row, Email: email });
  });

  return recipients;
}

function getRowsFromSheet_() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  return values.map((row) => {
    const obj = {};
    headers.forEach((h, i) => (obj[h] = row[i]));
    return obj;
  });
}

function sendEmails_(recipients, getSubjectBody) {
  if (DRY_RUN) {
    Logger.log('DRY_RUN enabled. Recipients: ' + recipients.map((r) => r.Email).join(', '));
    return;
  }

  recipients.forEach((row) => {
    const { subject, body } = getSubjectBody(row);
    MailApp.sendEmail({
      to: row.Email,
      subject,
      body
    });
  });
}

function sendReminderAll(subjectEn, bodyEn, subjectCn, bodyCn) {
  const rows = getValidRecipients_(getRowsFromSheet_());
  sendEmails_(rows, (row) => {
    const lang = String(row.LanguagePreference || '').toUpperCase();
    if (lang === 'CN' || lang === '中文') {
      return { subject: subjectCn, body: bodyCn };
    }
    return { subject: subjectEn, body: bodyEn };
  });
}

function sendReminderByLanguage(lang, subject, body) {
  const target = String(lang || '').toUpperCase();
  const rows = getValidRecipients_(getRowsFromSheet_()).filter((row) => {
    const pref = String(row.LanguagePreference || '').toUpperCase();
    if (target === 'CN') return pref === 'CN' || pref === '中文';
    return pref === 'EN';
  });
  sendEmails_(rows, () => ({ subject, body }));
}

function sendClosedNoticeAll(subjectEn, bodyEn, subjectCn, bodyCn) {
  sendReminderAll(subjectEn, bodyEn, subjectCn, bodyCn);
}
