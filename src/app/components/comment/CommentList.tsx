import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { Avatar, Pagination, Select } from 'antd'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { Comment } from '@/app/types'
import { LikeOutlined } from '@ant-design/icons'

const CommentList = () => {
  const params = useSearchParams()
  const titleSlug = useMemo(() => {
    return params.get('slugTitle')
  }, [params])

  const [skip, setSkip] = useState(0)
  const [orderBy, setOrderBy] = useState('HOT')
  const [commentList, setCommentList] = useState<{ node: Comment }[]>([])
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)

  const getComment = useCallback(
    (s: number, order: string) => {
      axios
        .post('/api/comment', {
          titleSlug,
          skip: s,
          numPerPage: 10,
          orderBy: order,
        })
        .then(res => {
          setCommentList(res.data.data.list)
          setTotal(res.data.data.total)
          console.log('res', res.data)
        })
    },
    [titleSlug]
  )

  const onSizeChange = (page: number) => {
    setCurrent(page)
    setSkip((page - 1) * 10)
    getComment((page - 1) * 10, orderBy)
  }

  useEffect(() => {
    getComment(skip, orderBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mt-3'>
      <div className='flex items-center'>
        <div className='mr-2 text-sm'>排序</div>
        <Select
          value={orderBy}
          style={{ width: 120 }}
          size='small'
          options={[
            {
              value: 'HOT',
              label: '最热',
            },
            {
              value: 'NEW_TO_OLD',
              label: '最新',
            },
            {
              value: 'OLD_TO_NEW',
              label: '最早',
            },
          ]}
          onChange={val => {
            setOrderBy(val)
            getComment(skip, val)
          }}
        ></Select>
      </div>
      <div className='mt-4'>
        {commentList.length ? (
          <>
            {commentList.map(item => {
              return (
                <div key={item.node.id} className='mb-5'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center'>
                      <Avatar size={32} src={item.node.post.author.profile.userAvatar}></Avatar>
                      <div className='ml-3'>{item.node.post.author.username}</div>
                    </div>
                    <div className='whitespace-nowrap text-xs text-[#3c3c4399]'>发布于 {item.node.ipRegion}</div>
                  </div>
                  <Markdown rehypePlugins={[rehypeHighlight]}>{item.node.post.content}</Markdown>
                  <div className='mt-4 flex items-center'>
                    <LikeOutlined style={{ color: '#8c8c8c', cursor: 'pointer' }}></LikeOutlined>
                    <div className='ml-1 cursor-pointer'>{item.node.post.voteUpCount}</div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 16 16'
                      width='1em'
                      height='1em'
                      fill='currentColor'
                      className='ml-3 text-[#8c8c8c] cursor-pointer'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.83 2.106c.628-.634 1.71-.189 1.71.704v2.065c4.821.94 6.97 4.547 7.73 8.085l-.651.14.652-.134c.157.757-.83 1.192-1.284.565l-.007-.009c-1.528-2.055-3.576-3.332-6.44-3.502v2.352c0 .893-1.082 1.338-1.71.704L1.091 8.295a1 1 0 010-1.408l4.737-4.78zm7.303 8.617C12.08 8.495 10.204 6.68 7.046 6.14c-.47-.08-.84-.486-.84-.99V3.62L2.271 7.591l3.934 3.971V9.667a.993.993 0 011.018-.995c2.397.065 4.339.803 5.909 2.051z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <div className='ml-1 text-xs text-[#8c8c8c] cursor-pointer'>回复</div>
                  </div>
                </div>
              )
            })}
            <div className='mt-5 flex justify-center'>
              <Pagination current={current} total={total} showSizeChanger={false} onChange={onSizeChange}></Pagination>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default CommentList
