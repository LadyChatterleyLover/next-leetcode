import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'leetbookCategories',
      variables: {},
      query:
        'query leetbookCategories {\n  leetbookCategories {\n    id\n    name\n    subcategories {\n      bookIds\n      id\n      name\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.leetbookCategories,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
