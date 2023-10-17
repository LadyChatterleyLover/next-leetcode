import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { submissionId } = await req.json()
  axios.interceptors.request.use(config => {
    config.headers.Cookie = `csrftoken=${process.env.csrftoken};LEETCODE_SESSION=${process.env.LEETCODE_SESSION};`
    return config
  })
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query submissionDetails($submissionId: ID!) {\n  submissionDetail(submissionId: $submissionId) {\n    code\n    timestamp\n    statusDisplay\n    isMine\n    runtimeDisplay: runtime\n    memoryDisplay: memory\n    memory: rawMemory\n    lang\n    langVerboseName\n    question {\n      questionId\n      titleSlug\n      hasFrontendPreview\n    }\n    user {\n      realName\n      userAvatar\n      userSlug\n    }\n    runtimePercentile\n    memoryPercentile\n    submissionComment {\n      flagType\n    }\n    passedTestCaseCnt\n    totalTestCaseCnt\n    fullCodeOutput\n    testDescriptions\n    ... on GeneralSubmissionNode {\n      outputDetail {\n        codeOutput\n        expectedOutput\n        input\n        compileError\n        runtimeError\n        lastTestcase\n      }\n    }\n  }\n}\n    ',
      variables: {
        submissionId,
      },
      operationName: 'submissionDetails',
    })
    console.log(res.data.data)
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.submissionDetail,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
