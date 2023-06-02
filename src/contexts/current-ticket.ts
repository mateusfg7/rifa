import { create } from 'zustand'

interface Ticket {
  name: string
  address: string
  phone: string
  paymentDate: Date
  numbers: number[]
}

interface CurrTicketStore {
  ticket: Ticket
  newTicket: boolean
  addNewTicket: (ticket: Ticket) => void
  toggleNewTicket: () => void
}

export const useCurrTicketStore = create<CurrTicketStore>()(set => ({
  ticket: {
    name: 'Nome Completo do Comprador',
    address: 'Rua Exemplo, 0000 - Bairro',
    phone: '(99) 99999-9999',
    paymentDate: new Date(),
    numbers: [1, 2]
  },
  newTicket: false,
  addNewTicket: ticket => set(state => ({ ticket })),
  toggleNewTicket: () => set(state => ({ newTicket: !state.newTicket }))
}))
