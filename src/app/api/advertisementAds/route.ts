import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'advertisementAds',
      variables: {
        pageSlug: 'mock-interview',
      },
      query:
        'query advertisementAds($pageSlug: String!, $customType: AdCustomTypeEnum, $customId: ID) {\n  advertisementAdsByPage(pageSlug: $pageSlug, customType: $customType, customId: $customId) {\n    ads {\n      ... on AdvertisementItemNode {\n        name\n        image\n        link\n        isTagShown\n        __typename\n      }\n      __typename\n    }\n    position {\n      name\n      displayStyle\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.advertisementAdsByPage[0].ads,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
