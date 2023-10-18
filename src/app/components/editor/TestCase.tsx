import { useCallback, useEffect, useMemo, useState } from 'react'
import Fullscreen from './Fullscreen'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { localSet } from '@/app/utils/storage'

const TestCase = () => {
  const searchParams = useSearchParams()
  const titleSlug = useMemo(() => {
    return searchParams.get('slugTitle')
  }, [searchParams])

  const [jsonExampleTestcases, setJsonExampleTestcases] = useState<string[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [params, setParams] = useState([])

  const getExampleTestcases = () => {
    axios
      .post('/api/exampleTestcases', {
        titleSlug,
      })
      .then(res => {
        const data = res.data.data
        let allParams = JSON.parse(data.metaData).params
        let cases = JSON.parse(data.jsonExampleTestcases)
        cases = cases.map((item: string) => {
          return item.split('\n')
        })
        localSet('questionParams', allParams)
        setJsonExampleTestcases(JSON.parse(data.jsonExampleTestcases))
        setParams(allParams)
      })
  }

  useEffect(() => {
    getExampleTestcases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const caseList = useMemo(() => {
    const cases = jsonExampleTestcases.map((item: string) => {
      return item.split('\n')
    })
    const list = params.map((item: { name: string }, index: number) => ({
      name: item.name,
      content: cases[activeIndex][index],
    }))

    return list
  }, [activeIndex, jsonExampleTestcases, params])

  return (
    <>
      <div className='flex-1 flex justify-between w-full'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 14 14'
              width='1em'
              height='1em'
              fill='currentColor'
              className='h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-[#01b328]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.1 5.6L5.968 8.4 4.9 7.445M12.6 3.5v7a2.1 2.1 0 01-2.1 2.1h-7a2.1 2.1 0 01-2.1-2.1v-7c0-1.16.94-2.1 2.1-2.1h7c1.16 0 2.1.94 2.1 2.1z'
              ></path>
            </svg>
            <div className='text-xs ml-1'>测试用例</div>
          </div>
        </div>
        <Fullscreen></Fullscreen>
      </div>
      <div className='flex items-center gap-x-2 mb-5'>
        {jsonExampleTestcases.map((_, index) => {
          return (
            <div
              key={index}
              className={`
              font-medium
              items-center
              cursor-pointer
              whitespace-nowrap
              inline-flex
            hover:bg-[#000a200d]
              relative
              rounded-lg px-4 py-1
            hover:text-[#262626]
              ${activeIndex === index ? 'bg-[#000a200d]' : 'bg-[#fff]'}
              ${activeIndex === index ? 'text-[#262626]' : 'text-[#262626bf]'}
              `}
              onClick={() => {
                setActiveIndex(index)
              }}
            >
              Case {index + 1}
            </div>
          )
        })}
      </div>
      {caseList.map((item, index) => {
        return (
          <div key={index} className='flex h-full w-full flex-col space-y-2 mb-5'>
            <div className='text-xs font-medium text-[#3c3c4399]'>{item.name} = </div>
            <div
              className='font-menlo w-full cursor-text rounded-lg border px-3 py-[10px] bg-[#000a200d] border-transparent'
              contentEditable
              placeholder='请输入测试用例'
              autoCorrect='off'
              autoCapitalize='off'
              suppressContentEditableWarning
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TestCase
