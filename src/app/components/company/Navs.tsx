import React from 'react'

interface Props {
  currentNav: string
  setNav: (val: string) => void
}

const Navs: React.FC<Props> = ({ currentNav, setNav }) => {
  const navs = [
    {
      name: '热门企业',
      value: 'company',
    },
    {
      name: '职位速递',
      value: 'job',
    },
    {
      name: '模拟记录',
      value: 'history',
    },
  ]
  return (
    <div className='flex gap-x-8 items-center'>
      {navs.map(item => {
        return (
          <div
            key={item.value}
            className={`leading-[30px] py-1 cursor-pointer hover:text-[#262626] ${
              currentNav === item.value ? 'font-[600] text-[#262626]' : 'font-normal text-[#bfbfbf]'
            }`}
            style={{
              borderBottom: currentNav === item.value ? '2px solid #262626' : 'none',
            }}
            onClick={() => {
              setNav(item.value)
            }}
          >
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default Navs
