import { loadSpreadsheetDocument } from './load-spreadshee-document'

interface RowHeaders {
  Num: number
  Nome: string
  Telefone: string
  Endereco: string
  Comprovante: string
}

type Row = Record<string, string | number | boolean>

export async function registerNewTickets(ticketBody: CreateTicketBody) {
  const doc = await loadSpreadsheetDocument()

  const sheet = doc.sheetsByIndex[0]

  const rows = await sheet.getRows()
  const lastTicketNumber = Number(rows[rows.length - 1].Num)

  let currTicketNumber = lastTicketNumber
  let tickets: RowHeaders[] = []

  for (let i = 0; i < ticketBody.amount; i++) {
    currTicketNumber++
    tickets.push({
      Num: currTicketNumber,
      Nome: ticketBody.name,
      Telefone: "'" + ticketBody.phone,
      Endereco: ticketBody.address,
      Comprovante: ticketBody.paymentReceiptUrl
    })
  }

  await sheet.addRows(tickets as unknown as Row[])

  return {
    Números: tickets.map(ticket => ticket.Num),
    Nome: ticketBody.name,
    Telefone: ticketBody.phone,
    Endereço: ticketBody.address,
    Comprovante: ticketBody.paymentReceiptUrl
  }
}
