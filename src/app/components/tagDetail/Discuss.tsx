import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { DiscussItem } from '@/app/types'
import { Avatar, Button, Divider, Input, Spin } from 'antd'
import { CommentOutlined, EyeOutlined, LikeOutlined, SearchOutlined, StarOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Discuss = ({ slug }: { slug: string }) => {
  const router = useRouter()
  const state = useReactive<{
    isFeatured: boolean
    pageNum: number
    query: string
    discussList: DiscussItem[]
    loading: boolean
    hasMore: boolean
    currentIndex: number
  }>({
    isFeatured: false,
    pageNum: 0,
    query: '',
    discussList: [],
    loading: false,
    hasMore: true,
    currentIndex: 0,
  })

  const tabs = [
    {
      name: '最新',
      key: 0,
    },
    {
      name: '推荐',
      key: 1,
    },
  ]

  const getDiscussList = () => {
    state.loading = true
    state.discussList = []
    axios
      .post('/api/discussList', {
        isFeatured: state.isFeatured,
        slug,
        pageNum: state.pageNum,
        query: state.query,
      })
      .then(res => {
        state.discussList = state.currentIndex === 0 ? [...state.discussList, ...res.data.data] : res.data.data
        state.hasMore = res.data.data.length
      })
      .finally(() => {
        state.loading = false
      })
  }

  useEffect(() => {
    getDiscussList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='flex items-center justify-between my-5 bg-[#f7f8fa] px-5 py-2'>
        <div className='flex items-center'>
          {tabs.map(item => {
            return (
              <div
                key={item.key}
                className={`py-2 mr-8 cursor-pointer hover:text-black ${
                  state.currentIndex === item.key ? 'text-black font-bold' : 'text-[#3c3c4399]'
                }`}
                style={{
                  borderBottom: state.currentIndex === item.key ? '2px solid #000' : 'none',
                }}
                onClick={() => {
                  state.currentIndex = item.key
                  state.isFeatured = item.key !== 0
                  getDiscussList()
                }}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <div className='flex items-center'>
          <Input
            value={state.query}
            placeholder='搜索'
            allowClear
            prefix={<SearchOutlined></SearchOutlined>}
            onChange={e => {
              state.query = e.target.value
              getDiscussList()
            }}
          ></Input>
        </div>
      </div>
      {state.hasMore ? (
        <div>
          {!state.loading ? (
            <>
              {state.discussList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='mb-5 bg-white p-4 rounded-lg flex justify-between cursor-pointer'
                    style={{
                      boxShadow: '0 1px 2px rgba(0,10,32,0.1), 0 2px 8px rgba(0,10,32,0.05)',
                    }}
                    onClick={() => {
                      router.push('/tag/discuss/' + item.uuid)
                    }}
                  >
                    {item.thumbnail ? (
                      <div className='flex items-center justify-center mr-4'>
                        <Image alt='thumbnail' src={item.thumbnail} width={200} height={120}></Image>
                      </div>
                    ) : null}
                    <div className='flex flex-col flex-1 cursor-pointer'>
                      <div className='flex items-center'>
                        <Avatar src={item.contentAuthor.avatar} size={32}></Avatar>
                        <div className='ml-3 overflow-hidden text-ellipsis whitespace-nowrap'>{item.title}</div>
                      </div>
                      <div className='flex items-center mt-2'>
                        {item.tags.slice(0, 2).map(tag => {
                          return (
                            <div
                              key={tag.slug}
                              className='px-2 h-6 text-[#3c3c4399] flex justify-center items-center rounded-full text-xs bg-[#000a200c] my-[2px] mx-[10px]'
                            >
                              {tag.nameTranslated || tag.name}
                            </div>
                          )
                        })}
                        {item.tags.length > 2 ? (
                          <div className='px-2 h-6 text-[#3c3c4399] flex justify-center items-center rounded-full text-xs bg-[#000a200c] my-[2px] mx-[10px]'>
                            {item.tags.length - 2}+
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={`mt-3 leading-6 text-sm text-[#595959] cursor-pointer ${
                          item.thumbnail ? 'line-clamp-1' : 'line-clamp-2'
                        }`}
                        style={{ wordBreak: 'break-word' }}
                        dangerouslySetInnerHTML={{ __html: item.summary }}
                      ></div>
                      <div className='mt-8 flex items-center text-[#8c8c8c]'>
                        <div className='flex items-center gap-x-2 cursor-pointer hover:text-[#0fb55d]'>
                          <LikeOutlined />
                          {item.reactionsV2.length ? item.reactionsV2[0].count : 0}
                        </div>
                        <Divider type='vertical' style={{ margin: '0 16px' }}></Divider>
                        <div className='flex items-center gap-x-4'>
                          <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#0a84ff]'>
                            <EyeOutlined />
                            {item.hitCount}
                          </div>
                          <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#0a84ff]'>
                            <CommentOutlined />
                            {item.numAnswers}
                          </div>
                          <div className='flex items-center gap-x-1 cursor-pointer hover:text-[#ffa116]'>
                            <StarOutlined />
                            {item.favoriteCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='flex items-center justify-center my-5'>
                <Button
                  onClick={() => {
                    state.pageNum += 15
                    getDiscussList()
                  }}
                >
                  加载更多
                </Button>
              </div>
            </>
          ) : (
            <Spin></Spin>
          )}
        </div>
      ) : (
        <div className='my-5 flex justify-center items-center'>已经没数据啦！</div>
      )}
    </>
  )
}

export default Discuss
