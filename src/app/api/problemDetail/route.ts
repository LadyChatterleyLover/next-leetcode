import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slugTitle } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query questionTitle($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    title\n    titleSlug\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    categoryTitle\n  }\n}\n    ',
      variables: {
        titleSlug: slugTitle,
      },
      operationName: 'questionTitle',
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
