import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'leetbookDetail',
      variables: {
        bookSlug: slug,
      },
      query:
        'query leetbookDetail($bookSlug: String!) {\n  leetbookBookDetail(bookSlug: $bookSlug) {\n    ...leetbookDetailNode\n    __typename\n  }\n}\n\nfragment leetbookDetailNode on LeetbookDetailBookNode {\n  id\n  slug\n  title\n  coverImg\n  description\n  ownedType\n  visibility\n  isFavorite\n  totalStudied\n  chapterNum\n  pageNum\n  premiumOnlyPageNum\n  readTime\n  workStatus\n  subjects {\n    name\n    __typename\n  }\n  author {\n    realName\n    title\n    bio\n    avatar\n    userSlug\n    __typename\n  }\n  progress {\n    numCompleted\n    numCompletedPremium\n    startedAt\n    __typename\n  }\n  productInfo {\n    allowBorrow\n    premiumOnly\n    product {\n      id\n      slug\n      price\n      hasPremiumPrice\n      premiumPrice\n      discounts {\n        id\n        availableAfter\n        availableBefore\n        price\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  descBlocks {\n    content\n    title\n    type\n    __typename\n  }\n  summary {\n    content\n    type\n    __typename\n  }\n  commonTags {\n    nameTranslated\n    name\n    slug\n    tagType\n    __typename\n  }\n  forSaleAt\n  companyForm {\n    company {\n      name\n      slug\n      __typename\n    }\n    windowName\n    formTitle\n    formDesc\n    formFields {\n      displayName\n      keyName\n      valueType\n      valueMaxLimit\n      required\n      order\n      placeholder\n      options {\n        key\n        label\n        __typename\n      }\n      __typename\n    }\n    myExtraInfo\n    displayInLbDetail\n    displayBeforeOwning\n    __typename\n  }\n  __typename\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.leetbookBookDetail,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
