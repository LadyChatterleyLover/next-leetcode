import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post(`https://leetcode.cn/graphql/`, {
      query:
        '\n    query questionTagTypeWithTags {\n  questionTagTypeWithTags {\n    name\n    transName\n    tagRelation {\n      questionNum\n      tag {\n        name\n        id\n        nameTranslated\n        slug\n      }\n    }\n  }\n}\n    ',
      variables: {},
      operationName: 'questionTagTypeWithTags',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.questionTagTypeWithTags,
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
