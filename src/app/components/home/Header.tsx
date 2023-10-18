'use client'

import { localGet } from '@/app/utils/storage'
import { SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UserStatus } from '@/app/types'
import { Avatar } from 'antd'

const Header = () => {
  const router = useRouter()
  const [user, setUser] = useState<UserStatus>()
  const getUserStatus = () => {
    axios.post('/api/userStatus').then(res => {
      setUser(res.data.data)
    })
  }

  useEffect(() => {
    getUserStatus()
  }, [])

  return (
    <div
      className='fixed left-0 right-0 top-0 flex h-[50px] w-full items-center  md:relative  z-[50] bg-white'
      style={{
        borderBottom: '1px solid #eee',
      }}
    >
      <div className='display-none m-auto h-[50px] w-full items-center justify-between px-6 md:flex max-w-[1200px]'>
        <div className='flex h-[22px]'>
          <svg
            width='273'
            height='101'
            viewBox='0 0 273 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='h-full w-auto max-w-none'
          >
            <path
              d='M68.4876 75.8086C70.7358 73.5637 74.375 73.5696 76.616 75.8217C78.857 78.0738 78.8511 81.7194 76.6029 83.9642L66.6199 93.9326C57.4098 103.129 42.3911 103.263 33.0256 94.2424C32.9715 94.1905 28.8012 90.1015 15.044 76.6115C5.89166 67.6374 4.97987 53.2774 13.5925 44.0559L29.6506 26.8617C38.1985 17.7086 53.9552 16.7082 63.7285 24.6118L78.3131 36.4069C80.783 38.4043 81.1688 42.0294 79.1748 44.5036C77.1808 46.9778 73.5621 47.3642 71.0922 45.3667L56.5077 33.5717C51.3965 29.4383 42.4555 30.006 38.0451 34.7287L21.9867 51.9232C17.7939 56.4124 18.2531 63.6445 23.085 68.3823C33.1872 78.2883 40.9729 85.9224 40.9819 85.931C45.8509 90.6207 53.7239 90.5508 58.5045 85.777L68.4876 75.8086Z'
              fill='#FFA116'
            ></path>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M44.2359 65.8329C41.0616 65.8329 38.4883 63.2551 38.4883 60.0752C38.4883 56.8954 41.0616 54.3176 44.2359 54.3176H86.6247C89.799 54.3176 92.3723 56.8954 92.3723 60.0752C92.3723 63.2551 89.799 65.8329 86.6247 65.8329H44.2359Z'
              fill='#B3B3B3'
            ></path>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M52.1745 2.74414C54.3432 0.422038 57.9804 0.300713 60.2984 2.47315C62.6165 4.64558 62.7376 8.28912 60.5689 10.6112L21.9869 51.9233C17.7939 56.4122 18.2531 63.6443 23.0847 68.3823L40.9025 85.8543C43.1709 88.0787 43.2097 91.724 40.9892 93.9964C38.7687 96.2688 35.1297 96.3077 32.8613 94.0833L15.0435 76.6112C5.89165 67.6366 4.97986 53.2768 13.5929 44.0559L52.1745 2.74414Z'
              fill='black'
            ></path>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M134.597 76.9199C136.835 70.9349 138.641 63.746 139.829 55.2689C140.466 50.7197 141.171 44.0491 141.946 35.2455H168.026C168.045 35.2455 168.065 35.2457 168.085 35.2461C168.099 35.2464 168.114 35.2469 168.128 35.2474C169.604 35.3042 170.754 36.5465 170.698 38.0221L169.121 79.0221C169.065 80.4579 167.885 81.5933 166.449 81.5933H159.217C157.248 81.5933 155.652 83.1895 155.652 85.1585C155.652 87.1275 157.248 88.7237 159.217 88.7237H169.022C172.96 88.7237 176.152 85.5313 176.152 81.5933L177.935 35.2455C177.935 31.3074 174.742 28.115 170.804 28.115H142.551C142.909 23.7439 143.281 18.9555 143.667 13.7488C143.812 11.7851 142.338 10.0754 140.375 9.92989C138.411 9.78442 136.701 11.2583 136.556 13.222C136.154 18.6449 135.768 23.6097 135.397 28.115H123.565C121.596 28.115 120 29.7112 120 31.6802C120 33.6493 121.596 35.2455 123.565 35.2455H134.788C134.046 43.6184 133.372 49.9666 132.767 54.2793C131.651 62.247 129.972 68.9303 127.918 74.4227C126.842 77.3007 125.739 79.6494 124.675 81.5033C124.317 82.1278 123.994 82.6411 123.716 83.0475C123.569 83.2613 123.483 83.3764 123.466 83.397C122.229 84.9283 122.467 87.1731 123.998 88.4109C125.529 89.6487 127.774 89.4107 129.012 87.8794C129.43 87.3615 130.07 86.4292 130.861 85.0509C132.117 82.8608 133.385 80.1607 134.597 76.9199ZM227.847 76.2146V33.0939H259.887C262.874 33.0939 265.282 35.4808 265.282 38.4095V72.3436C265.282 75.2722 262.874 77.6591 259.887 77.6591H249.582C246.594 77.6591 244.186 75.2722 244.186 72.3436V43.7896C244.186 41.8205 242.59 40.2243 240.621 40.2243C238.652 40.2243 237.055 41.8205 237.055 43.7896V72.3436C237.055 79.2246 242.671 84.7896 249.582 84.7896H259.887C266.798 84.7896 272.413 79.2246 272.413 72.3436V38.4095C272.413 31.5284 266.798 25.9635 259.887 25.9635H227.847V15.2678C227.847 13.2988 226.251 11.7026 224.282 11.7026C222.313 11.7026 220.717 13.2988 220.717 15.2678V25.9635H208.239C206.27 25.9635 204.674 27.5597 204.674 29.5287C204.674 31.4977 206.27 33.0939 208.239 33.0939H220.717V54.3888L208.697 59.1967C206.869 59.928 205.98 62.0028 206.711 63.831C207.442 65.6592 209.517 66.5484 211.345 65.8172L220.717 62.0685V76.2146C220.717 80.9286 216.749 84.7896 211.804 84.7896C209.835 84.7896 208.239 86.3858 208.239 88.3548C208.239 90.3238 209.835 91.92 211.804 91.92C220.643 91.92 227.847 84.9111 227.847 76.2146Z'
              fill='black'
            ></path>
          </svg>
        </div>
        <div className='h-full flex items-center'>
          <SearchOutlined style={{ fontSize: 20, color: '#0000008c' }}></SearchOutlined>
          <div>
            {user ? (
              <div className='flex items-center ml-1 cursor-pointer'>
                <Avatar size={24} src={user.avatar}></Avatar>
                <div className='text-sm mx-1'>{user.realName}</div>
              </div>
            ) : (
              <div className='flex items-center ml-4'>
                <div
                  className='text-text-secondary  hover:text-[#0000008c] hidden lg:flex cursor-pointer'
                  onClick={() => router.push('/login')}
                >
                  注册
                </div>
                <div className='mx-2'>或</div>
                <div
                  className='text-text-secondary  hover:text-[#0000008c] hidden lg:flex cursor-pointer'
                  onClick={() => router.push('/login')}
                >
                  登录
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
