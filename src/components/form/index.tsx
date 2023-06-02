import { type ChangeEvent, type FormEvent, useState } from 'react'
import { Check, Loader2, X } from 'lucide-react'

import './styles.css'
import { useCurrTicketStore } from '@/contexts/current-ticket'

interface Ticket {
  Números: number[]
  Nome: string
  Telefone: string
  Endereço: string
  Comprovante: string
}

export function Form() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [amount, setAmount] = useState(1)
  const [paymentReceipt, setPaymentReceipt] = useState<File>()

  const [status, setStatus] = useState<
    undefined | 'loading' | 'success' | 'error'
  >()

  const { addNewTicket, toggleNewTicket } = useCurrTicketStore(state => state)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setPaymentReceipt(e.target.files[0])
    }
  }

  function resetAll() {
    setName('')
    setPhone('')
    setAddress('')
    setPaymentDate('')
    setAmount(1)
    setPaymentReceipt(undefined)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setStatus('loading')
    const formData = new FormData()

    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('address', address)
    formData.append('amount', String(amount))
    formData.append(
      'paymentReceipt',
      paymentReceipt as Blob,
      paymentReceipt?.name
    )

    await fetch('/api/rifa/create', {
      method: 'POST',
      body: formData
    })
      .then(async response => {
        if (response.status === 201) {
          setStatus('success')
          resetAll()
          const { rifa }: { message: string; rifa: Ticket } =
            await response.json()

          addNewTicket({
            name: rifa.Nome,
            address: rifa.Endereço,
            numbers: rifa.Números,
            paymentDate: new Date(paymentDate),
            phone: rifa.Telefone
          })
          toggleNewTicket()
        } else {
          setStatus('error')
          console.log(await response.json())
        }
      })
      .catch(error => {
        setStatus('error')
        console.log(error)
      })
  }

  return (
    <form onSubmit={handleSubmit} className="ticket-form space-y-10">
      <div className="flex gap-2">
        <div className="fieldset flex-1">
          <label htmlFor="text">Nome</label>
          <input
            required
            type="text"
            id="text"
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
            placeholder="Nome Completo do Comprador"
            className="w-full"
          />
        </div>
        <div className="fieldset">
          <label htmlFor="phone">Telefone</label>
          <input
            required
            type="text"
            id="phone"
            value={phone}
            onChange={e => {
              setPhone(e.target.value)
            }}
            className="w-40"
            placeholder="(99) 99999-9999"
          />
        </div>
      </div>
      <div className="fieldset">
        <label htmlFor="address">Endereço</label>
        <input
          required
          type="text"
          id="address"
          value={address}
          onChange={e => {
            setAddress(e.target.value)
          }}
          placeholder="Rua Exemplo, 0000 - Bairro"
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between gap-1">
          <label htmlFor="receipt">
            Comprovante de pagamento
            {paymentReceipt && (
              <span className="flex flex-col gap-1 text-sm font-normal leading-none text-neutral-600">
                {paymentReceipt?.name}
              </span>
            )}
          </label>
          <div>
            <label htmlFor="receipt">
              <div className="main-gradient group flex w-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-red-400 bg-clip-text p-3 text-base leading-none hover:bg-neutral-600 hover:bg-clip-border">
                <span className="translate text-transparent group-hover:text-white">
                  Comprovante
                </span>
              </div>
            </label>
            <input
              required
              type="file"
              id="receipt"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-1">
          <label htmlFor="paymentDate">Data de pagamento</label>

          <div>
            <input
              required
              type="date"
              id="paymentDate"
              value={paymentDate}
              onChange={e => {
                setPaymentDate(e.target.value)
              }}
              className="w-40"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label>Quantidade de rifas</label>
        <input
          required
          type="number"
          value={amount}
          onChange={e => {
            setAmount(Number(e.target.value) > 0 ? Number(e.target.value) : 1)
          }}
          className="w-40 text-center"
        />
      </div>

      <div className="flex w-full gap-2">
        <button
          type="reset"
          onClick={resetAll}
          className="flex-1 rounded-lg bg-gradient-to-br from-red-100 to-red-200 p-3 font-bold text-red-950 hover:from-red-600 hover:to-red-700 hover:text-white"
        >
          Limpar
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-gradient-to-br from-green-100 to-green-200 p-3 font-bold text-green-950 hover:from-green-600 hover:to-green-700 hover:text-white"
        >
          Cadastrar
        </button>
      </div>

      {status && (
        <div className="flex w-full justify-center font-bold">
          {status === 'loading' && (
            <div className="flex gap-2">
              <Loader2 className="animate-spin" />{' '}
              <span>Cadastrando rifa...</span>
            </div>
          )}
          {status === 'success' && (
            <div className="flex gap-2 text-green-900">
              <Check /> <span>Rifa cadastrada</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex gap-2 text-red-900">
              <X /> <span>Erro ao cadastrar rifa</span>
            </div>
          )}
        </div>
      )}
    </form>
  )
}
