'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { PicCardItem } from '@/app/types'
import { Spin, Statistic } from 'antd'
import dayjs from 'dayjs'
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons'

const { Countdown } = Statistic

const PicCard = () => {
  const state = useReactive<{
    picCardList: PicCardItem[]
  }>({
    picCardList: [],
  })

  const getPicCardList = () => {
    axios.get('/api/contestUpcomingContests').then(res => {
      state.picCardList = res.data.data
      console.log('res', res.data.data)
    })
  }

  useEffect(() => {
    getPicCardList()
  }, [])

  return state.picCardList.length ? (
    <div className='flex justify-center md:w-[750px] lg:w-[1170px] xl:w-[1500px] xl:pl-[150px] xl:pr-[150px]'>
      <div className='w-full'>
        <div className='w-full mx-[-15px] mt-[-80px] flex justify-center gap-x-5'>
          {state.picCardList.map(item => {
            return (
              <div
                key={item.titleSlug}
                className='relative p-4 flex-1 rounded-[20px]'
                style={{
                  backgroundImage: `url(${item.cardImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'right',
                }}
              >
                <div className='px-5 pt-5 flex flex-col gap-y-3' style={{ color: '#fff' }}>
                  <div className='font-bold text-3xl'>{item.title}</div>
                  <div className='flex items-center gap-x-1'>
                    <div>中国时间:</div>
                    <div>
                      {dayjs()
                        .add(item.startTime / 1000 / 60, 'seconds')
                        .format('YYYY-MM-DD / HH:mm')}
                    </div>
                    <div>~</div>
                    <div>
                      {dayjs()
                        .add(item.startTime / 1000 / 60, 'seconds')
                        .add(item.duration, 'seconds')
                        .format('YYYY-MM-DD / HH:mm')}
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2 text-sm mt-2 mb-[100px]'>
                    <CalendarOutlined style={{ fontSize: 14 }}></CalendarOutlined>
                    <div>添加到日程表</div>
                  </div>
                  <div className='flex items-center gap-x-3 text-sm'>
                    <FieldTimeOutlined />
                    <div>距离开始还有:</div>
                    <div>
                      <Countdown
                        valueStyle={{
                          fontSize: 14,
                          color: '#fff',
                        }}
                        value={dayjs().add(item.startTime).valueOf()}
                        format='D 天 H 时 m 分 s 秒'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default PicCard
