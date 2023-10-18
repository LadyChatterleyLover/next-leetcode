import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { offset } = await req.json()
  try {
    const res = await axios.post(`https://leetcode.cn/graphql/`, {
      query:
        '\n    query questionCompanyTagsV2($offset: Int) {\n  companyTagsV2(limit: 15, offset: $offset) {\n    companyTagInfoNodes {\n      name\n      slug\n      id\n      questionCount: companyQuestionNum\n    }\n    hasMore\n  }\n}\n    ',
      variables: {
        offset,
      },
      operationName: 'questionCompanyTagsV2',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        list: res.data.data.companyTagsV2.companyTagInfoNodes,
        hasMore: res.data.data.companyTagsV2.hasMore,
      },
    })
  } catch (err) {
    console.log('err', err)
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
