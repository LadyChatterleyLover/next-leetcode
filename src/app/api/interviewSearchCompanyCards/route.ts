import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { keyWords, offset } = await req.json()
  try {
    const res = await axios.post(`https://leetcode.cn/graphql/noj-go/`, {
      query:
        '\n    query interviewSearchCompanyCards($in: InterviewSearchCompanyCardsInput!) {\n  interviewSearchCompanyCards(in: $in) {\n    cards {\n      id\n      companyInfo {\n        companyTag {\n          name\n          slug\n          translatedName\n          questionCount\n        }\n      }\n    }\n    hasMore\n  }\n}\n    ',
      variables: {
        in: {
          keyWords,
          offset,
          limit: 15,
        },
      },
      operationName: 'interviewSearchCompanyCards',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        list: res.data.data.interviewSearchCompanyCards.cards.map((item: any) => ({
          ...item.companyInfo.companyTag,
          id: item.companyInfo.id,
        })),
        hasMore: res.data.data.interviewSearchCompanyCards.hasMore,
      },
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
