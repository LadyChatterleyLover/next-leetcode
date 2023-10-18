import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'topicTagCompanyFreqInfo',
      variables: {
        slug,
      },
      query:
        'query topicTagCompanyFreqInfo($slug: String!) {\n  topicTagCompanyFreqInfo(slug: $slug) {\n    tags {\n      translatedName\n      name\n      slug\n      imgUrl\n      highFreqQuestionTags {\n        translatedName\n        name\n        slug\n        __typename\n      }\n      __typename\n    }\n    overallFrequency {\n      maxFreq\n      globalMaxFreq\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.topicTagCompanyFreqInfo,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
