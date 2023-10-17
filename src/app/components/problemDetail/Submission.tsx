import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { ColumnsType } from 'antd/es/table'
import { Submission } from '@/app/types'
import dayjs from 'dayjs'
import { Table } from 'antd'

const Submission = () => {
  const searchParams = useSearchParams()
  const titleSlug = useMemo(() => {
    return searchParams.get('slugTitle')
  }, [searchParams])
  const [submissionList, setSubmissionList] = useState<Submission[]>([])

  const renderStatus = (status: string) => {
    if (status === 'Wrong Answer') {
      return <div className='text-[#ef4743]'>解答错误</div>
    }
    if (status === 'Compile Error') {
      return <div className='text-[#ef4743]'>编译出错</div>
    }
    if (status === 'Accepted') {
      return <div className='text-[#2db55d]'>通过</div>
    }
  }

  const columns: ColumnsType<Submission> = [
    {
      title: '所有状态',
      dataIndex: 'statusDisplay',
      key: 'statusDisplay',
      render: (_, record) => (
        <div>
          {renderStatus(record.statusDisplay)}
          <div className='text-xs text-[#262626bf] mt-2'>{dayjs(record.timestamp).format('YYYY.MM.DD')}</div>
        </div>
      ),
    },
    {
      title: '所有语言',
      dataIndex: 'langName',
      key: 'langName',
      render: text => (
        <div className='w-fit cursor-pointer bg-[#00000014]  text-[#262626bf]  flex items-center gap-1 rounded-[9px] px-1.5 py-[1px] text-xs'>
          {text}
        </div>
      ),
    },
    {
      title: '执行用时',
      dataIndex: 'runtime',
      key: 'runtime',
      render: text => (
        <div className='flex items-center text-[#262626bf]'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' fill='currentColor'>
            <path d='M12.974 14.417a1.391 1.391 0 11-2.783 0 1.391 1.391 0 012.783 0z'></path>
            <path d='M19.803 2.806a1 1 0 00-1.415 1.414l1.415-1.414zm1.09 3.918a1 1 0 101.414-1.414l-1.414 1.414zm-8.31 2.963a1 1 0 10-2 0h2zM8.8.287a1 1 0 000 2v-2zm5.287 2a1 1 0 100-2v2zm3.467 3.858a1 1 0 101.414 1.414l-1.414-1.414zm2.794-1.38l.707-.707-.707.707zm-9.765 4.922v3.339h2v-3.34h-2zM8.8 2.287h5.287v-2H8.8v2zm10.168 5.272l2.087-2.087-1.414-1.414-2.087 2.087 1.414 1.414zm.797 5.971a8.183 8.183 0 01-8.182 8.183v2c5.623 0 10.182-4.559 10.182-10.183h-2zm-8.182 8.183A8.183 8.183 0 013.4 13.53h-2c0 5.624 4.559 10.183 10.183 10.183v-2zM3.4 13.53a8.183 8.183 0 018.183-8.182v-2C5.959 3.348 1.4 7.907 1.4 13.53h2zm8.183-8.182a8.183 8.183 0 018.182 8.182h2c0-5.623-4.559-10.182-10.182-10.182v2zm.39 9.07a.391.391 0 01-.39.39v2c1.32 0 2.39-1.07 2.39-2.39h-2zm-.39.39a.391.391 0 01-.392-.39h-2c0 1.32 1.07 2.39 2.392 2.39v-2zm-.392-.39c0-.217.175-.392.392-.392v-2a2.391 2.391 0 00-2.392 2.391h2zm.392-.392c.216 0 .39.175.39.391h2c0-1.32-1.07-2.391-2.39-2.391v2zm6.806-9.806l1.252 1.252 1.414-1.414-1.252-1.252-1.415 1.414zm1.252 1.252l1.252 1.252 1.414-1.414-1.252-1.252-1.414 1.414z'></path>
          </svg>
          <div className='ml-1'>{text}</div>
        </div>
      ),
    },
    {
      title: '消耗内存',
      dataIndex: 'memory',
      key: 'memory',
      render: text => (
        <div className='flex items-center text-[#262626bf]'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M9 1a1 1 0 011 1v1h4V2a1 1 0 112 0v1h2a3 3 0 013 3v2h1a1 1 0 110 2h-1v4h1a1 1 0 110 2h-1v2a3 3 0 01-3 3h-2v1a1 1 0 11-2 0v-1h-4v1a1 1 0 11-2 0v-1H6a3 3 0 01-3-3v-2H2a1 1 0 110-2h1v-4H2a1 1 0 010-2h1V6a3 3 0 013-3h2V2a1 1 0 011-1zM6 5a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm2 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H9a1 1 0 01-1-1V9zm2 1v4h4v-4h-4z'
              clipRule='evenodd'
            ></path>
          </svg>
          <div className='ml-1'>{text}</div>
        </div>
      ),
    },
    {
      title: '备注',
      dataIndex: 'submissionComment',
      key: 'submissionComment',
    },
  ]

  const getSubmissionList = useCallback(() => {
    axios
      .post('/api/submissionList', {
        titleSlug,
      })
      .then(res => {
        setSubmissionList(res.data.data)
      })
  }, [titleSlug])

  useEffect(() => {
    getSubmissionList()
  }, [getSubmissionList])

  return (
    <div className='mt-5'>
      <Table rowKey='id' dataSource={submissionList} columns={columns} pagination={false}></Table>
    </div>
  )
}

export default Submission
