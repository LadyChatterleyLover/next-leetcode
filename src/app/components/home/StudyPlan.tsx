'use client'

import { useCallback, useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { Spin } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import Image from 'next/image'

interface Plan {
  cover: string
  finishedQuestionNum: number | null
  highlight: string
  name: string
  premiumOnly: boolean
  questionNum: number
  slug: string
}

const StudyPlan = () => {
  const state = useReactive<{
    studyPlanList: Plan[]
  }>({
    studyPlanList: [],
  })

  const getStudyPlan = useCallback(() => {
    axios.get('/api/studyPlanHome').then(res => {
      state.studyPlanList = res.data.data
      console.log('res', res.data.data)
    })
  }, [state])

  useEffect(() => {
    getStudyPlan()
  }, [getStudyPlan])

  return state.studyPlanList.length ? (
    <div>
      <div className='flex gap-x-1 cursor-pointer'>
        <div className='text-black font-[600]'>学习计划</div>
        <RightOutlined style={{ color: '#949494', fontSize: 12 }} />
      </div>
      <div className='flex gap-x-3 mt-4'>
        {state.studyPlanList.map((item, index) => {
          return (
            <div
              key={index}
              className='relative flex cursor-pointer items-start rounded p-2 transition-all duration-300 bg-[#0000000a]  hover:bg-[#0000000f]'
            >
              <Image alt='cover' src={item.cover} width={72} height={72} className='mr-4'></Image>
              <div className='flex flex-col gap-y-3'>
                <div>{item.name}</div>
                <div className='text-xs leading-4 line-clamp-2 text-[#52525299]'>{item.highlight}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default StudyPlan
