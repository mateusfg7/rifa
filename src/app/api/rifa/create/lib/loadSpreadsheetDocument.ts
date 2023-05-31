import { GoogleSpreadsheet } from 'google-spreadsheet'

export async function loadSpreadsheetDocument() {
  const doc = new GoogleSpreadsheet(process.env.DOC_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL as string,
    private_key: process.env.PRIVATE_KEY as string
  })
  await doc.loadInfo()

  return doc
}
