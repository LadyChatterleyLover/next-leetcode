import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'interviewHotSearchCards',
      variables: {
        num: 12,
      },
      query:
        'query interviewHotSearchCards($num: Int) {\n  interviewHotSearchHistory(num: $num) {\n    company {\n      name\n      slug\n      imgUrl\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.interviewHotSearchHistory,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
