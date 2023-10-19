import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import QuestionTag from './QuestionTag'

interface Item {
  id: string
  name: string
  type: string
  questions: number[]
}

const QuestionListTag = () => {
  const [list, setList] = useState<Item[]>([])

  const getFavorites = () => {
    axios.get('/api/favorites').then(res => {
      setList(res.data.data)
    })
  }

  const content = useMemo(() => {
    if (list.length) {
      return list.map(item => {
        return (
          <div
            key={item.id}
            className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626] hover:bg-[#000a200d]'
          >
            {item.name}
          </div>
        )
      })
    } else {
      return null
    }
  }, [list])

  useEffect(() => {
    getFavorites()
  }, [])

  return <QuestionTag content={content}>题单</QuestionTag>
}

export default QuestionListTag
