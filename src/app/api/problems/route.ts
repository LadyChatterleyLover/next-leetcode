import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { skip, limit } = await req.json()
  try {
    const questionOfTodayRes = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query questionOfToday {\n  todayRecord {\n    date\n    userStatus\n    question {\n      questionId\n      frontendQuestionId: questionFrontendId\n      difficulty\n      title\n      titleCn: translatedTitle\n      titleSlug\n      paidOnly: isPaidOnly\n      freqBar\n      isFavor\n      acRate\n      status\n      solutionNum\n      hasVideoSolution\n      topicTags {\n        name\n        nameTranslated: translatedName\n        id\n      }\n      extra {\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n    lastSubmission {\n      id\n    }\n  }\n}\n    ',
      variables: {},
      operationName: 'questionOfToday',
    })
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    hasMore\n    total\n    questions {\n      acRate\n      difficulty\n      freqBar\n      frontendQuestionId\n      isFavor\n      paidOnly\n      solutionNum\n      status\n      title\n      titleCn\n      titleSlug\n      topicTags {\n        name\n        nameTranslated\n        id\n        slug\n      }\n      extra {\n        hasVideoSolution\n        topCompanyTags {\n          imgUrl\n          slug\n          numSubscribed\n        }\n      }\n    }\n  }\n}\n    ',
      variables: {
        categorySlug: '',
        skip,
        limit,
        filters: {},
      },
      operationName: 'problemsetQuestionList',
    })
    res.data.data.problemsetQuestionList.questions.unshift(questionOfTodayRes.data.data.todayRecord[0].question)
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.problemsetQuestionList,
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
