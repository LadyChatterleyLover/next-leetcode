import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './components/AntdRegistry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '力扣(leetcode)',
  description: 'next-leetcode',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
