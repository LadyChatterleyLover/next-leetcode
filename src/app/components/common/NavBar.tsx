import { usePathname, useRouter } from 'next/navigation'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <div className='text-[#ffa116]'>精品商城</div>,
  },
  {
    key: '2',
    label: <div className='text-[#ffa116]'>力扣周边</div>,
  },
  {
    key: '3',
    label: <div className='text-[#ffa116]'>Plus会员</div>,
  },
]

const NavBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const host = window.location.origin

  const nabBars = [
    {
      name: '学习',
      path: '/study',
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
    {
      name: '求职',
      path: '/company',
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      window.open('https://detail.youzan.com/show/goods/newest?alias=271n43vr9hen7', '_blank')
    }
    if (key === '2') {
      window.open(`${host}/store`, '_blank')
    }
    if (key === '3') {
    }
  }

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
      <Dropdown trigger={['click']} menu={{ items, onClick }} arrow={false}>
        <div className='flex items-center gap-x-2 text-[#ffa116] cursor-pointer'>
          <div>商城</div>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  )
}

export default NavBar
