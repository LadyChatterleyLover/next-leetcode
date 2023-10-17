import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug, skip, numPerPage, orderBy } = await req.json()
  try {
    const result = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query boundTopicId($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    boundTopicId\n  }\n}\n    ',
      variables: {
        titleSlug,
      },
      operationName: 'boundTopicId',
    })
    const topicId = result.data.data.question.boundTopicId
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query questionDiscussComments($topicId: Int!, $orderBy: CommentOrderBy, $skip: Int!, $numPerPage: Int = 10) {\n  commonTopicComments(\n    topicId: $topicId\n    orderBy: $orderBy\n    skip: $skip\n    first: $numPerPage\n  ) {\n    edges {\n      node {\n        ...commentFields\n      }\n    }\n    totalNum\n  }\n}\n    \n    fragment commentFields on CommentRelayNode {\n  id\n  ipRegion\n  numChildren\n  isEdited\n  post {\n    id\n    content\n    voteUpCount\n    creationDate\n    updationDate\n    status\n    voteStatus\n    isOwnPost\n    author {\n      username\n      isDiscussAdmin\n      isDiscussStaff\n      profile {\n        userSlug\n        userAvatar\n        realName\n      }\n    }\n    mentionedUsers {\n      key\n      username\n      userSlug\n      nickName\n    }\n  }\n}\n    ',
      variables: {
        topicId,
        skip,
        numPerPage,
        orderBy,
      },
      operationName: 'questionDiscussComments',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        list: res.data.data.commonTopicComments.edges,
        total: res.data.data.commonTopicComments.totalNum,
      },
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
