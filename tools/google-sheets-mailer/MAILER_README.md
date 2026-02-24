# Google Sheets Mailer (No Website Backend Needed)

This folder gives you a simple way to send reminder emails from Google Sheets.

## What this is for
- Your Google Form collects signup data.
- Responses appear in a Google Sheet.
- This script sends reminder or closure notices using your Gmail account.

## Required Google Sheet headers
Your active sheet should include these exact headers:
- `Timestamp`
- `Name`
- `Email`
- `Programme`
- `LanguagePreference`
- `SessionSlug(optional)`

## Setup steps
1. Open your responses Google Sheet.
2. Click **Extensions → Apps Script**.
3. Delete any starter code.
4. Copy-paste the full content of `Mailer.gs`.
5. Save.
6. Set `DRY_RUN = true` for first test.

## First run and permissions
1. In Apps Script, select a function (example: `sendReminderByLanguage`).
2. Click **Run**.
3. Google will ask for permissions. Accept so script can use MailApp.
4. Open **View → Logs** to confirm recipients in DRY_RUN mode.

## Sending for real
1. Change `DRY_RUN` from `true` to `false`.
2. Run the target function again.

## Functions available
- `sendReminderAll(subjectEn, bodyEn, subjectCn, bodyCn)`
  - Sends EN or CN copy based on `LanguagePreference`.
- `sendReminderByLanguage(lang, subject, body)`
  - `lang` is `EN` or `CN`.
- `sendClosedNoticeAll(subjectEn, bodyEn, subjectCn, bodyCn)`
  - Uses the same logic as reminder-all, but for closure notices.

## Notes
- Script skips blank or invalid emails.
- Script removes duplicate emails automatically.
- Gmail has daily sending quotas. If you send many emails, split batches over multiple days.

## Customize templates
Edit subject/body text directly in function calls from Apps Script editor, for example:
```javascript
sendReminderByLanguage('EN', 'Session reminder', 'See you tomorrow at 5pm.');
```
