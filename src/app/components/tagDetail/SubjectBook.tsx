'use client'

import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

interface Book {
  coverImg: string
  slug: string
  title: string
  totalStudied: number
  __typename: string
  commonTags: {
    imgUrl: string | null
    nameTranslated: string
    name: string
    slug: string
    __typename: string
  }[]
}

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

  return (
    bookList.length && (
      <div
        className='bg-white px-3 py-4 rounded-lg w-[260px]'
        style={{ boxShadow: '0 2px 8px rgba(0,0,0, 0.08),0 1px 2px rgba(0,0,0, 0.1)' }}
      >
        {bookList.map(item => {
          return (
            <div key={item.slug} className='mb-6'>
              <div className='flex'>
                <div>
                  <Image alt='pic' src={item.coverImg} width={60} height={80}></Image>
                </div>
                <div className='ml-5 flex flex-col'>
                  <div className='text-[#262626] text-sm leading-5 font-500 overflow-ellipsis overflow-hidden whitespace-pre'>
                    {item.title}
                  </div>
                  <div className='my-4 flex'>
                    {item.commonTags.slice(0, 2).map(tag => {
                      return (
                        <div
                          key={tag.name}
                          className='text-xs mr-2 leading-5 px-2 text-[#3c3c4399] bg-[#000a200c] rounded-[10px] whitespace-nowrap'
                        >
                          {tag.nameTranslated}
                        </div>
                      )
                    })}
                  </div>
                  <div className='text-xs leading-5 text-[#3c3c4399]'>{item.totalStudied}人已读</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  )
}

export default SubjectBook
