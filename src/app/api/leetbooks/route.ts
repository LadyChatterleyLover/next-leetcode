import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { ids } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/noj-go', {
      operationName: 'leetbooksByIds',
      variables: {
        ids,
      },
      query:
        'query leetbooksByIds($ids: [Int!]) {\n  leetbooksByIds(bookIds: $ids) {\n    id\n    slug\n    title\n    coverImg\n    description\n    totalStudied\n    recommendation\n    totalStudied\n    ownedType\n    author {\n      user {\n        realName\n        userSlug\n        userAvatar\n        __typename\n      }\n      title\n      bio\n      __typename\n    }\n    chapterNum\n    pageNum\n    progress {\n      numCompleted\n      numCompletedPremium\n      accessedAt\n      __typename\n    }\n    productInfo {\n      premiumOnly\n      allowBorrow\n      product {\n        id\n        slug\n        price\n        premiumPrice\n        discounts {\n          id\n          availableAfter\n          availableBefore\n          price\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    forSaleAt\n    lastNewPageForSaleAt\n    commonTags {\n      nameTranslated\n      name\n      slug\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.leetbooksByIds,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
