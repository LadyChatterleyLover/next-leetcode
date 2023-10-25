'use client'

import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader

interface Ad {
  image: string
  isTagShown: boolean
  link: string
  name: string
  __typename: string
}

const settings = {
  autoPlay: true,
  infiniteLoop: true,
  showArrows: false,
  showThumbs: false,
}

const Ads = () => {
  const state = useReactive<{
    adList: Ad[]
  }>({
    adList: [],
  })

  const getAds = () => {
    axios.get('/api/advertisementAds').then(res => {
      state.adList = res.data.data
    })
  }

  useEffect(() => {
    getAds()
  }, [])

  return (
    <div className='flex gap-x-5'>
      <div className='flex cursor-pointer'>
        <div
          className='w-[490px] h-[114px] flex m-2 items-center rounded-xl p-4 relative'
          style={{
            background: 'url(https://static.leetcode.cn/cn-mono-assets/production/assets/custom-01.ae58640a.png)',
          }}
        >
          <div className='flex items-center text-white text-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='1em'
              height='1em'
              fill='currentColor'
              className='w-[50px] h-[50px] mr-3'
            >
              <path
                fillRule='evenodd'
                d='M12 4a9 9 0 110 18 9 9 0 010-18zm0 2a7 7 0 100 14 7 7 0 000-14zm0 1.634a1 1 0 01.993.883l.007.117-.001 3.774 2.111 1.162a1 1 0 01.445 1.253l-.05.105a1 1 0 01-1.254.445l-.105-.05-2.628-1.447a1 1 0 01-.51-.756L11 13V8.634a1 1 0 011-1zM16.235 2.4a1 1 0 011.296-.269l.105.07 4 3 .095.08a1 1 0 01-1.19 1.588l-.105-.069-4-3-.096-.081a1 1 0 01-.105-1.319zM7.8 2.4a1 1 0 01-.104 1.319L7.6 3.8l-4 3a1 1 0 01-1.296-1.518L2.4 5.2l4-3a1 1 0 011.4.2z'
                clipRule='evenodd'
              ></path>
            </svg>
            来参加一场「模拟面试」
          </div>
          <div className='text-white text-2xl absolute bottom-5 right-5'>
            <ArrowRightOutlined />
          </div>
        </div>
        {state.adList.length ? (
          <div className='w-[490px] h-[114px] flex m-2 items-center rounded-xl p-4'>
            <Carousel {...settings}>
              {state.adList.map(item => {
                return (
                  <div
                    key={item.link}
                    onClick={() => {
                      window.open(item.link, '_blank')
                    }}
                  >
                    <Image src={item.image} alt='' width={490} height={114} className='rounded-xl'></Image>
                  </div>
                )
              })}
            </Carousel>
          </div>
        ) : (
          <Spin></Spin>
        )}
      </div>
    </div>
  )
}

export default Ads
