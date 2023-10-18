import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  axios.interceptors.request.use(config => {
    config.headers.Cookie = `csrftoken=${process.env.csrftoken};LEETCODE_SESSION=${process.env.LEETCODE_SESSION}`
    return config
  })
  try {
    const res = await axios.get(
      'https://questions.leetcode.cn/production/20231018090004_questions_include_main_regular_user.json',
      {
        withCredentials: true,
        responseType: 'text',
      }
    )
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: JSON.parse(res.data),
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
