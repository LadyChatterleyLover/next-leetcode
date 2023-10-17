/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { SearchOutlined, SortAscendingOutlined } from '@ant-design/icons'
import Tags from '../solution/Tags'
import { Tag } from '@/app/types'
import SolutionList from '../solution/SolutionList'

const Solution = () => {
  const searchParams = useSearchParams()
  const titleSlug = useMemo(() => {
    return searchParams.get('slugTitle')
  }, [searchParams])
  const [languageTags, setLanguageTags] = useState<Tag[]>([])
  const [otherTags, setOtherTags] = useState<Tag[]>([])

  const getTags = () => {
    axios
      .post('/api/solutionTags', {
        titleSlug,
      })
      .then(res => {
        const data = res.data.data
        setLanguageTags(data.languageTags)
        setOtherTags(data.otherTags)
      })
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      <div className='flex items-center justify-between pb-3' style={{ borderBottom: '1px solid #eee' }}>
        <div className='flex relative'>
          <div className='absolute inset-y-0 flex items-center text-[#8c8c8c] pointer-events-none left-0 pl-0.5 top-[-2px]'>
            <SearchOutlined></SearchOutlined>
          </div>
          <input
            className='block w-full rounded-md placeholder:text-[#282828bf]  border-none text-[#262626bf]  pr-3 bg-transparent py-1 pl-[22px] leading-4 focus:bg-transparent'
            style={{ outline: '2px solid #0000', outlineOffset: 2 }}
            placeholder='搜索'
          ></input>
        </div>
        <div className='flex items-center flex-1 justify-end pr-3'>
          <SortAscendingOutlined></SortAscendingOutlined>
          <div className='text-sm text-[#1a1a1abf] ml-[6px]'>排序</div>
        </div>
      </div>
      <div className='mt-3'>
        {languageTags.length || otherTags.length ? (
          <Tags languageTags={languageTags} otherTags={otherTags}></Tags>
        ) : null}
      </div>
      <div className='mt-3'>
        <SolutionList></SolutionList>
      </div>
    </>
  )
}

export default Solution
