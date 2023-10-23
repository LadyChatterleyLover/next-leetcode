import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query studyPlansV2ForHomepage {\n  studyPlansV2ForHomepage {\n    name\n    slug\n    premiumOnly\n    highlight\n    cover\n    questionNum\n    finishedQuestionNum\n  }\n}\n    ',
      variables: {},
      operationName: 'studyPlansV2ForHomepage',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.studyPlansV2ForHomepage,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
