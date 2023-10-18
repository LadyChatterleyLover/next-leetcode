'use client'

import {
  CloudUploadOutlined,
  LeftOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  loading: boolean
  submit: () => void
}

const Header: React.FC<Props> = ({ loading, submit }) => {
  return (
    <div className='z-nav-1 relative flex h-[50px] w-full shrink-0 items-center px-5 bg-white'>
      <div className='flex w-full h-full justify-between items-center'>
        <div className='flex items-center h-full'>
          <Link href='/'>
            <Image
              src='https://static.leetcode-cn.com/cn-frontendx-assets/production/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png?x-oss-process=image%2Fformat%2Cwebp'
              alt='logo'
              width={22}
              height={22}
            ></Image>
          </Link>
          <Tooltip title='展开面板' placement='bottom' arrow={false}>
            <div className='flex items-center h-full mx-3 cursor-pointer'>
              <MenuUnfoldOutlined />
              <div className='ml-2'>题库</div>
            </div>
          </Tooltip>
          <Tooltip title='上一题' placement='bottom' arrow={false}>
            <Button size='small' icon={<LeftOutlined />} className='mr-3'></Button>
          </Tooltip>
          <Tooltip title='下一题' placement='bottom' arrow={false}>
            <Button size='small' icon={<RightOutlined />}></Button>
          </Tooltip>
          <div className='ml-5 cursor-pointer'>
            <Tooltip title='随机一题' placement='bottom' arrow={false}>
              <ShareAltOutlined />
            </Tooltip>
          </div>
        </div>
        <div>
          <Button size='small' type='primary' icon={<CloudUploadOutlined />} loading={loading} onClick={submit}>
            {loading ? '判题中' : '提交'}
          </Button>
        </div>
        <div>1</div>
      </div>
    </div>
  )
}

export default Header
