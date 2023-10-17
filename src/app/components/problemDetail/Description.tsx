import { ProblemDetail } from '@/app/types'
import {
  CheckCircleOutlined,
  CommentOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  LikeOutlined,
  MinusCircleOutlined,
  RightOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Collapse, CollapseProps, Divider, Popover, Tag, Tooltip } from 'antd'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Comment from './Comment'

interface Props {
  detail: ProblemDetail
  title: string
  slugTitle: string
}

interface Stats {
  acRate: string
  totalAccepted: string
  totalAcceptedRaw: number
  totalSubmission: string
  totalSubmissionRaw: number
}

interface Similar {
  difficulty: string
  isPaidOnly: number
  title: string
  titleSlug: string
  translatedTitle: string
}

interface TagItem {
  name: string
  slug: string
  translatedName: string
}

const Description = (props: Props) => {
  const { detail, title, slugTitle } = props
  const [hints, setHints] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [similarQuestions, setSimilarQuestions] = useState<Similar[]>([])
  const [problemStats, setProblemStats] = useState<Stats>()
  const [commentCount, setCommentCount] = useState(0)
  let [currentHintIndex, setCurrentHintIndex] = useState(0)

  const renderDifficulty = (difficulty: string) => {
    if (difficulty.toUpperCase() === 'EASY') {
      return <Tag color='#00af9b'>简单</Tag>
    } else if (difficulty.toUpperCase() === 'MEDIUM') {
      return <Tag color='#ffb800'>中等</Tag>
    } else if (difficulty.toUpperCase() === 'HARD') {
      return <Tag color='#ff2d55'>困难</Tag>
    }
  }

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: '相似题目',
      children: (
        <div>
          {similarQuestions.map(item => {
            return (
              <div key={item.title} className='flex items-center justify-between py-2 cursor-pointer'>
                <div className='hover:text-blue-400'>{item.translatedTitle}</div>
                <div>{renderDifficulty(item.difficulty)}</div>
              </div>
            )
          })}
        </div>
      ),
    },
    {
      key: '2',
      label: `评论 (${(commentCount / 1000).toFixed(1)}K)`,
      children: <Comment></Comment>,
    },
  ]

  const hintContent = () => {
    return (
      <>
        <div className='flex items-center justify-between w-[200px]'>
          <div>
            提示 ({currentHintIndex + 1}/{hints.length})
          </div>
          <div className='flex items-center'>
            <Button
              size='small'
              icon={<LeftOutlined />}
              className='mr-3'
              disabled={currentHintIndex === 0}
              onClick={() => {
                currentHintIndex--
                setCurrentHintIndex(currentHintIndex)
              }}
            ></Button>
            <Button
              size='small'
              icon={<RightOutlined />}
              className='mr-3'
              disabled={currentHintIndex === hints.length - 1}
              onClick={() => {
                currentHintIndex++
                setCurrentHintIndex(currentHintIndex)
              }}
            ></Button>
          </div>
        </div>
        <div className='w-[200px] mt-2'>{hints[currentHintIndex]}</div>
      </>
    )
  }

  const getHints = useCallback(() => {
    axios
      .post('/api/problemTips', {
        titleSlug: slugTitle,
      })
      .then(res => {
        setHints(res.data.data.hints)
      })
  }, [slugTitle])

  const getContent = useCallback(() => {
    axios
      .post('/api/problemContent', {
        titleSlug: slugTitle,
      })
      .then(res => {
        setContent(res.data.data)
      })
  }, [slugTitle])

  const getProblemStats = useCallback(() => {
    axios
      .post('/api/problemStats', {
        titleSlug: slugTitle,
      })
      .then(res => {
        setProblemStats(res.data.data)
      })
  }, [slugTitle])

  const getSimilarQuestions = useCallback(() => {
    axios
      .post('/api/similarQuestions', {
        titleSlug: slugTitle,
      })
      .then(res => {
        setSimilarQuestions(res.data.data.similarQuestions)
      })
  }, [slugTitle])

  const getComment = useCallback(() => {
    axios
      .post('/api/commentCount', {
        titleSlug: slugTitle,
      })
      .then(res => {
        setCommentCount(res.data.data)
      })
  }, [slugTitle])

  useEffect(() => {
    getHints()
  }, [getHints])

  useEffect(() => {
    getContent()
  }, [getContent])

  useEffect(() => {
    getProblemStats()
  }, [getProblemStats])

  useEffect(() => {
    getSimilarQuestions()
  }, [getSimilarQuestions])

  useEffect(() => {
    getComment()
  }, [getComment])

  return (
    <>
      <div className=' bg-white mt-5 h-full overflow-y-auto pb-[60px]'>
        <div className='flex justify-between'>
          <div className='text-xl'>{title}</div>
          <div>
            <Tooltip title='显示提示' placement='top' arrow={false}>
              <Popover placement='bottom' content={hintContent()} trigger='click'>
                <Button type='text' className='mr-8'>
                  提示
                </Button>
              </Popover>
            </Tooltip>
          </div>
        </div>
        <div className='mt-10 px-5 leading-8 pb-5' dangerouslySetInnerHTML={{ __html: content }}></div>
        <div className='mt-5 flex items-center'>
          <div className='flex items-center text-sm'>
            <div>通过次数</div>
            <div className='ml-3'>{problemStats?.totalAccepted}</div>
          </div>
          <Divider type='vertical' style={{ margin: '0 20px' }}></Divider>
          <div className='flex items-center text-sm'>
            <div>提交次数</div>
            <div className='ml-3'>{problemStats?.totalSubmission}</div>
          </div>
          <Divider type='vertical' style={{ margin: '0 20px' }}></Divider>
          <div className='flex items-center text-sm'>
            <div>通过率</div>
            <div className='ml-3'>{problemStats?.acRate}</div>
          </div>
        </div>
        <div className='mt-5 '>
          <Collapse items={collapseItems} style={{ border: 'none', background: '#fff' }} />
        </div>
      </div>
      {detail ? (
        <div className='flex items-center fixed bottom-0 left-0 bg-white h-[60px] ml-5 w-full z-[100] shadow-sm'>
          <div className='flex items-center ml-5 text-[#8c8c8c]'>
            <LikeOutlined style={{ fontSize: 18, position: 'relative', top: '-2px' }} />
            <div className='ml-1'>{(detail.likes / 10000).toFixed(1)}k</div>
          </div>
          <div className='cursor-pointer flex items-center ml-5 text-[#8c8c8c]'>
            <CommentOutlined style={{ fontSize: 18, position: 'relative', top: '-2px' }} />
            <div className='ml-1'>{(commentCount / 1000).toFixed(1)}k</div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Description
