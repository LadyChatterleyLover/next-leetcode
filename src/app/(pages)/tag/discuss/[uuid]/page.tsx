'use client'

import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useReactive } from 'ahooks'
import { DiscussItem } from '@/app/types'
import axios from 'axios'

import DiscussComment from '@/app/components/tagDetail/DiscussComment'
import DiscussDetail from '@/app/components/tagDetail/DiscussDetail'
import DiscussBook from '@/app/components/tagDetail/DiscussBook'
import QaBriefHotQuestions from '@/app/components/tagDetail/QaBriefHotQuestions'
import DiscussAssociation from '@/app/components/tagDetail/DiscussAssociation'

const DiscussCircle = () => {
  const params = useParams()

  const uuid = useMemo(() => {
    return params.uuid as string
  }, [params])

  const state = useReactive<{
    detail: DiscussItem | null
  }>({
    detail: null,
  })

  const getDetail = () => {
    axios
      .post('/api/discussDetail', {
        uuid,
      })
      .then(res => {
        state.detail = res.data.data
      })
  }

  useEffect(() => {
    getDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex gap-x-5 w-full'>
      <div className='w-[800px]'>
        <DiscussDetail detail={state.detail!}></DiscussDetail>
        <DiscussComment uuid={uuid} detail={state.detail!}></DiscussComment>
      </div>
      <div className='w-[260px] flex flex-col gap-y-3'>
        <DiscussAssociation detail={state.detail!}></DiscussAssociation>
        <QaBriefHotQuestions></QaBriefHotQuestions>
        <DiscussBook uuid={uuid}></DiscussBook>
      </div>
    </div>
  )
}

export default DiscussCircle
