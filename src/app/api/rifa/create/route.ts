import { NextResponse } from 'next/server'
import { loadSpreadsheetDocument } from './lib/loadSpreadsheetDocument'

interface RequestBody {
  name: string
  phone: string
  address: string
  paymentReceiptUrl: string
  amount: number
}

interface RowHeaders {
  Num: number
  Nome: string
  Telefone: string
  Endereco: string
  Comprovante: string
}

type Row = Record<string, string | number | boolean>

export async function POST(request: Request) {
  const body: RequestBody = await request.json()

  const doc = await loadSpreadsheetDocument()

  const sheet = doc.sheetsByIndex[0]

  const rows = await sheet.getRows()
  const lastTicketNumber = Number(rows[rows.length - 1].Num)

  let currTicketNumber = lastTicketNumber
  let tickets: RowHeaders[] = []
  for (let i = 0; i < body.amount; i++) {
    currTicketNumber++
    tickets.push({
      Num: currTicketNumber,
      Nome: body.name,
      Telefone: "'" + body.phone,
      Endereco: body.address,
      Comprovante: body.paymentReceiptUrl
    })
  }

  try {
    await sheet.addRows(tickets as unknown as Row[])
    return NextResponse.json(
      { message: 'Rifa cadastrada com sucesso', rifas: tickets },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal server error', err },
      { status: 500 }
    )
  }
}
