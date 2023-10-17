import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Solution } from '@/app/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Avatar, Divider, Skeleton, Tag } from 'antd'

const SolutionList = () => {
  const searchParams = useSearchParams()
  const titleSlug = useMemo(() => {
    return searchParams.get('slugTitle')!
  }, [searchParams])
  let [skip, setSkip] = useState(0)
  const [first, setFirst] = useState(15)
  const [orderBy, setOrderBy] = useState('DEFAULT')
  const [userInput, setUserInput] = useState('')
  const [tagSlugs, setTagSlugs] = useState<string[]>([])
  const [solutionList, setSolutionList] = useState<Solution[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getSolutionList = () => {
    console.log(111)
    if (loading) {
      return
    }
    setLoading(true)
    axios
      .post('/api/solutionList', {
        titleSlug,
        skip: skip * first,
        first,
        orderBy,
        userInput,
        tagSlugs,
      })
      .then(res => {
        const data = res.data.data
        skip += 1
        setSkip(skip)
        setSolutionList([...solutionList, ...data.list])
        setTotal(data.total)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getSolutionList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    solutionList.length && (
      <div
        id='scrollableDiv'
        style={{
          overflowY: 'auto',
          padding: '0 16px',
          height: '900px',
        }}
      >
        <InfiniteScroll
          dataLength={solutionList.length}
          next={getSolutionList}
          hasMore={solutionList.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>已经到底啦 🤐</Divider>}
          scrollableTarget='scrollableDiv'
        >
          {solutionList.map(item => {
            return (
              <div key={item.uuid} className='mb-5' style={{ borderBottom: '1px solid #eee' }}>
                <div className='flex items-center'>
                  <Avatar src={item.author.profile.userAvatar} size={24} />
                  <div className='ml-3'>
                    <div className='no-underline overflow-hidden max-w-[100px] md:max-w-[200px] truncate hover:text-current text-sm leading-5 font-normal text-[#0000008c]'>
                      {item.author.username}
                    </div>
                    <div className='flex items-center'>
                      <div className='truncate text-[#262626] text-[14px] font-medium leading-5 mt-1'>{item.title}</div>
                      {item.byLeetcode ? (
                        <Tag color='#ffa116' className='ml-2'>
                          官方
                        </Tag>
                      ) : null}
                      {item.isEditorsPick ? (
                        <Tag color='#2db55d' className='ml-2'>
                          精选
                        </Tag>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className='flex w-full flex-col gap-2 overflow-hidden pl-9 my-3'>
                  <div className='leading-5 text-[#262626bf]'>
                    <div className='line-clamp-1' dangerouslySetInnerHTML={{ __html: item.summary }}></div>
                  </div>
                  <div className='flex flex-nowrap items-center gap-2 mt-2'>
                    {item.tags.map(tag => (
                      <div
                        key={tag.slug}
                        className='text-[#262626bf] bg-[#000a200d] cursor-pointer  whitespace-nowrap rounded-[20px] py-[1px] px-2 text-xs'
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <div className='flex items-center gap-6 cursor-pointer'>
                    <div className='flex items-center gap-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        className='text-[#8c8c8c]  w-[14px] h-[14px]'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10.24 5.832a2.274 2.274 0 013.517 0l7.668 9.156c.65.777.706 1.774.379 2.557C21.475 18.33 20.71 19 19.667 19H4.333c-1.044 0-1.809-.67-2.137-1.455a2.478 2.478 0 01.378-2.556l7.667-9.157zM12 7a.29.29 0 00-.225.116l-7.666 9.157a.478.478 0 00-.067.5c.07.17.185.227.292.227h15.334c.106 0 .22-.057.292-.227a.478.478 0 00-.068-.5l-7.668-9.157A.29.29 0 0012 7z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <div className='text-[#8c8c8c]  text-sm'>{(item.favoriteCount / 1000).toFixed(0)}K</div>
                    </div>
                    <div className='flex items-center gap-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        className='text-[#8c8c8c]  w-[14px] h-[14px]'
                      >
                        <path
                          fillRule='evenodd'
                          d='M1.104 12.444a1 1 0 010-.888c.13-.26.37-.693.722-1.241A18.85 18.85 0 013.88 7.652C6.184 5.176 8.896 3.667 12 3.667s5.816 1.509 8.119 3.985c.79.85 1.475 1.756 2.055 2.663.352.548.593.98.722 1.24a1 1 0 010 .89c-.13.26-.37.692-.722 1.24a18.848 18.848 0 01-2.055 2.663c-2.303 2.476-5.015 3.985-8.119 3.985s-5.816-1.509-8.119-3.985a18.846 18.846 0 01-2.055-2.663c-.352-.548-.593-.98-.722-1.24zm2.406.162a16.87 16.87 0 001.836 2.38c1.959 2.106 4.19 3.347 6.654 3.347 2.465 0 4.695-1.24 6.654-3.347A16.87 16.87 0 0020.86 12a16.871 16.871 0 00-2.206-2.986C16.695 6.908 14.464 5.667 12 5.667c-2.465 0-4.695 1.24-6.654 3.347A16.87 16.87 0 003.14 12c.108.188.232.391.37.607zM12 15.75c-2.06 0-3.727-1.68-3.727-3.75 0-2.07 1.667-3.75 3.727-3.75 2.06 0 3.727 1.68 3.727 3.75 0 2.07-1.667 3.75-3.727 3.75zm0-2c.952 0 1.727-.782 1.727-1.75s-.775-1.75-1.727-1.75c-.952 0-1.727.782-1.727 1.75s.775 1.75 1.727 1.75z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <div className='text-[#8c8c8c]  text-sm'>{(item.hitCount / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className='flex items-center gap-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        className='text-[#8c8c8c]  w-[14px] h-[14px]'
                      >
                        <path
                          fillRule='evenodd'
                          d='M11.997 21.5a9.5 9.5 0 01-8.49-5.251A9.38 9.38 0 012.5 11.997V11.5c.267-4.88 4.12-8.733 8.945-8.999L12 2.5a9.378 9.378 0 014.25 1.007A9.498 9.498 0 0121.5 12a9.378 9.378 0 01-.856 3.937l.838 4.376a1 1 0 01-1.17 1.17l-4.376-.838a9.381 9.381 0 01-3.939.856zm3.99-2.882l3.254.623-.623-3.253a1 1 0 01.09-.64 7.381 7.381 0 00.792-3.346 7.5 7.5 0 00-4.147-6.708 7.385 7.385 0 00-3.35-.794H11.5c-3.752.208-6.792 3.248-7.002 7.055L4.5 12a7.387 7.387 0 00.794 3.353A7.5 7.5 0 0012 19.5a7.384 7.384 0 003.349-.793 1 1 0 01.639-.09z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <div className='text-[#8c8c8c]  text-sm'>{(item.topic.commentCount / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </InfiniteScroll>
      </div>
    )
  )
}

export default SolutionList
