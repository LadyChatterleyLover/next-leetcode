import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug } = await req.json()
  try {
    const result = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query boundTopicId($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    boundTopicId\n  }\n}\n    ',
      variables: {
        titleSlug,
      },
      operationName: 'boundTopicId',
    })
    const topicId = result.data.data.question.boundTopicId
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query discussionCount($topicId: Int!) {\n  topic(id: $topicId) {\n    id\n    commentCount\n  }\n}\n    ',
      variables: {
        topicId,
      },
      operationName: 'discussionCount',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.topic.commentCount,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
