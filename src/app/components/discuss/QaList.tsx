'use client'

import { useEffect } from 'react'
import axios from 'axios'

const QaList = () => {
  const getQaList = () => {
    axios
      .post('/api/qaQuestionList', {
        subjectSlug: 'interview',
        isFeatured: false,
        pageNum: 0,
        query: '',
        tags: [],
        sortType: 'HOTTEST',
      })
      .then(res => {
        const data = res.data.data
        console.log('res', data)
      })
  }

  useEffect(() => {
    getQaList()
  }, [])
  return <div className="mt-5">QaList</div>
}

export default QaList
