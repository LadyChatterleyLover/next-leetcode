'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ColumnsType } from 'antd/lib/table'
import { Input, Pagination, Table, Tag, Tooltip } from 'antd'
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  ShareAltOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import QuestionListTag from '../home/QuestionListTag'
import QuestionDifficultyTag from '../home/QuestionDifficultyTag'
import QuestionStatusTag from '../home/QuestionStatusTag'
import QuestionAllTag from '../home/QuestionAllTag'
import { ProblemItem } from '@/app/types'

const Problems = () => {
  const router = useRouter()
  const [problemList, setProblemList] = useState<ProblemItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [skip, setSkip] = useState(0)
  const [current, setCurrent] = useState(1)
  const [limit, setLimit] = useState(50)

  const renderStatus = (status: string) => {
    if (!status) {
      return <div></div>
    }
    if (status.toUpperCase() === 'AC') {
      return (
        <Tooltip title='已解答' placement='bottom' arrow={false}>
          <CheckCircleOutlined style={{ color: '#15BD66' }} />
        </Tooltip>
      )
    } else if (status.toUpperCase() === 'TRIED') {
      return (
        <Tooltip title='尝试过' placement='bottom' arrow={false}>
          <ExclamationCircleOutlined style={{ color: '#FFB800' }} />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip title='未完成' placement='bottom' arrow={false}>
          <MinusCircleOutlined style={{ color: '#ff2d55' }} />
        </Tooltip>
      )
    }
  }

  const renderDifficulty = (difficulty: string) => {
    if (difficulty.toUpperCase() === 'EASY') {
      return <Tag color='#00af9b'>简单</Tag>
    } else if (difficulty.toUpperCase() === 'MEDIUM') {
      return <Tag color='#ffb800'>中等</Tag>
    } else if (difficulty.toUpperCase() === 'HARD') {
      return <Tag color='#ff2d55'>困难</Tag>
    }
  }

  const columns: ColumnsType<ProblemItem> = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, _, index) => (
        <div className='flex items-center'>
          {index === 0 ? <CalendarOutlined style={{ color: '#007aff' }} /> : renderStatus(text)}
        </div>
      ),
    },
    {
      title: '题目',
      dataIndex: 'titleCn',
      key: 'titleCn',
      render: (_, record) => (
        <div
          className='cursor-pointer hover:text-blue-400'
          onClick={() => {
            router.push(`/problem?title=${record.frontendQuestionId}. ${record.titleCn}&slugTitle=${record.titleSlug}`)
          }}
        >
          {record.frontendQuestionId}. {record.titleCn}
        </div>
      ),
    },
    {
      title: '题解',
      dataIndex: 'solutionNum',
      key: 'solutionNum',
      render: (_, record) => (
        <div className='flex items-center cursor-pointer '>
          <div className='mr-2 hover:text-blue-400'>{record.solutionNum}</div>
          {record.extra.hasVideoSolution ? <VideoCameraOutlined /> : null}
        </div>
      ),
      sorter: (a, b) => a.solutionNum - b.solutionNum,
    },
    {
      title: '通过率',
      dataIndex: 'acRate',
      key: 'acRate',
      render: text => <div>{(Number(text) * 100).toFixed(1)}%</div>,
      sorter: (a, b) => a.acRate - b.acRate,
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: text => renderDifficulty(text),
    },
  ]

  const getProblemsList = (s: number, l: number) => {
    setLoading(true)
    axios
      .post('/api/problems', {
        skip: s,
        limit: l,
      })
      .then(res => {
        setProblemList(res.data.data.questions)
        setTotal(res.data.data.total)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getProblemsList(skip, limit)
  }, [limit, skip])

  const onPaginationChange = (page: number, pageSize: number) => {
    setSkip((page - 1) * pageSize)
    setCurrent(page)
    setLimit(pageSize)
    getProblemsList((page - 1) * pageSize, pageSize)
  }

  return (
    <div className='mt-5'>
      <div className='flex mb-5 gap-x-2'>
        <div className='flex-1'>
          <QuestionListTag></QuestionListTag>
        </div>
        <div className='flex-1'>
          <QuestionDifficultyTag></QuestionDifficultyTag>
        </div>
        <div className='flex-1'>
          <QuestionStatusTag></QuestionStatusTag>
        </div>
        <div className='flex-1'>
          <QuestionAllTag></QuestionAllTag>
        </div>
        <div className='flex min-w-[300px] flex-[4_4_0%] gap-2'>
          <div className='flex-1'>
            <Input.Search placeholder='搜索题目、编号或题号'></Input.Search>
          </div>
          <div className='flex items-center'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full shadow-md from-fixed-green to-[#2db55d] bg-gradient-to-b shadow-fixed-green'>
              <ShareAltOutlined />
            </div>
            <div className='text-[#2db55d] hidden pl-2.5 md:inline'>随机一题</div>
          </div>
        </div>
      </div>
      <Table
        rowKey='frontendQuestionId'
        columns={columns}
        dataSource={problemList}
        pagination={false}
        loading={loading}
      />
      <div className='mt-5 flex justify-end'>
        <Pagination
          total={total}
          current={current}
          pageSize={limit}
          pageSizeOptions={[20, 50, 100]}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  )
}

export default Problems
