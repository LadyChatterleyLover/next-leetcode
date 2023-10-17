import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query solutionTags($questionSlug: String!) {\n  solutionTags(questionSlug: $questionSlug) {\n    allTags {\n      name\n      nameTranslated\n      slug\n    }\n    languageTags {\n      name\n      nameTranslated\n      slug\n    }\n    otherTags {\n      name\n      nameTranslated\n      slug\n    }\n    myTag\n  }\n}\n    ',
      variables: {
        questionSlug: titleSlug,
      },
      operationName: 'solutionTags',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.solutionTags,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
