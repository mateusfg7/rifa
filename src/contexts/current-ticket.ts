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
    name: 'Maria Clara Brito Santana',
    address: 'Rua Parú, 1040 - Recanto',
    phone: '(37) 99844-0073',
    paymentDate: new Date(),
    numbers: [50, 51]
  },
  newTicket: true,
  addNewTicket: ticket => set(state => ({ ticket })),
  toggleNewTicket: () => set(state => ({ newTicket: !state.newTicket }))
}))
