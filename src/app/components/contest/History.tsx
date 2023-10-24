'use client'
import { Contests } from '@/app/types'
import { NodeExpandOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Pagination, Tooltip } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useEffect } from 'react'

const History = () => {
  const state = useReactive<{
    contestsList: Contests[]
    pageNum: number
    pageSize: number
    total: number
  }>({
    contestsList: [],
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  const getHistoryList = () => [
    axios
      .post('/api/contestHistory', {
        pageNum: state.pageNum,
        pageSize: state.pageSize,
      })
      .then(res => {
        const data = res.data.data
        state.total = data.totalNum
        state.contestsList = data.contests
        console.log('data', data)
      }),
  ]

  const formatTime = (n: string) => {
    const arr = n.split('.')
    const res = (Number(arr[1]) * 60) / 10
    return res
  }

  useEffect(() => {
    getHistoryList()
  }, [])

  return (
    <div
      className='rounded-[20px] h-[853px]'
      style={{
        boxShadow: '0 0 50px 0 rgba(0,0,0,0.15)',
      }}
    >
      <div className='pt-8 relative' style={{ borderBottom: '1px solid #eee' }}>
        <div className='px-5 leading-10 font-[600] text-3xl'>往届竞赛回顾</div>
        <div className='text-[#afafaf] leading-[18px] text-sm px-5 mt-1 mb-8'>参加虚拟竞赛，为排位赛做好充足准备</div>
        <div
          className='flex justify-center items-center cursor-pointer w-[60px] h-[60px] bg-white rounded-[30px] absolute bottom-[-20px] right-[10px]'
          style={{ border: '1px solid #ddd', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
        >
          <NodeExpandOutlined style={{ color: '#ba2bba', fontSize: 30 }} />
        </div>
      </div>
      <div
        className='bg-white h-8 flex items-center relative z-10'
        style={{ boxShadow: '0 3px 3px 0 rgba(0,0,0,0.08)' }}
      >
        <div className='flex-1 py-1 pl-5 '>
          <div className='flex items-center gap-x-2 font-bold text-sm'>
            <div>以往竞赛</div>
            <Tooltip title='时间和日期会自动根据你本地设备上的设置改变' className='cursor-pointer'>
              <QuestionCircleOutlined />
            </Tooltip>
          </div>
        </div>
        <div className='flex-1'>
          <div className='flex items-center gap-x-2 font-bold text-sm'>
            <div>时长</div>
          </div>
        </div>
      </div>
      {state.contestsList.length ? (
        <>
          {state.contestsList.map(item => {
            return (
              <div
                key={item.title}
                className='flex items-center px-5 py-1 h-[60px]'
                style={{ borderBottom: '1px solid #ddd' }}
              >
                <div className='flex-1 flex items-center gap-x-2'>
                  <div className='text-sm'>
                    <div>{item.title}</div>
                    <div className='text-xs'>{dayjs(item.startTime).format('YYYY-MM-DD HH:mm')}</div>
                  </div>
                  {item.company.watermark ? (
                    <Image alt='' src={item.company.watermark} width={120} height={60}></Image>
                  ) : null}
                </div>
                <div className='flex-1 flex justify-between items-center pl-4'>
                  <div className='text-sm' style={{ color: 'grey' }}>
                    {Math.floor(item.duration / 3600)}时{formatTime(String(item.duration / 3600))}分
                  </div>
                </div>
              </div>
            )
          })}
        </>
      ) : null}
      <div className='flex justify-end mt-8'>
        <Pagination
          current={state.pageNum}
          total={state.total}
          showSizeChanger={false}
          onChange={(page, size) => {
            state.pageNum = page
            state.pageSize = size
            getHistoryList()
          }}
        ></Pagination>
      </div>
    </div>
  )
}

export default History
