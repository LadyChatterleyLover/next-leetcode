import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'leetbookCatalog',
      variables: {
        bookSlug: slug,
      },
      query:
        'query leetbookCatalog($bookSlug: String!) {\n  leetbookBookDetail(bookSlug: $bookSlug) {\n    id\n    title\n    coverImg\n    ownedType\n    pages(showDraft: true) {\n      ...leetbookPageInfoNode\n      __typename\n    }\n    productInfo {\n      allowBorrow\n      premiumOnly\n      product {\n        price\n        premiumPrice\n        hasPremiumPrice\n        __typename\n      }\n      __typename\n    }\n    author {\n      realName\n      userSlug\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment leetbookPageInfoNode on LeetbookPageInfoNode {\n  title\n  id\n  pageType\n  prerequisite {\n    id\n    title\n    pageType\n    __typename\n  }\n  premiumOnly\n  isSample\n  isDraft\n  isTitleHidden\n  parentId\n  order\n  qaQuestionUuid\n  publishedAt\n  isGreyTitle\n  __typename\n}\n',
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
