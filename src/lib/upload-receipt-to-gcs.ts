/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { bucket } from './google-cloud-storage'

export async function uploadReceiptToGcs(
  pathString: string,
  destination: string
) {
  const file = await bucket.upload(pathString, { destination })

  const fileUrl = `https://storage.googleapis.com/payment-receipt-dg874/${file[0].metadata.name}`

  return fileUrl
}
