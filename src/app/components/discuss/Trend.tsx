'use client'
import { EditOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Input } from 'antd'

interface Props {
  setTrend: (sort: string, feat: boolean) => void
  setQuery: (val: string) => void
}

const DiscussList: React.FC<Props> = ({ setTrend, setQuery }) => {
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
    <div className='mt-5 flex items-center justify-between'>
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
      <div className='flex gap-x-3 flex-1 justify-end'>
        <Input.Search placeholder='搜索' style={{ width: 240 }} onSearch={setQuery}></Input.Search>
        <div className='bg-[#2db55d] text-white text-sm flex items-center gap-x-2 rounded-full py-1 px-3 cursor-pointer'>
          <EditOutlined></EditOutlined>
          <div>发起讨论</div>
        </div>
      </div>
    </div>
  )
}

export default DiscussList
