'use client'
import { useReactive } from 'ahooks'

interface Props {
  setTrend: (sort: string, feat: boolean) => void
}

const DiscussList: React.FC<Props> = ({ setTrend }) => {
  const navs = [
    {
      name: '最热',
      value: 'HOTTEST',
    },
    {
      name: '最新',
      value: 'LATEST',
    },
    {
      name: '推荐',
      value: 'HOTTEST',
    },
  ]
  const state = useReactive<{
    currentIndex: number
  }>({
    currentIndex: 0,
  })
  return (
    <div className='mt-5'>
      <div className='flex items-center gap-x-8'>
        {navs.map((item, index) => {
          return (
            <div
              key={index}
              className='leading-8 cursor-pointer'
              style={{
                color: state.currentIndex === index ? '#262626' : '#3c3c4399',
                borderBottom: state.currentIndex === index ? '2px solid #262626' : 'none',
              }}
              onClick={() => {
                const feat = item.name === '最热' ? false : item.name === '最新' ? false : true
                setTrend(item.value, feat)
                state.currentIndex = index
              }}
            >
              {item.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DiscussList
