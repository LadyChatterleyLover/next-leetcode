import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { orderBy, uuid, pageNum } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'qaAnswerListV2',
      variables: {
        questionUuid: uuid,
        orderBy,
        pageNum,
      },
      query:
        'query qaAnswerListV2($questionUuid: String!, $pageNum: Int!, $orderBy: QAOrderEnum!) {\n  qaAnswerListV2(questionUuid: $questionUuid, pageNum: $pageNum, orderBy: $orderBy) {\n    totalNum\n    pageSize\n    nodes {\n      ...qaAnswer\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment qaAnswer on QAAnswerNode {\n  ipRegion\n  uuid\n  slug\n  createdAt\n  thumbnail\n  summary\n  status\n  identifier\n  resourceType\n  content\n  slateValue\n  isEditorsPick\n  articleType\n  sunk\n  pinned\n  isAnonymous\n  canEdit\n  contentAuthor {\n    ...contentAuthor\n    __typename\n  }\n  realAuthor {\n    ...realAuthor\n    __typename\n  }\n  reactionType\n  reactionsV2 {\n    count\n    reactionType\n    __typename\n  }\n  isMyFavorite\n  favoriteCount\n  parent {\n    uuid\n    title\n    pinned\n    pinnedGlobally\n    score\n    tags {\n      name\n      nameTranslated\n      slug\n      imgUrl\n      tagType\n      __typename\n    }\n    __typename\n  }\n  topic {\n    id\n    commentCount\n    lastComment {\n      post {\n        creationDate\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  totalRepliesNum\n  replyTo {\n    uuid\n    content\n    summary\n    isAnonymous\n    contentAuthor {\n      ...contentAuthor\n      __typename\n    }\n    realAuthor {\n      ...realAuthor\n      __typename\n    }\n    isDeleted\n    __typename\n  }\n  __typename\n}\n\nfragment contentAuthor on ArticleAuthor {\n  username\n  userSlug\n  realName\n  avatar\n  __typename\n}\n\nfragment realAuthor on UserNode {\n  username\n  profile {\n    userSlug\n    realName\n    userAvatar\n    __typename\n  }\n  __typename\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        list: res.data.data.qaAnswerListV2.nodes,
        total: res.data.data.qaAnswerListV2.totalNum,
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
