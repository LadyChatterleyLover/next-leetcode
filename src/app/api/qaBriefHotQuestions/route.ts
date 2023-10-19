import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'qaBriefHotQuestions',
      variables: {},
      query:
        'query qaBriefHotQuestions {\n  qaBriefHotQuestions {\n    uuid\n    title\n    author {\n      userSlug\n      avatar\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.qaBriefHotQuestions,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
