import { Inter, Niconne } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const niconne = Niconne({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-niconne'
})

export const metadata = {
  title: 'Rifa | Espaço Depmá',
  description: 'Rifa Maleta Camarim by Espaço Depmá'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${niconne.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
