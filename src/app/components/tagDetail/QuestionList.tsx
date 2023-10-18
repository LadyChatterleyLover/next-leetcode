import { useEffect, useState } from 'react'
import axios from 'axios'
import { ProblemDetail } from '@/app/types'

const QuestionList = ({ slug }: { slug: string }) => {
  const [list, setList] = useState([])

  const getProblemList = () => {
    axios.get('/api/tagQuestionList').then(res => {
      const data: ProblemDetail[] = res.data.data
      const arr = data.filter((item: any) => item.topicTags.find((i: any) => i.slug === slug))
      console.log('arr', arr)
    })
  }

  useEffect(() => {
    getProblemList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className='mt-5'>QuestionList</div>
}

export default QuestionList
