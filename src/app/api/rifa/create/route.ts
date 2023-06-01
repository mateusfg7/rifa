import { NextResponse } from 'next/server'

import { registerNewTickets } from './lib/register-new-ticket'
import { saveFileToDisk } from './lib/save-file-to-disk'
import { uploadReceiptToGcs } from './lib/upload-receipt-to-gcs'

export async function POST(request: Request) {
  const formData = await request.formData()

  const { address, amount, name, paymentReceipt, phone } = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
    paymentReceipt: formData.get('paymentReceipt') as File,
    amount: Number(formData.get('amount'))
  }

  const formattedFileName = name.toLowerCase().replaceAll(' ', '-')
  const filePath = await saveFileToDisk(paymentReceipt, formattedFileName)
  const date = new Date()
  const paymentReceiptUrl = await uploadReceiptToGcs(
    filePath,
    `${formattedFileName}_${date.toISOString()}.${
      paymentReceipt.type.split('/')[1]
    }`
  )

  try {
    const ticket = await registerNewTickets({
      address,
      amount,
      name,
      phone,
      paymentReceiptUrl
    })
    return NextResponse.json(
      { message: 'Rifa cadastrada com sucesso', rifa: ticket },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal server error', err },
      { status: 500 }
    )
  }
}
