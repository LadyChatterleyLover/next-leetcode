import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './components/AntdRegistry'
import Header from './components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '力扣(leetcode)',
  description: 'next-leetcode',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header></Header>
          <div className="w-full h-full">{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
