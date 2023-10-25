'use client'

import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import Action from '@/app/components/discuss/Action'
import ColumnsTag from '@/app/components/discuss/ColumnsTag'
import Trend from '@/app/components/discuss/Trend'
import MustRead from '@/app/components/discuss/MustRead'
import PicCard from '@/app/components/discuss/PicCard'
import QaList from '@/app/components/discuss/QaList'
import { ColumnsTagItem, DiscussItem } from '@/app/types'

const Discuss = () => {
  const state = useReactive<{
    columnsTagList: ColumnsTagItem[]
    contentType: string
    subjectSlug: string
    discussList: DiscussItem[]
    isFeatured: boolean
    query: string
    tags: string[]
    sortType: string
  }>({
    columnsTagList: [],
    contentType: 'Q_AND_A',
    discussList: [],
    subjectSlug: 'interview',
    isFeatured: false,
    query: '',
    tags: [],
    sortType: 'HOTTEST',
  })

  const getColumnsTag = () => {
    axios
      .post('/api/columnsRecommendedTags', {
        contentType: state.contentType,
        subjectSlug: state.subjectSlug,
      })
      .then(res => {
        const data = res.data.data
        state.columnsTagList = data.slice(0, 8)
      })
  }

  const setTrend = (sort: string, feat: boolean) => {
    state.sortType = sort
    state.isFeatured = feat
  }

  const setSlug = (slug: string) => {
    state.subjectSlug = slug
  }

  const setQuery = (val: string) => {
    state.query = val
  }

  useEffect(() => {
    getColumnsTag()
  }, [state.subjectSlug, state.query])

  return (
    <div className='w-full h-full bg-[#f7f8fa]'>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px] '>
        <div className='flex gap-x-5'>
          <div className='flex-1'>
            <PicCard setSlug={setSlug}></PicCard>
            <Trend setTrend={setTrend} setQuery={setQuery}></Trend>
            <ColumnsTag columnsTagList={state.columnsTagList}></ColumnsTag>
            <QaList
              subjectSlug={state.subjectSlug}
              sortType={state.sortType}
              isFeatured={state.isFeatured}
              tags={state.tags}
              query={state.query}
            ></QaList>
          </div>
          <div className='w-[256px] flex flex-col gap-y-5'>
            <Action></Action>
            <MustRead></MustRead>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discuss
