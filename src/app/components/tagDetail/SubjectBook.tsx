'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Book } from '@/app/types'
import BookContainer from './BookContainer'

const SubjectBook = ({ slug }: { slug: string }) => {
  const [bookList, setBookList] = useState<Book[]>([])

  const getSubjectBook = useCallback(() => {
    axios
      .post('/api/subjectBooks', {
        slug,
      })
      .then(res => {
        setBookList(res.data.data)
      })
  }, [slug])

  useEffect(() => {
    getSubjectBook()
  }, [getSubjectBook])

  return bookList.length && <BookContainer bookList={bookList}></BookContainer>
}

export default SubjectBook
