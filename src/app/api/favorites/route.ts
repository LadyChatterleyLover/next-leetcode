import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.get(`https://leetcode.cn/problems/api/favorites/`)
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data,
    })
  } catch (err) {
    console.log('err', err)
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
