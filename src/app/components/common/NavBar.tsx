import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const NavBar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const nabBars = [
    {
      name: '学习',
      path: '/',
    },
    {
      name: '题库',
      path: '/problemset',
    },
    {
      name: '竞赛',
      path: '/contest',
    },
    {
      name: '讨论',
      path: '/discuss',
    },
  ]
  return (
    <div className='flex items-center gap-x-7 ml-5 h-full'>
      {nabBars.map(item => {
        return (
          <div
            key={item.path}
            className={`text-[#0000008c] hover:text-[#1a1a1a] relative h-full flex items-center cursor-pointer ${
              pathname === item.path ? 'text-black' : ''
            }`}
            style={{
              borderBottom: pathname === item.path ? '2px solid #000' : '',
            }}
            onClick={() => {
              router.push(item.path)
            }}
          >
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default NavBar
