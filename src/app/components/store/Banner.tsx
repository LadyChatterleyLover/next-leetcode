import { GiftOutlined, PlusCircleOutlined, StarOutlined } from '@ant-design/icons'
import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div
      className='flex flex-col items-center justify-center'
      style={{
        backgroundImage: 'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)',
      }}
    >
      <div className='mt-[80px] mb-12'>
        <Image
          src='https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/LeetCode_new_logo_light.0f4d45e9c.svg'
          alt=''
          width={127}
          height={150}
        ></Image>
      </div>
      <div className='flex  items-center'>
        <Image
          alt=''
          src='https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/LCCN_name_black.409f3d3a2.svg'
          width={65}
          height={36}
        ></Image>
        <div className='text-4xl text-[#b3b3b3] font-[100]'>商店</div>
      </div>
      <div className='text-lg font-[300] mt-8 mb-5' style={{ color: 'grey' }}>
        使用力扣积分来换取免费礼品
      </div>
      <div className='mb-10 flex items-center gap-x-5'>
        <div
          className='bg-white w-full flex items-center gap-x-2 px-6 py-3 rounded-full text-[#fea116] text-xl whitespace-nowrap'
          style={{
            border: '1px solid #fff',
          }}
        >
          <GiftOutlined />
          <div>免费兑换礼品</div>
        </div>
        <div
          className='bg-[#333333] w-full flex items-center gap-x-2 px-6 py-3 rounded-full text-white text-xl whitespace-nowrap cursor-pointer hover:bg-white hover:text-[#fea116]'
          style={{
            border: '1px dashed #fff',
          }}
        >
          <PlusCircleOutlined />
          <div>领取&nbsp;LeetCoin</div>
        </div>
        <div
          className='bg-[#333333] w-full flex items-center gap-x-2 px-6 py-3 rounded-full text-white text-xl whitespace-nowrap cursor-pointer hover:bg-white hover:text-[#fea116]'
          style={{
            border: '1px dashed #fff',
          }}
        >
          <StarOutlined />
          <div>Plus&nbsp;会员</div>
        </div>
      </div>
    </div>
  )
}

export default Banner
