import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { limit, skip } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'introducedJobList',
      variables: {
        limit,
        skip,
      },
      query:
        'query introducedJobList($limit: Int, $skip: Int) {\n  jobsCareerArticle(limit: $limit, skip: $skip) {\n    totalNum\n    articles {\n      identifier\n      resourceType\n      title\n      companyLogo\n      companyName\n      companyNameSlug\n      summary\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.jobsCareerArticle,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
