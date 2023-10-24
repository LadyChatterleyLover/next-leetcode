import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { subjectSlug, isFeatured, pageNum, query, tags, sortType } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'qaQuestionList',
      variables: {
        subjectSlug,
        isFeatured,
        pageNum,
        query,
        tags,
        sortType,
      },
      query:
        'query qaQuestionList($subjectSlug: String!, $isFeatured: Boolean!, $query: String, $pageNum: Int, $tags: [String!], $sortType: CircleSortTypeEnum) {\n  qaQuestionList(subjectSlug: $subjectSlug, isFeatured: $isFeatured, query: $query, pageNum: $pageNum, filterTagSlugs: $tags, sortType: $sortType) {\n    totalNum\n    pageSize\n    nodes {\n      ...qaQuestion\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment qaQuestion on QAQuestionNode {\n  ipRegion\n  uuid\n  slug\n  title\n  thumbnail\n  summary\n  content\n  slateValue\n  sunk\n  pinned\n  pinnedGlobally\n  byLeetcode\n  isRecommended\n  isRecommendedGlobally\n  subscribed\n  hitCount\n  numAnswers\n  numPeopleInvolved\n  numSubscribed\n  createdAt\n  updatedAt\n  status\n  identifier\n  resourceType\n  articleType\n  alwaysShow\n  alwaysExpand\n  score\n  favoriteCount\n  isMyFavorite\n  isAnonymous\n  canEdit\n  reactionType\n  atQuestionTitleSlug\n  blockComments\n  reactionsV2 {\n    count\n    reactionType\n    __typename\n  }\n  tags {\n    name\n    nameTranslated\n    slug\n    imgUrl\n    tagType\n    __typename\n  }\n  subject {\n    slug\n    title\n    __typename\n  }\n  contentAuthor {\n    ...contentAuthor\n    __typename\n  }\n  realAuthor {\n    ...realAuthor\n    __typename\n  }\n  __typename\n}\n\nfragment contentAuthor on ArticleAuthor {\n  username\n  userSlug\n  realName\n  avatar\n  __typename\n}\n\nfragment realAuthor on UserNode {\n  username\n  profile {\n    userSlug\n    realName\n    userAvatar\n    __typename\n  }\n  __typename\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.qaQuestionList,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
