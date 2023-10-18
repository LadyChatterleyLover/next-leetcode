import { useEffect, useState } from 'react'
import axios from 'axios'
import { ProblemItem } from '@/app/types'
import { ColumnsType } from 'antd/lib/table'
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { Table, Tag, Tooltip } from 'antd'

const QuestionList = ({ slug }: { slug: string }) => {
  const router = useRouter()
  const [list, setList] = useState<ProblemItem[]>([])

  const getProblemList = () => {
    axios.post('/api/tagQuestionList', { slug }).then(res => {
      const data: ProblemItem[] = res.data.data
      setList(data)
      console.log('data', data)
    })
  }

  const renderStatus = (status: string) => {
    if (!status) {
      return <div></div>
    }
    if (status.toUpperCase() === 'AC') {
      return (
        <Tooltip
          title="已解答"
          placement="bottom"
          arrow={false}>
          <CheckCircleOutlined style={{ color: '#15BD66' }} />
        </Tooltip>
      )
    } else if (status.toUpperCase() === 'TRIED') {
      return (
        <Tooltip
          title="尝试过"
          placement="bottom"
          arrow={false}>
          <ExclamationCircleOutlined style={{ color: '#FFB800' }} />
        </Tooltip>
      )
    } else {
      return (
        <Tooltip
          title="未完成"
          placement="bottom"
          arrow={false}>
          <MinusCircleOutlined style={{ color: '#ff2d55' }} />
        </Tooltip>
      )
    }
  }

  const columns: ColumnsType<ProblemItem> = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, _, index) => (
        <div className="flex items-center">
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
          className="cursor-pointer hover:text-blue-400"
          onClick={() => {
            router.push(
              `/problem?title=${record.frontendQuestionId}. ${record.titleCn}&slugTitle=${record.titleSlug}`
            )
          }}>
          {record.frontendQuestionId}. {record.titleCn}
        </div>
      ),
    },
    {
      title: '题解',
      dataIndex: 'solutionNum',
      key: 'solutionNum',
      render: (_, record) => (
        <div className="flex items-center cursor-pointer ">
          <div className="mr-2 hover:text-blue-400">{record.solutionNum}</div>
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

  const renderDifficulty = (difficulty: string) => {
    if (difficulty.toUpperCase() === 'EASY') {
      return <Tag color="#00af9b">简单</Tag>
    } else if (difficulty.toUpperCase() === 'MEDIUM') {
      return <Tag color="#ffb800">中等</Tag>
    } else if (difficulty.toUpperCase() === 'HARD') {
      return <Tag color="#ff2d55">困难</Tag>
    }
  }

  useEffect(() => {
    getProblemList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-5">
      <Table
        rowKey="questionId"
        columns={columns}
        dataSource={list}
        pagination={false}
      />
    </div>
  )
}

export default QuestionList
