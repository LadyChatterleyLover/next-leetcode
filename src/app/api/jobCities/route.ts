import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'jobCities',
      variables: {
        query: '',
      },
      query:
        'query jobCities($limit: Int, $query: String) {\n  jobCities(limit: $limit, query: $query) {\n    cityName\n    cityCode\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.jobCities,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
