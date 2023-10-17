import { AnswerResult } from '@/app/types'
import { Avatar, Divider, Tag } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Markdown from 'react-markdown'

const Answer = () => {
  const searchParams = useSearchParams()
  const submissionId = useMemo(() => {
    return searchParams.get('submissionId')
  }, [searchParams])
  const [result, setResult] = useState<AnswerResult>()

  const getAnswerResult = useCallback(() => {
    axios
      .post('/api/submissionDetails', {
        submissionId,
      })
      .then(res => {
        setResult(res.data.data)
        console.log('res', res.data.data)
      })
  }, [submissionId])

  const renderStatus = (status: string) => {
    if (status === 'Wrong Answer') {
      return <div className="text-[#f63636] text-2xl">解答错误</div>
    }
  }

  useEffect(() => {
    if (submissionId) {
      getAnswerResult()
    }
  }, [getAnswerResult, submissionId])
  return (
    result && (
      <div>
        <div
          className="flex items-center pb-2"
          style={{ borderBottom: '1px solid #eee' }}>
          <div className="flex items-center">
            <Avatar
              size={18}
              src={result.user.userAvatar}></Avatar>
            <div className="text-xs ml-1">{result.user.realName}</div>
          </div>
          <div className="text-[#0000008c] ml-1 text-xs">
            提交于 {dayjs(result.timestamp).format('YYYY.MM.DD HH:mm')}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {renderStatus(result.statusDisplay)}
              <Divider type="vertical"></Divider>
              <div className="text-[#00000057] text-xs">
                {result.runtimePercentile} / {result.totalTestCaseCnt} 个通过的测试用例
              </div>
            </div>
            <Tag color="#ffa116">官方解答</Tag>
          </div>
          <div className="bg-[#000a2008] flex w-full flex-col my-5 rounded-lg p-4">
            <div className="text-[#262626bf] font-menlo text-[13px]">最后执行的输入</div>
            <div className="h-[1px] w-full my-2 bg-[#eee]"></div>
            <div
              className="text-[#ef4743] font-menlo whitespace-pre-wrap text-[13px] leading-[21px] overflow-y-auto break-all"
              dangerouslySetInnerHTML={{ __html: result.outputDetail.lastTestcase }}></div>
          </div>
          <div className="bg-[#000a2008] flex w-full flex-col mb-5 rounded-lg p-4">
            <div className="text-caption px-4 py-2 font-medium text-[##1a1a1a]">
              {result.langVerboseName}
            </div>
            <div className="px-4 py-2">
              <Markdown>{result.code}</Markdown>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Answer
