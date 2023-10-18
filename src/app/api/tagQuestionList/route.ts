import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.get(
      'https://questions.leetcode.cn/production/20231018090004_questions_include_main_regular_user.json',
      {
        responseType: 'text',
      }
    )
    const res1 = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'problemsetQuestionsDynamicInfos',
      variables: {},
      query:
        'query problemsetQuestionsDynamicInfos {\n  problemsetQuestionsDynamicInfos {\n    questionId\n    frequency\n    solutionNum\n    isFavor\n    status\n    __typename\n  }\n}\n',
    })
    const data = JSON.parse(res.data)
    const infos = res1.data.data.problemsetQuestionsDynamicInfos
    const arr = data.filter((item: any) => item.topicTags.find((i: any) => i.slug === slug))
    arr.map((item: any) => {
      infos.map((item1: any) => {
        if (item.questionId === item1.questionId) {
          item.acRate = item1.acRate
          item.status = item1.status
        }
      })
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: arr,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
