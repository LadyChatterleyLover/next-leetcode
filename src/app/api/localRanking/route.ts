import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { pageNum = 1 } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: null,
      variables: {},
      query: `{\n  localRankingV2(page: ${pageNum}) {\n    myRank {\n      attendedContestCount\n      currentRatingRanking\n      dataRegion\n      isDeleted\n      user {\n        realName\n        userAvatar\n        userSlug\n        __typename\n      }\n      __typename\n    }\n    page\n    totalUsers\n    userPerPage\n    rankingNodes {\n      attendedContestCount\n      currentRatingRanking\n      dataRegion\n      isDeleted\n      user {\n        realName\n        userAvatar\n        userSlug\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n`,
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.localRankingV2,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
