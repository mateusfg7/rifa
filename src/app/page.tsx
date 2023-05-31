'use client'

import { useState } from 'react'

interface RequestBody {
  name: string
  phone: string
  address: string
  paymentReceiptUrl: string
  amount: number
}

export default function Home() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [paymentReceiptUrl, setPaymentReceiptUrl] = useState('')
  const [amount, setAmount] = useState(1)

  const paymentDateAsDate = new Date(paymentDate)

  return (
    <div className="flex min-h-screen w-screen items-center justify-center gap-10 border border-red-600">
      <div className="item-center flex flex-1 flex-col items-center justify-center space-y-10 rounded-xl bg-gradient-to-r  from-sky-50 to-indigo-50 p-10 shadow-xl">
        <h1 className="text-2xl font-bold underline">Cadastrar nova rifa</h1>
        <form className="w-full space-y-10 border">
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-bold">Nome</h2>
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value)
                }}
                className="w-full rounded-lg border border-black/50 p-3 active:border-black"
                placeholder="Nome Completo do Comprador"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold">Telefone</h2>
              <input
                type="text"
                value={phone}
                onChange={e => {
                  setPhone(e.target.value)
                }}
                className="rounded-lg border border-black/50 p-3 text-center active:border-black"
                placeholder="(99) 99999-9999"
              />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold">Endereço</h2>
            <input
              type="text"
              value={address}
              onChange={e => {
                setAddress(e.target.value)
              }}
              className="w-full rounded-lg border border-black/50 p-3 active:border-black"
              placeholder="Rua Exemplo, 0000 - Bairro"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-bold">Comprovante de pagamento</h2>
              <input
                type="text"
                value={paymentReceiptUrl}
                onChange={e => {
                  setPaymentReceiptUrl(e.target.value)
                }}
                className="w-full rounded-lg border border-black/50 p-3 active:border-black"
                placeholder="https://linkdocomprovante.com/comprovante.png"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold">Data de pagamento</h2>
              <input
                type="date"
                value={paymentDate}
                onChange={e => {
                  setPaymentDate(e.target.value)
                }}
                className="rounded-lg border border-black/50 p-3 active:border-black"
                placeholder="https://linkdocomprovante.com/comprovante.png"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Qtd de números</h2>
            <input
              type="number"
              value={amount}
              onChange={e => {
                setAmount(Number(e.target.value))
              }}
              className="w-16 rounded-lg border border-black/50 p-1 text-center active:border-black"
            />
          </div>
        </form>
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-5 rounded-xl border bg-gradient-to-r from-sky-500 to-indigo-500 p-5 text-white shadow-xl">
          <h1 className="text-3xl font-bold italic tracking-wide underline">
            Maleta Camarim
          </h1>
          <div className="flex gap-5 text-lg">
            <div className="font-bold">
              <div>Nome</div>
              <div>Endereço</div>
              <div>Telefone</div>
              <div>Valor</div>
              <div>Data do pagamento</div>
            </div>
            <div>
              <div>{name.length > 0 ? name : 'Nome do Comprador'}</div>
              <div>
                {address.length > 0 ? address : 'Rua Exemplo, 0000 - Bairro'}
              </div>
              <div>{phone.length > 0 ? phone : '(99) 99999-9999'}</div>
              <div>R$ {amount * 10},00</div>
              <div>
                {paymentDate.length > 0
                  ? `${paymentDateAsDate.getDay()}/${paymentDateAsDate.getMonth()}/${paymentDateAsDate.getFullYear()}`
                  : '01/01/1001'}
              </div>
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-wide">
              Números: 054 056
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
