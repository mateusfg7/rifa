import { GoogleSpreadsheet } from 'google-spreadsheet'

export async function loadSpreadsheetDocument() {
  const doc = new GoogleSpreadsheet(process.env.DOC_ID)
  await doc.useServiceAccountAuth({
    client_email: String(process.env.CLIENT_EMAIL),
    private_key: String(process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'))
  })
  await doc.loadInfo()

  return doc
}
