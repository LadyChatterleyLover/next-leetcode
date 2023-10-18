import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST() {
  axios.interceptors.request.use(config => {
    config.headers.Cookie = `csrftoken=${process.env.csrftoken};LEETCODE_SESSION=${process.env.LEETCODE_SESSION};`
    return config
  })
  try {
    const res = await axios.post(
      `https://leetcode.cn/graphql/noj-go/`,
      {
        query:
          '\n    query globalData {\n  userStatus {\n    isSignedIn\n    isPremium\n    username\n    realName\n    avatar\n    userSlug\n    isAdmin\n    checkedInToday\n    useTranslation\n    premiumExpiredAt\n    isTranslator\n    isSuperuser\n    isPhoneVerified\n    isVerified\n  }\n  jobsMyCompany {\n    nameSlug\n  }\n}\n    ',
        variables: {},
        operationName: 'globalData',
      },
      {
        withCredentials: true,
      }
    )
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.userStatus,
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
