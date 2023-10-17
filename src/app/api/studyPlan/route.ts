import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query GetProblemSetStudyPlanAds {\n  studyPlansV2AdQuestionPage {\n    cover\n    highlight\n    name\n    onGoing\n    premiumOnly\n    questionNum\n    slug\n  }\n}\n    ',
      variables: {},
      operationName: 'GetProblemSetStudyPlanAds',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.studyPlansV2AdQuestionPage,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
