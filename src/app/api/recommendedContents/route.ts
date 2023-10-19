import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { uuid } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'columnsRecommendedContents',
      variables: {
        uuid,
        contentType: 'LEETBOOK',
      },
      query:
        'query columnsRecommendedContents($contentType: RecommendedContentTypeEnum!, $uuid: ID!, $limit: Int) {\n  columnsRecommendedContents(contentType: $contentType, uuid: $uuid, limit: $limit) {\n    ... on RecommendedLeetbookNode {\n      slug\n      title\n      coverImg\n      totalStudied\n      commonTags {\n        slug\n        name\n        nameTranslated\n        __typename\n      }\n      author {\n        userSlug\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.columnsRecommendedContents,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
