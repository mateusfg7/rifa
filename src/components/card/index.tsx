import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'
import { format } from 'date-fns'
import { domToPng } from 'modern-screenshot'
import { DownloadCloud, Loader2, X } from 'lucide-react'

import { useCurrTicketStore } from '@/contexts/current-ticket'

import maquiagem from './maquiagem.png'
import espacoDepma from './espaco-depma.png'
import './styles.css'

export function Card() {
  const [isDownloading, setIsDownloading] = useState(false)
  const { address, name, numbers, paymentDate, phone } = useCurrTicketStore(
    state => state.ticket
  )
  const toggleNewTicket = useCurrTicketStore(state => state.toggleNewTicket)

  const printRef = useRef<HTMLDivElement>(null)

  async function handleDownloadImage() {
    flushSync(() => {
      setIsDownloading(true)
    })

    const element = printRef.current as HTMLDivElement

    console.log(element)

    await domToPng(element).then(data => {
      const link = document.createElement('a')
      link.href = data
      link.download = `${name.toLowerCase().replaceAll(' ', '-')}.png`
      link.click()
    })

    setIsDownloading(false)
  }

  const formattedPaymentDate = format(paymentDate, 'dd/MM/yyyy')

  const TicketCard = () => (
    <div className="card" ref={printRef}>
      <div className="relative">
        <div className="z-10 flex h-full flex-col justify-center gap-9 pl-14 text-2xl">
          <h1 className="bg-text-gradient font-alt text-7xl">Maleta Camarim</h1>
          <div className="flex flex-col gap-4">
            <div className="bg-text-gradient flex flex-col">
              <div className="info-row">
                <span className="key">Nome</span>
                <span className="space-dots">
                  {[...Array(60)].map((e, i) => (
                    <span key={i}>•</span>
                  ))}
                </span>
                <span className="value">{name}</span>
              </div>
              <div className="info-row">
                <span className="key">Endereço</span>
                <span className="space-dots">
                  {[...Array(60)].map((e, i) => (
                    <span key={i}>•</span>
                  ))}
                </span>
                <span className="value">{address}</span>
              </div>
              <div className="info-row">
                <span className="key">Telefone</span>
                <span className="space-dots">
                  {[...Array(60)].map((e, i) => (
                    <span key={i}>•</span>
                  ))}
                </span>
                <span className="value">{phone}</span>
              </div>
              <div className="info-row">
                <span className="key">Valor</span>
                <span className="space-dots">
                  {[...Array(60)].map((e, i) => (
                    <span key={i}>•</span>
                  ))}
                </span>
                <span className="value">R$ {numbers.length * 10},00</span>
              </div>
              <div className="info-row">
                <span className="key">Data de pagamento</span>
                <span className="space-dots">
                  {[...Array(60)].map((e, i) => (
                    <span key={i}>•</span>
                  ))}
                </span>
                <span className="value">{formattedPaymentDate}</span>
              </div>
            </div>
            <span className="bg-text-gradient space-x-5 font-alt text-5xl">
              <span>nº</span>
              <span className="space-x-3">
                {numbers.length > 1 ? (
                  numbers.map(num => (
                    <span
                      className="after:content-[','] last:after:content-['']"
                      key={num}
                    >
                      {num}
                    </span>
                  ))
                ) : (
                  <span>{numbers[0]}</span>
                )}
              </span>
            </span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="flex h-full w-full items-center justify-center p-6">
            <Image src={espacoDepma} alt="Espaço Depmá" />
          </div>
        </div>
      </div>
      <div className="flex h-full w-80 items-end justify-end">
        <Image
          src={maquiagem}
          alt="Maquiagem"
          className="w-full object-cover"
        />
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="flex h-full w-full flex-col items-center justify-center gap-10">
        <TicketCard />
        <div className="flex w-[1000px] justify-end gap-5">
          <button
            onClick={toggleNewTicket}
            className="flex items-center gap-1 rounded-lg border border-red-300 bg-red-300/10 p-3 font-bold text-red-300 hover:bg-gradient-to-br hover:from-red-300 hover:to-red-200 hover:text-red-950"
          >
            <span>Fechar</span>
            <X />
          </button>
          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-1 rounded-lg border border-neutral-50 bg-neutral-50/10 p-3 font-bold text-neutral-50 hover:bg-gradient-to-br hover:from-neutral-100 hover:to-neutral-200 hover:text-neutral-950"
          >
            <span>Baixar Rifa</span>
            {!isDownloading && <DownloadCloud />}
            {isDownloading && <Loader2 className="animate-spin" />}
          </button>
        </div>
      </div>
    </div>
  )
}
