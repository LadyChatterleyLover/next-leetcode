'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'

interface Tag {
  imgUrl: string
  name: string
  nameTranslated: string
  slug: string
  __typename: string
}

const ColumnsTag = () => {
  const state = useReactive<{
    columnsTagList: Tag[]
    contentType: string
    subjectSlug: string
  }>({
    columnsTagList: [],
    contentType: 'Q_AND_A',
    subjectSlug: 'career',
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

  useEffect(() => {
    getColumnsTag()
  }, [])

  return state.columnsTagList.length ? (
    <div className='flex items-center gap-5 my-6'>
      {state.columnsTagList.map(item => {
        return (
          <div
            key={item.slug}
            className='bg-[#000a200c] px-2 text-xs h-6 text-[#007aff] flex items-center justify-center rounded-full cursor-pointer'
          >
            {item.name}
          </div>
        )
      })}
    </div>
  ) : null
}

export default ColumnsTag
