import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query similarQuestion($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    similarQuestions\n  }\n}\n    ',
      variables: {
        titleSlug,
      },
      operationName: 'similarQuestion',
    })
    const res1 = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query singleQuestionTopicTags($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    topicTags {\n      name\n      slug\n      translatedName\n    }\n  }\n}\n    ',
      variables: {
        titleSlug,
      },
      operationName: 'singleQuestionTopicTags',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        similarQuestions: JSON.parse(res.data.data.question.similarQuestions),
        tags: res1.data.data.question.topicTags,
      },
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
