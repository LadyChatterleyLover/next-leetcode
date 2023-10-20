import { useEffect } from 'react'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Author2, LeetBook } from '@/app/types'
import Image from 'next/image'
import { Spin } from 'antd'

interface Props {
  slug: string
}
const HotBooks: React.FC<Props> = ({ slug }) => {
  const state = useReactive<{
    hotBooks: LeetBook[]
  }>({
    hotBooks: [],
  })

  const getLeetbookHotBooks = () => {
    axios
      .post('/api/leetbookHotBooks', {
        slug,
      })
      .then(res => {
        state.hotBooks = res.data.data
      })
  }

  useEffect(() => {
    getLeetbookHotBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.hotBooks.length ? (
    <div className='mt-8 mb-3'>
      <div
        className='text-lg leading-7 pb-4 text-[#262626]'
        style={{
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        热门 LeetBook
      </div>
      {state.hotBooks.map(item => {
        return (
          <div key={item.id} className='flex gap-x-3 my-4 cursor-pointer'>
            <div className='leetbookCoverImageContainer'>
              <Image alt='cover' src={item.coverImg} width={90} height={120} className='leetbookCoverImage'></Image>
            </div>
            <div className='flex flex-col'>
              <div className='flex-1'>
                <div className='text-sm text-[#262626] text-ellipsis overflow-hidden whitespace-nowrap'>
                  {item.title}
                </div>
                <div className='text-xs line-clamp-2 mt-3 text-[#595959]'>
                  <div>
                    {(item.author as Author2).realName}· {(item.author as Author2).title}
                  </div>
                </div>
              </div>
              <div className='text-xs'>{item.totalStudied}人已读</div>
            </div>
          </div>
        )
      })}
    </div>
  ) : (
    <Spin></Spin>
  )
}

export default HotBooks
