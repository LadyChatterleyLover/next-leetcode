import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { chinaCity, limit, skip, postingType } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'officialJobList',
      variables: {
        chinaCity,
        limit,
        skip,
        postingType,
      },
      query:
        'query officialJobList($categoryId: String, $chinaCity: [Int], $limit: Int, $postingType: JobPostingTypeEnum, $skip: Int, $tagId: String, $subCategoryId: String) {\n  jobsOfficialPostings(categoryId: $categoryId, chinaCity: $chinaCity, postingType: $postingType, limit: $limit, skip: $skip, subCategoryId: $subCategoryId, tagId: $tagId) {\n    count\n    jobs {\n      chinaCity\n      companyLogo\n      chinaCityDisplay\n      companyName\n      companySlug\n      educationDisplay\n      hasApplyQualification\n      isHot\n      isRecommended\n      postingType\n      publishedAt\n      salaryMax\n      salaryDisplay\n      salaryMin\n      salaryNegotiable\n      shortlists {\n        config\n        expiresAt\n        name\n        slug\n        __typename\n      }\n      status\n      title\n      uuid\n      workExperienceDisplay\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.jobsOfficialPostings,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
