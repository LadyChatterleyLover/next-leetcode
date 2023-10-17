import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query questionStats($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    stats\n  }\n}\n    ',
      variables: {
        titleSlug,
      },
      operationName: 'questionStats',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: JSON.parse(res.data.data.question.stats),
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
