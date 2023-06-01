import { NextResponse } from 'next/server'
import { registerNewTickets } from './lib/registerNewTicket'

export async function POST(request: Request) {
  const formData = await request.formData()

  const body: CreateTicketBody = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
    paymentReceiptUrl: formData.get('paymentReceiptUrl') as string,
    amount: Number(formData.get('amount'))
  }

  try {
    const tickets = await registerNewTickets(body)
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
