import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'getTag',
      variables: {
        slug,
      },
      query:
        'query getTag($slug: String!) {\n  wikiEntry(slug: $slug) {\n    tag {\n      name\n      slug\n      nameTranslated\n      imgUrl\n      tagType\n      __typename\n    }\n    content\n    isPublic\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.wikiEntry,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
