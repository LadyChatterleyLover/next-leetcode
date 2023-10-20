import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'leetbookHotBooks',
      variables: {
        bookSlug: slug,
        size: 3,
      },
      query:
        'query leetbookHotBooks($bookSlug: String!, $size: Int!) {\n  leetbookHotBooks(bookSlug: $bookSlug, size: $size) {\n    ...leetbookBriefNode\n    __typename\n  }\n}\n\nfragment leetbookBriefNode on LeetbookBriefBookNode {\n  id\n  slug\n  title\n  coverImg\n  description\n  ownedType\n  isFavorite\n  totalStudied\n  visibility\n  author {\n    realName\n    title\n    bio\n    avatar\n    userSlug\n    __typename\n  }\n  chapterNum\n  pageNum\n  premiumOnlyPageNum\n  progress {\n    numCompleted\n    numCompletedPremium\n    accessedAt\n    __typename\n  }\n  productInfo {\n    allowBorrow\n    premiumOnly\n    product {\n      id\n      slug\n      price\n      hasPremiumPrice\n      premiumPrice\n      discounts {\n        id\n        availableAfter\n        availableBefore\n        price\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  forSaleAt\n  lastNewPageForSaleAt\n  commonTags {\n    nameTranslated\n    name\n    slug\n    __typename\n  }\n  __typename\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.leetbookHotBooks,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
