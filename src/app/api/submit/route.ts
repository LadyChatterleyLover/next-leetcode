import axios from 'axios'
import { NextResponse } from 'next/server'

async function sleep() {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1500)
  })
}

export async function POST(req: Request) {
  const { lang, questionId, code, slugTitle } = await req.json()
  axios.interceptors.request.use(config => {
    config.headers.Referer = `https://leetcode-cn.com/problems/${slugTitle}/submissions/`
    config.headers.Cookie = `csrftoken=${process.env.csrftoken};LEETCODE_SESSION=${process.env.LEETCODE_SESSION};`
    return config
  })
  try {
    const submitRes = await axios.post(
      `https://leetcode.cn/problems/${slugTitle}/submit/`,
      {
        lang,
        question_id: questionId,
        typed_code: code,
      },
      {
        withCredentials: true,
      }
    )
    const submission_id = submitRes.data.submission_id
    await sleep()
    const res = await axios.get(`https://leetcode.cn/submissions/detail/${submission_id}/check/`)
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        result: res.data,
        submissionId: submission_id,
      },
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
