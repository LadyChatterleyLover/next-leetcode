'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { SaleItem } from '@/app/types'
import { Spin } from 'antd'
import Image from 'next/image'

const SaleList = () => {
  const state = useReactive<{
    saleList: SaleItem[]
  }>({
    saleList: [],
  })

  const getSaleList = () => {
    axios.get('/api/storeMerchandiseListForSale').then(res => {
      state.saleList = res.data.data
    })
  }

  useEffect(() => {
    getSaleList()
  }, [])

  return state.saleList.length ? (
    <div className='flex  flex-wrap mt-5 mx-auto'>
      {state.saleList.map(item => {
        return (
          <div
            key={item.slug}
            className='my-5 px-[10px] pt-[10px] rounded-[10px] bg-white mx-auto'
            style={{
              boxShadow: '0 5px 15px 0 rgba(0,0,0,0.08)',
            }}
          >
            <Image alt='' src={item.images[0]} width={280} height={200}></Image>
            <div className='flex items-center justify-between mt-3'>
              <div>
                <div className='mb-1'>{item.name}</div>
                <div className='text-xs' style={{ color: 'grey' }}>
                  {item.description}
                </div>
              </div>
              <div className='flex items-center rounded-md px-2 py-1 gap-x-2'>
                <div>{item.coinValue}</div>
                <Image
                  alt=''
                  src='https://static.leetcode-cn.com/cn-legacy-assets/images/LeetCoin.png'
                  width={16}
                  height={16}
                ></Image>
              </div>
            </div>
          </div>
        )
      })}
      <div
        className='my-5 px-[10px] pt-[10px] rounded-[10px] bg-white mx-auto'
        style={{
          boxShadow: '0 5px 15px 0 rgba(0,0,0,0.08)',
        }}
      >
        <Image
          alt=''
          src='https://pic.leetcode-cn.com/ad128633a1f9fec540dca38f37262de9732856e947a32405cc22c98ea4320e63-shuihu.jpg'
          width={280}
          height={200}
        ></Image>
        <div className='flex items-center justify-between mt-3'>
          <div>
            <div className='mb-1 text-[#3b82f67f]'>力扣运动水壶</div>
            <div className='text-xs' style={{ color: 'grey' }}>
              极简设计、不锈钢内核、保温保冷
            </div>
          </div>
          <div className='flex items-center rounded-md px-2 py-1 bg-[#5cb85c] text-white'>
            <div>前往购买</div>
          </div>
        </div>
      </div>
      <div
        className='my-5 px-[10px] pt-[10px] rounded-[10px] bg-white mx-auto'
        style={{
          boxShadow: '0 5px 15px 0 rgba(0,0,0,0.08)',
        }}
      >
        <Image
          alt=''
          src='https://pic.leetcode-cn.com/be2ed6d9755ad60d610b687e58d634776f6e5d61a8e06f05272572b888e9d7b6-bao.jpg'
          width={280}
          height={200}
        ></Image>
        <div className='flex items-center justify-between mt-3'>
          <div>
            <div className='mb-1 text-[#3b82f67f]'>力扣极客双肩包</div>
            <div className='text-xs' style={{ color: 'grey' }}>
              USB 充电、防泼水、大容量
            </div>
          </div>
          <div className='flex items-center rounded-md px-2 py-1 bg-[#5cb85c] text-white'>
            <div>前往购买</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default SaleList
