import { useReactive } from 'ahooks'
import BookContainer from './BookContainer'
import { Book } from '@/app/types'
import axios from 'axios'
import { useEffect } from 'react'

interface Props {
  uuid: string
}

const DiscussBook: React.FC<Props> = ({ uuid }) => {
  const state = useReactive<{
    bookList: Book[]
  }>({
    bookList: [],
  })

  const getBookList = () => {
    axios
      .post('/api/recommendedContents', {
        uuid,
      })
      .then(res => {
        state.bookList = res.data.data
      })
  }

  useEffect(() => {
    getBookList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <BookContainer bookList={state.bookList} title='LeetBook 推荐'></BookContainer>
}

export default DiscussBook
