import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'tagLeetbook',
      variables: {
        tagSlugs: [slug],
      },
      query:
        'query tagLeetbook($tagSlugs: [String!]!) {\n  leetbookSubjectBooksV2(tagSlugs: $tagSlugs, limit: 3, offset: 0, orderBy: NORMAL, premiumFree: false, terminal: WEB) {\n    data {\n      coverImg\n      slug\n      title\n      totalStudied\n      commonTags {\n        imgUrl\n        nameTranslated\n        name\n        slug\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.leetbookSubjectBooksV2.data,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
