'use client'

import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { HomeFeedCompanies, HomeFeedPlainContents, HomeFeedProblems } from '@/app/types'
import { Avatar, Divider, Skeleton, Spin } from 'antd'
import Image from 'next/image'
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  RightOutlined,
} from '@ant-design/icons'

interface Props {
  currentId: number | string
}

const PlanList: React.FC<Props> = ({ currentId }) => {
  const state = useReactive<{
    homeFeedCompanies: HomeFeedCompanies[]
    homeFeedPlainContents: HomeFeedPlainContents[]
    homeFeedProblems: HomeFeedProblems | null
  }>({
    homeFeedCompanies: [],
    homeFeedPlainContents: [],
    homeFeedProblems: null,
  })

  const getPlanList = () => {
    axios
      .post('/api/homePageFeeds', {
        channelId: currentId,
      })
      .then(res => {
        const data = res.data.data
        state.homeFeedCompanies = data.homeFeedCompanies.companies
        state.homeFeedPlainContents = [...state.homeFeedPlainContents, ...data.homeFeedPlainContents.items]
        state.homeFeedProblems = data.homeFeedProblems
      })
  }

  const renderStatus = (status: string) => {
    if (!status) {
      return <div></div>
    }
    if (status.toUpperCase() === 'AC') {
      return <div className='text-sm text-[30000008c]'>已解答</div>
    } else if (status.toUpperCase() === 'TRIED') {
      return <div className='text-sm text-[30000008c]'>尝试过</div>
    } else {
      return <div className='text-sm text-[30000008c]'>未完成</div>
    }
  }

  const renderStatusIcon = (status: string) => {
    if (!status) {
      return <div></div>
    }
    if (status.toUpperCase() === 'AC') {
      return <CheckCircleOutlined style={{ color: '#15BD66' }} />
    } else if (status.toUpperCase() === 'TRIED') {
      return <ExclamationCircleOutlined style={{ color: '#FFB800' }} />
    } else {
      return <MinusCircleOutlined style={{ color: '#ff2d55' }} />
    }
  }

  useEffect(() => {
    getPlanList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.homeFeedPlainContents.length ? (
    <div
      className='mt-8'
      id='scrollableDiv'
      style={{
        overflowY: 'auto',
        padding: '0 16px',
        height: '900px',
      }}
    >
      <InfiniteScroll
        dataLength={state.homeFeedPlainContents.length}
        next={getPlanList}
        hasMore={state.homeFeedPlainContents.length > 0}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>已经到底啦 🤐</Divider>}
        scrollableTarget='scrollableDiv'
      >
        {state.homeFeedPlainContents.map((item, index) => {
          return (
            <>
              <div key={index} className='flex gap-x-2  cursor-pointer'>
                <Avatar size={28} src={item.authorAvatarUrl}></Avatar>
                <div className='flex flex-col gap-2 flex-1'>
                  <div className='text-sm text-[#0000008c]'>{item.authorNickname}</div>
                  <div className='hover:text-[#40a9ff] font-bold'>{item.contentTitle}</div>
                  <div
                    className='line-clamp-2 text-[#0000008c] text-sm'
                    style={{ wordBreak: 'break-all' }}
                    dangerouslySetInnerHTML={{ __html: item.contentSummary }}
                  ></div>
                </div>
                {item.contentCoverUrl ? (
                  <Image src={item.contentCoverUrl} alt='contentCoverUrl' width={146} height={88}></Image>
                ) : null}
              </div>
              <Divider></Divider>
            </>
          )
        })}
        <div className='flex gap-x-3'>
          <div className='flex items-start mt-3'>
            {renderStatusIcon(state.homeFeedProblems?.recommendationReason as string)}
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <div>
                <div>{renderStatus(state.homeFeedProblems?.recommendationReason as string)}</div>
                <div className='mb-2'>{state.homeFeedProblems?.problemTitle}</div>
              </div>
              <div className='flex items-center text-sm text-[#00000057] cursor-pointer'>
                <div>更多</div>
                <RightOutlined></RightOutlined>
              </div>
            </div>
            <div className='flex gap-x-3'>
              {state.homeFeedProblems?.solutions.map(solution => {
                return (
                  <div key={solution.id} className='flex flex-col gap-y-2 bg-[#00000005] p-2 cursor-pointer'>
                    <div className='flex items-center gap-x-2'>
                      <Avatar src={solution.authorAvatarUrl} size={16}></Avatar>
                      <div className='text-xs text-[#00000057]'>{solution.title}</div>
                    </div>
                    <div
                      className='line-clamp-2 text-[#0000008c] text-sm'
                      style={{ wordBreak: 'break-all' }}
                      dangerouslySetInnerHTML={{ __html: solution.summary }}
                    ></div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Divider></Divider>
        <div className='flex gap-x-3 mt-5'>
          <Image
            src='https://static.leetcode-cn.com/cn-frontendx-assets/production/_next/static/images/luggage-6033c5d9c5536b8d7d4f27cf89a2aa40.png'
            alt=''
            width={28}
            height={28}
          ></Image>
          <div className='flex flex-col gap-y-3 w-full'>
            <div className='flex items-center justify-between'>
              <div className='font-bold'>名企面试题</div>
              <div className='flex items-center text-sm text-[#00000057] cursor-pointer'>
                <div>更多</div>
                <RightOutlined></RightOutlined>
              </div>
            </div>
            <div className='flex gap-3 flex-wrap'>
              {state.homeFeedCompanies.map(item => {
                return (
                  <div
                    key={item.slug}
                    className='mx-2 inline-block h-[80px] w-[160px] cursor-pointer rounded-lg p-3  bg-[#0000000a] hover:bg-[#0000000f]'
                  >
                    <div className='flex items-center gap-x-3 mb-5'>
                      <Image alt='logo' src={item.logoUrl} width={24} height={24}></Image>
                      <div className='text-sm'>{item.name}</div>
                    </div>
                    <div className='flex items-center gap-x-3 text-xs'>
                      <div className='text-[#0000008c]'>热门指数</div>
                      <div className='flex gap-x-1 items-center'>
                        <div>{item.popularity}</div>
                        {item.trending === 1 ? (
                          <CaretUpOutlined style={{ fontSize: 12, color: 'red' }}></CaretUpOutlined>
                        ) : (
                          <CaretDownOutlined style={{ fontSize: 12, color: 'green' }}></CaretDownOutlined>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Divider></Divider>
      </InfiniteScroll>
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default PlanList
