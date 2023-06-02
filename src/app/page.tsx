'use client'

import { Card } from '@/components/card'
import { Form } from '@/components/form'
import { useCurrTicketStore } from '@/contexts/current-ticket'

export default function Home() {
  const haveTicket = useCurrTicketStore(state => state.newTicket)

  return (
    <div>
      <div className="main-gradient flex min-h-screen w-screen items-center justify-center p-5">
        <div className="item-center flex flex-col items-center justify-center space-y-10 rounded-xl bg-gradient-to-br from-white to-neutral-50 p-10 shadow-xl">
          <h1 className="main-gradient bg-clip-text text-3xl font-bold text-transparent">
            Cadastrar nova rifa
          </h1>
          <Form />
        </div>
        {haveTicket && <Card />}
      </div>
    </div>
  )
}
