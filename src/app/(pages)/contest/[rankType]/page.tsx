'use client'

import { GlobalRank, LocalRank } from '@/app/types'
import { CaretLeftOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Avatar, Checkbox, List, Pagination } from 'antd'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RankDetail = () => {
  const params = useParams()
  const router = useRouter()

  const state = useReactive<{
    localRangList: LocalRank[]
    globalRangList: GlobalRank[]
    total: number
    rankType: string
    flag: boolean
    current: number
    pageSize: number
    loading: boolean
  }>({
    localRangList: [],
    globalRangList: [],
    total: 0,
    rankType: '',
    flag: false,
    current: 1,
    pageSize: 0,
    loading: false,
  })

  const getLocalRangList = () => {
    state.loading = true
    axios
      .post('/api/localRanking', {
        pageNum: state.current,
      })
      .then(res => {
        const data = res.data.data
        state.total = data.totalUsers
        state.pageSize = data.userPerPage
        state.localRangList = data.rankingNodes
        console.log('data', data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  const getGlobalRangList = () => {
    state.loading = true
    axios
      .post('/api/globalRanking', {
        pageNum: state.current,
      })
      .then(res => {
        const data = res.data.data
        state.total = data.totalUsers
        state.pageSize = data.userPerPage
        state.globalRangList = data.rankingNodes
      })
      .finally(() => {
        state.loading = false
      })
  }

  useEffect(() => {
    state.rankType = params.rankType as string
    state.flag = state.rankType === 'local'
    state.flag ? getLocalRangList() : getGlobalRangList()
  }, [])

  return (
    <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px] bg-white'>
      <div
        className='flex items-center  text-[#afafaf] gap-x-1 hover:text-[#1890ff] cursor-pointer'
        onClick={() => {
          router.back()
        }}
      >
        <CaretLeftOutlined />
        <div>返回竞赛主页</div>
      </div>
      <div className='flex items-center justify-between mt-5'>
        <div className='text-3xl font-[600]'>{state.rankType === 'local' ? '全国排名' : '全球排名'}</div>
        <Checkbox
          onChange={e => {
            state.flag = e.target.checked
            state.flag ? getGlobalRangList() : getLocalRangList()
            state.rankType = state.flag ? 'global' : 'local'
          }}
        >
          显示全球
        </Checkbox>
      </div>
      <div className='my-3 text-sm flex justify-end' style={{ color: 'grey' }}>
        参赛人数: {state.total}人
      </div>
      <div className='mt-8'>
        {state.rankType === 'local' ? (
          <List
            itemLayout='horizontal'
            dataSource={state.localRangList}
            loading={state.loading}
            renderItem={item => (
              <div className='flex gap-x-5 items-center' style={{ borderBottom: '1px solid #ddd' }}>
                <div className='relative top-[-8px]'>{item.currentRatingRanking}</div>
                <div className='flex-1'>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.user.userAvatar} />}
                      title={<div>{item.user.realName}</div>}
                      description={`已经参加过${item.attendedContestCount}次竞赛`}
                    />
                  </List.Item>
                </div>
              </div>
            )}
          />
        ) : (
          <List
            itemLayout='horizontal'
            dataSource={state.globalRangList}
            loading={state.loading}
            renderItem={item => (
              <div className='flex gap-x-5 items-center' style={{ borderBottom: '1px solid #ddd' }}>
                <div className='relative top-[-8px]'>{item.currentGlobalRanking}</div>
                <div className='flex-1'>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.user.profile.userAvatar} />}
                      title={<div>{item.user.username}</div>}
                      description={`已经参加过${item.ranking.split('').length}次竞赛`}
                    />
                  </List.Item>
                </div>
              </div>
            )}
          />
        )}
      </div>
      {state.globalRangList.length || state.localRangList.length ? (
        <div className='mt-6 flex justify-end'>
          <Pagination
            showSizeChanger={false}
            current={state.current}
            pageSize={state.pageSize}
            total={state.total}
            onChange={page => {
              state.current = page
              state.rankType === 'local' ? getLocalRangList() : getGlobalRangList()
            }}
          ></Pagination>
        </div>
      ) : null}
    </div>
  )
}

export default RankDetail
