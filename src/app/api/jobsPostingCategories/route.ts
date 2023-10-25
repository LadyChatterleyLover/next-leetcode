import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'jobsPostingCategories',
      variables: {},
      query:
        'query jobsPostingCategories {\n  jobsPostingCategories {\n    canBeFiltered\n    canBeSelected\n    id\n    name\n    order\n    subCategories {\n      id\n      name\n      order\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.jobsPostingCategories,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
