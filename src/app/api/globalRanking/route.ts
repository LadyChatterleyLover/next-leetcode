import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: null,
      variables: {},
      query:
        '{\n  globalRanking(page: 1) {\n    totalUsers\n    userPerPage\n    myRank {\n      ranking\n      currentGlobalRanking\n      dataRegion\n      isDeleted\n      user {\n        username\n        profile {\n          userSlug\n          userAvatar\n          countryCode\n          countryName\n          realName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    rankingNodes {\n      ranking\n      currentGlobalRanking\n      dataRegion\n      isDeleted\n      user {\n        username\n        profile {\n          userSlug\n          userAvatar\n          countryCode\n          countryName\n          realName\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.globalRanking,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
