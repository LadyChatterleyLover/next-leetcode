import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { pageNum, pageSize } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'contestHistory',
      variables: {
        pageNum,
        pageSize,
      },
      query:
        'query contestHistory($pageNum: Int!, $pageSize: Int) {\n  contestHistory(pageNum: $pageNum, pageSize: $pageSize) {\n    totalNum\n    contests {\n      containsPremium\n      title\n      cardImg\n      titleSlug\n      description\n      startTime\n      duration\n      originStartTime\n      isVirtual\n      company {\n        watermark\n        __typename\n      }\n      isEeExamContest\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.contestHistory,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
