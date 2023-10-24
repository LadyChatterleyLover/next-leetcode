import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { contentType, subjectSlug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'communityRecommendTags',
      variables: {
        contentType,
        subjectSlug,
      },
      query:
        'query communityRecommendTags($contentType: ContentTypeEnum!, $subjectSlug: String) {\n  columnsRecommendedTags(contentType: $contentType, subjectSlug: $subjectSlug) {\n    name\n    nameTranslated\n    slug\n    imgUrl\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.columnsRecommendedTags,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
