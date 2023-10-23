import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query: '\n    query homePageChannels {\n  homePageChannels {\n    id\n    name\n    slug\n  }\n}\n    ',
      variables: {},
      operationName: 'homePageChannels',
    })
    const list = [
      {
        id: -1,
        name: '推荐',
        slug: '',
      },
      ...res.data.data.homePageChannels,
    ]
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: list,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
