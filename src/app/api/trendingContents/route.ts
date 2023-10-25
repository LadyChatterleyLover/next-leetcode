import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { subListSlug } = await req.json()
  try {
    const res = await axios.post(`https://leetcode.cn/graphql/`, {
      operationName: 'trendingContents',
      variables: {
        skip: 0,
        limit: 10,
        subListSlug,
      },
      query:
        'query trendingContents($limit: Int!, $skip: Int!, $subListSlug: String!) {\n  trendingContents(limit: $limit, skip: $skip, subListSlug: $subListSlug) {\n    ... on TrendingQuestionNode {\n      companyTags {\n        slug\n        imgUrl\n        __typename\n      }\n      companyTagCount\n      otherTags {\n        name\n        nameTranslated\n        slug\n        __typename\n      }\n      otherTagCount\n      difficulty\n      translatedTitle\n      title\n      titleSlug\n      __typename\n    }\n    ... on TrendingQAOrArticleNode {\n      author {\n        name\n        userSlug\n        avatar\n        __typename\n      }\n      uuid\n      summary\n      title\n      createdAt\n      articleType\n      __typename\n    }\n    ... on TrendingSolutionNode {\n      videoCoverUrl\n      author {\n        name\n        userSlug\n        __typename\n      }\n      questionSlug\n      questionTitle\n      translatedQuestionTitle\n      title\n      slug\n      createdAt\n      __typename\n    }\n    ... on TrendingTagNode {\n      name\n      nameTranslated\n      slug\n      tagType\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.trendingContents,
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
