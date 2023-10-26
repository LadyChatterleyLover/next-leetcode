import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'storeMerchandiseListForSale',
      variables: {},
      query:
        'query storeMerchandiseListForSale {\n  storeMerchandiseListForSale {\n    daysOfMembership\n    name\n    slug\n    description\n    coinValue\n    images\n    isVirtual\n    category {\n      slug\n      name\n      __typename\n    }\n    specs\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.storeMerchandiseListForSale,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
