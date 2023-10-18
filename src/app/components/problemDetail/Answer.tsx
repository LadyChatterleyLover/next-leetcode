import { AnswerResult } from '@/app/types'
import { localGet } from '@/app/utils/storage'
import { Avatar, Divider, Tag } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

interface Props {
  submitFlag: boolean
}

const Answer: React.FC<Props> = ({ submitFlag }) => {
  const searchParams = useSearchParams()
  const submissionId = useMemo(() => {
    return searchParams.get('submissionId')
  }, [searchParams])
  const [result, setResult] = useState<AnswerResult>()
  const [paramsList, setParamsList] = useState<{ name: string; type: string }[]>([])

  const getAnswerResult = useCallback(() => {
    axios
      .post('/api/submissionDetails', {
        submissionId,
      })
      .then(res => {
        setResult(res.data.data)
      })
  }, [submissionId])

  const renderStatus = (status: string) => {
    if (status === 'Wrong Answer') {
      return <div className='text-[#f63636] text-2xl'>解答错误</div>
    }
  }

  useEffect(() => {
    if (submissionId) {
      getAnswerResult()
    }
    setParamsList(localGet('questionParams'))
  }, [getAnswerResult, submissionId])

  return (
    result && (
      <div>
        <div className='flex items-center pb-2' style={{ borderBottom: '1px solid #eee' }}>
          <div className='flex items-center'>
            <Avatar size={18} src={result.user.userAvatar}></Avatar>
            <div className='text-xs ml-1'>{result.user.realName}</div>
          </div>
          <div className='text-[#0000008c] ml-1 text-xs'>
            提交于 {dayjs(result.timestamp).format('YYYY.MM.DD HH:mm')}
          </div>
        </div>
        <div className='p-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              {renderStatus(result.statusDisplay)}
              <Divider type='vertical'></Divider>
              <div className='text-[#00000057] text-xs'>
                {result.runtimePercentile} / {result.totalTestCaseCnt} 个通过的测试用例
              </div>
            </div>
            <Tag color='#ffa116'>官方解答</Tag>
          </div>
          {submitFlag ? (
            <div>
              <div className='mb-2 mt-4 text-xs font-medium text-[#3c3c4399]'>输入</div>
              <div className='mb-5 space-y-2'>
                {paramsList.map((item, index) => {
                  const arr = result.outputDetail.input.split('\n')
                  return (
                    <div key={index} className='relative rounded-lg bg-[#000a2008]'>
                      <div className='relative py-[10px]'>
                        <div className='mx-3 mb-2 text-xs text-[#3c3c4399]'>{item.name} =</div>
                        <div className='font-menlo relative mx-3 whitespace-pre-wrap break-all text-[#262626]'>
                          {arr[index]}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='my-2 text-xs font-medium text-[#3c3c4399]'>输出</div>
              <div className='relative rounded-lg bg-[#000a2008] mb-5'>
                <div className='relative py-[10px]'>
                  <div className='font-menlo relative mx-3 whitespace-pre-wrap break-all text-[#262626]'>
                    {result.outputDetail.codeOutput}
                  </div>
                </div>
              </div>
              <div className='mb-2 text-xs font-medium text-[#3c3c4399]'>预期结果</div>
              <div className='relative rounded-lg bg-[#000a2008] mb-5'>
                <div className='relative py-[10px]'>
                  <div className='font-menlo relative mx-3 whitespace-pre-wrap break-all text-[#262626]'>
                    {result.outputDetail.expectedOutput}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='bg-[#000a2008] flex w-full flex-col my-5 rounded-lg p-4'>
              <div className='text-[#262626bf] font-menlo text-[13px]'>最后执行的输入</div>
              <div className='h-[1px] w-full my-2 bg-[#eee]'></div>
              <div
                className='text-[#ef4743] font-menlo whitespace-pre-wrap text-[13px] leading-[21px] overflow-y-auto break-all'
                dangerouslySetInnerHTML={{ __html: result.outputDetail.lastTestcase }}
              ></div>
            </div>
          )}
          <div className='bg-[#000a2008] flex w-full flex-col mb-5 rounded-lg p-4'>
            <div className='text-caption px-4 py-2 font-medium text-[##1a1a1a]'>{result.langVerboseName}</div>
            <div className='px-4 py-2 answer-code'>
              <SyntaxHighlighter language={result.lang}>{result.code}</SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Answer
