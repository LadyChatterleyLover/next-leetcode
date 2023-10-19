import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { DiscussItem } from '@/app/types'
import { Avatar, Button, Divider, Image, Spin } from 'antd'
import { CommentOutlined, EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'

const Discuss = ({ slug }: { slug: string }) => {
  const state = useReactive<{
    isFeatured: boolean
    pageNum: number
    query: string
    discuccList: DiscussItem[]
    loading: boolean
    hasMore: boolean
  }>({
    isFeatured: false,
    pageNum: 0,
    query: '',
    discuccList: [],
    loading: false,
    hasMore: true,
  })

  const getDiscussList = () => {
    state.loading = true
    axios
      .post('/api/discussList', {
        isFeatured: state.isFeatured,
        slug,
        pageNum: state.pageNum,
        query: state.query,
      })
      .then(res => {
        state.discuccList = [...state.discuccList, ...res.data.data]
        state.hasMore = res.data.data.length
        console.log('res', res.data.data)
      })
      .finally(() => {
        state.loading = false
      })
  }

  useEffect(() => {
    getDiscussList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.hasMore ? (
    <div>
      {!state.loading ? (
        <>
          {state.discuccList.map((item, index) => {
            return (
              <div
                key={index}
                className='mb-5 bg-white p-4 rounded-lg flex justify-between'
                style={{
                  boxShadow: '0 1px 2px rgba(0,10,32,0.1), 0 2px 8px rgba(0,10,32,0.05)',
                }}
              >
                {item.thumbnail ? (
                  <div className='flex items-center justify-center mr-4'>
                    <Image
                      alt='thumbnail'
                      src={item.thumbnail}
                      width={200}
                      preview={false}
                      height={120}
                      style={{ objectFit: 'cover' }}
                    ></Image>
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
                    className='mt-3 line-clamp-2 leading-6 text-sm text-[#595959] cursor-pointer'
                    style={{ wordBreak: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                  <div className='mt-8 flex items-center text-[#8c8c8c]'>
                    <div className='flex items-center gap-x-2'>
                      <LikeOutlined style={{ color: '#8c8c8c' }} />
                      {item.reactionsV2.length ? item.reactionsV2[0].count : 0}
                    </div>
                    <Divider type='vertical' style={{ margin: '0 16px' }}></Divider>
                    <div className='flex items-center gap-x-4'>
                      <div className='flex items-center gap-x-1'>
                        <EyeOutlined style={{ color: '#8c8c8c' }} />
                        {item.hitCount}
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <CommentOutlined style={{ color: '#8c8c8c' }} />
                        {item.numAnswers}
                      </div>
                      <div className='flex items-center gap-x-1'>
                        <StarOutlined style={{ color: '#8c8c8c' }} />
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
  )
}

export default Discuss
