import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query consolePanelConfig($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    questionTitle\n    enableRunCode\n    enableSubmit\n    enableTestMode\n    jsonExampleTestcases\n    exampleTestcases\n    metaData\n    sampleTestCase\n  }\n}\n    ',
      variables: {
        titleSlug: titleSlug,
      },
      operationName: 'consolePanelConfig',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.question,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
