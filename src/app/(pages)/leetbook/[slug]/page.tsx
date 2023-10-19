'use client'

import BookInfo from '@/app/components/leetbook/BookInfo'
import { LeetBook } from '@/app/types'
import { useReactive } from 'ahooks'
import axios from 'axios'

import { useParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const LeetBookDetail = () => {
  const params = useParams()

  const slug = useMemo(() => {
    return params.slug as string
  }, [params])

  const state = useReactive<{
    bookDetail: LeetBook | null
  }>({
    bookDetail: null,
  })

  const getBookDetail = () => {
    axios
      .post('/api/leetbookBookDetail', {
        slug,
      })
      .then(res => {
        const data = res.data.data
        state.bookDetail = data
        console.log('data', data)
      })
  }

  useEffect(() => {
    getBookDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <BookInfo bookDetail={state.bookDetail!}></BookInfo>
    </>
  )
}

export default LeetBookDetail
