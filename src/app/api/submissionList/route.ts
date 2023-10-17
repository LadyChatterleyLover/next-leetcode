import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug, limit = 20, offset = 0 } = await req.json()
  axios.interceptors.request.use(config => {
    config.headers.Cookie = `csrftoken=${process.env.csrftoken};LEETCODE_SESSION=${process.env.LEETCODE_SESSION}`
    return config
  })
  try {
    const res = await axios.post(
      'https://leetcode.cn/graphql/',
      {
        query:
          '\n    query submissionList($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!, $lang: String, $status: SubmissionStatusEnum) {\n  submissionList(\n    offset: $offset\n    limit: $limit\n    lastKey: $lastKey\n    questionSlug: $questionSlug\n    lang: $lang\n    status: $status\n  ) {\n    lastKey\n    hasNext\n    submissions {\n      id\n      title\n      status\n      statusDisplay\n      lang\n      langName: langVerboseName\n      runtime\n      timestamp\n      url\n      isPending\n      memory\n      submissionComment {\n        comment\n        flagType\n      }\n    }\n  }\n}\n    ',
        variables: {
          questionSlug: titleSlug,
          offset,
          limit,
          lastKey: null,
          status: null,
        },
        operationName: 'submissionList',
      },
      {
        withCredentials: true,
      }
    )
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.submissionList.submissions,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
