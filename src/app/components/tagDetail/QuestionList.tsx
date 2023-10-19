import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { ProblemItem } from '@/app/types'
import { ColumnsType } from 'antd/lib/table'
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { Pagination, Progress, Table, Tag, Tooltip } from 'antd'
import QuestionStatusTag from '../problemset/QuestionStatusTag'
import QuestionDifficultyTag from '../problemset/QuestionDifficultyTag'

const QuestionList = ({ slug }: { slug: string }) => {
  const router = useRouter()
  const [list, setList] = useState<ProblemItem[]>([])
  const [allList, setAllList] = useState<ProblemItem[]>([])
  const [current, setCurrent] = useState(1)
  const [limit, setLimit] = useState(50)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const completeCount = useMemo(() => {
    return allList.filter(item => item.status?.toUpperCase() === 'AC').length
  }, [allList])

  const getProblemsList = () => {
    setLoading(true)
    axios
      .post('/api/tagQuestionList', { slug })
      .then(res => {
        const data: ProblemItem[] = res.data.data
        setTotal(data.length)
        setAllList([...data])
        setList([...data.slice((current - 1) * limit, limit * current)])
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
            router.push(`/problem?title=${record.questionId}. ${record.translatedTitle}&slugTitle=${record.titleSlug}`)
          }}
        >
          {record.questionId}. {record.translatedTitle}
        </div>
      ),
      sorter: (a, b) => Number(a.questionId) - Number(b.questionId),
    },
    {
      title: '通过率',
      dataIndex: 'acRate',
      key: 'acRate',
      sorter: (a, b) => {
        function getValue(val: string) {
          const arr = val.split('.')
          return Number(arr[0])
        }
        return getValue(String(a.acRate)) - getValue(String(b.acRate))
      },
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: text => renderDifficulty(text),
    },
  ]

  const onPaginationChange = (page: number, pageSize: number) => {
    setCurrent(page)
    setLimit(pageSize)
    const arr = allList.slice((page - 1) * pageSize, pageSize * page)
    setList([...arr])
  }

  useEffect(() => {
    getProblemsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='mt-5'>
      <div className='flex items-center justify-between my-8'>
        <div className='flex items-center text-[#262626bf]'>
          <div>完成度: </div>
          <div className='mx-2'>
            {completeCount} / {allList.length}
          </div>
          <Progress percent={(completeCount / allList.length) * 100} showInfo={false} style={{ width: 100 }}></Progress>
        </div>
        <div className='flex  items-center gap-x-2 w-[300px]'>
          <div className='flex-1'>
            <QuestionStatusTag></QuestionStatusTag>
          </div>
          <div className='flex-1'>
            <QuestionDifficultyTag></QuestionDifficultyTag>
          </div>
        </div>
      </div>
      <Table rowKey='questionId' columns={columns} dataSource={list} pagination={false} loading={loading} />
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

export default QuestionList
