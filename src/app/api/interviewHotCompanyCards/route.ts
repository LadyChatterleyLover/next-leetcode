import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { offset, limit } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/noj-go', {
      operationName: 'InterviewHotCompanyCards',
      variables: {
        in: {
          offset,
          limit,
        },
      },
      query:
        'query InterviewHotCompanyCards($in: InterviewHotCompanyCardsInput!) {\n  interviewHotCompanyCards(in: $in) {\n    hasMore\n    total\n    cards {\n      id\n      hotScore\n      acRate\n      isPremiumOnly\n      privilegeExpiresAt\n      companyInfo {\n        submissionUsers {\n          realName\n          userSlug\n          userAvatar\n          __typename\n        }\n        submissionUserNum\n        mostFreqQuestion {\n          title\n          frontendId\n          titleSlug\n          titleCn\n          __typename\n        }\n        companyTag {\n          name\n          slug\n          imgUrl\n          translatedName\n          questionCount\n          __typename\n        }\n        jobCompany {\n          jobPostingCount\n          isVerified\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.interviewHotCompanyCards,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
