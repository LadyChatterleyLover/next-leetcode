'use client'

import { LocalRank, GlobalRank } from '@/app/types'
import { DribbbleOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Button, Checkbox, Spin } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Rank = () => {
  const router = useRouter()

  const state = useReactive<{
    flag: boolean
    localRangList: LocalRank[]
    globalRangList: GlobalRank[]
    total: number
  }>({
    flag: false,
    localRangList: [],
    globalRangList: [],
    total: 0,
  })

  const getLocalRangList = () => {
    axios
      .post('/api/localRanking', {
        pageNum: 1,
      })
      .then(res => {
        const data = res.data.data
        state.total = data.totalUsers
        state.localRangList = data.rankingNodes
      })
  }

  const getGlobalRangList = () => {
    axios
      .post('/api/globalRanking', {
        pageNum: 1,
      })
      .then(res => {
        const data = res.data.data
        state.total = data.totalUsers
        state.globalRangList = data.rankingNodes
      })
  }

  useEffect(() => {
    getLocalRangList()
  }, [])

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-x-5'>
          {!state.flag ? (
            <Image
              alt=''
              src='https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/china_map.e6e137c72.svg'
              width={62}
              height={50}
            ></Image>
          ) : (
            <DribbbleOutlined style={{ fontSize: 30, color: '#bdc3c7' }} />
          )}
          <div className='flex items-center text-3xl h-[65px] font-[600] text-[#bdc3c7] pl-1'>
            {!state.flag ? '全国排名' : '全球排名'}
          </div>
        </div>
        <Checkbox
          onChange={e => {
            state.flag = e.target.checked
            state.flag ? getGlobalRangList() : getLocalRangList()
          }}
        >
          {!state.flag ? '显示全球' : '显示全国'}
        </Checkbox>
      </div>
      {(state.localRangList.length && !state.flag) || (state.flag && state.globalRangList.length) ? (
        <div>
          <div className='flex flex-col justify-center items-center relative'>
            <div className='rounded-full p-1' style={{ background: 'linear-gradient(#feea88, #d7a807)' }}>
              <Image
                alt=''
                src={
                  state.flag ? state.globalRangList[0].user.profile.userAvatar : state.localRangList[0].user.userAvatar
                }
                width={90}
                height={90}
                className='rounded-full'
              ></Image>
            </div>
            <div
              className='absolute py-1 px-2 text-sm text-[#ffa116] max-w-[100px] text-ellipsis whitespace-pre bg-white opacity-90 rounded bottom-[-16px]'
              style={{
                boxShadow: '0 5px 15px 0 rgba(0,0,0,0.08)',
              }}
            >
              {state.flag ? state.globalRangList[0].user.username : state.localRangList[0].user.realName}
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col justify-center items-center relative'>
              <div className='rounded-full p-1' style={{ background: 'linear-gradient(white, #ababab)' }}>
                <Image
                  alt=''
                  src={
                    state.flag
                      ? state.globalRangList[1].user.profile.userAvatar
                      : state.localRangList[1].user.userAvatar
                  }
                  width={90}
                  height={90}
                  className='rounded-full'
                ></Image>
              </div>
              <div
                className='absolute py-1 px-2 text-sm text-[#ffa116]  max-w-[100px] text-ellipsis whitespace-pre bg-white opacity-90 rounded bottom-[-16px]'
                style={{
                  boxShadow: '0 5px 15px 0 rgba(0,0,0,0.08)',
                }}
              >
                {state.flag ? state.globalRangList[1].user.username : state.localRangList[1].user.realName}
              </div>
            </div>
            <div className='flex flex-col justify-center items-center relative'>
              <div className='rounded-full p-1' style={{ background: 'linear-gradient(#facfa3, #d77c44)' }}>
                <Image
                  alt=''
                  src={
                    state.flag
                      ? state.globalRangList[2].user.profile.userAvatar
                      : state.localRangList[2].user.userAvatar
                  }
                  width={90}
                  height={90}
                  className='rounded-full'
                ></Image>
              </div>
              <div
                className='absolute py-1 px-2 text-sm text-[#ffa116]  max-w-[100px] text-ellipsis whitespace-pre bg-white opacity-90 rounded bottom-[-16px]'
                style={{
                  boxShadow: '0 5px 15px 0 rgba(0,0,0,0.08)',
                }}
              >
                {state.flag ? state.globalRangList[2].user.username : state.localRangList[2].user.realName}
              </div>
            </div>
          </div>
          <div
            className='mt-10 bg-[#fafafa] rounded-[20px]'
            style={{
              boxShadow: '0 0 50px 0 rgba(0,0,0,0.15)',
            }}
          >
            {state.flag
              ? state.globalRangList.slice(3, 10).map((item, index) => {
                  return (
                    <div key={index} className='px-5'>
                      <div className='flex items-center h-[62px] gap-x-4'>
                        <div>{index + 4}</div>
                        <Image
                          alt=''
                          src={item.user.profile.userAvatar}
                          width={30}
                          height={30}
                          className='rounded-full'
                        ></Image>
                        <div className='flex-1'>
                          <div className='text-xs text-[#ffa116] mb-1'>{item.user.username}</div>
                          <div className='text-xs' style={{ color: 'grey' }}>
                            已经参加{item.ranking.split('').length}次竞赛
                          </div>
                        </div>
                      </div>
                      <div className='h-[1px] bg-[#eee] w-full'></div>
                    </div>
                  )
                })
              : state.localRangList.slice(3, 10).map((item, index) => {
                  return (
                    <div key={index} className='px-5'>
                      <div className='flex items-center h-[62px] gap-x-4'>
                        <div>{index + 4}</div>
                        <Image
                          alt=''
                          src={item.user.userAvatar}
                          width={30}
                          height={30}
                          className='rounded-full'
                        ></Image>
                        <div className='flex-1'>
                          <div className='text-xs text-[#ffa116] mb-1'>{item.user.realName}</div>
                          <div className='text-xs' style={{ color: 'grey' }}>
                            已经参加{item.attendedContestCount}次竞赛
                          </div>
                        </div>
                      </div>
                      <div className='h-[1px] bg-[#eee] w-full'></div>
                    </div>
                  )
                })}
            <div className='flex justify-center items-center h-[80px]'>
              <Button
                type='link'
                onClick={() => {
                  router.push(`/contest/${!state.flag ? 'local' : 'global'}`)
                }}
              >
                显示更多
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Spin></Spin>
      )}
    </div>
  )
}

export default Rank
