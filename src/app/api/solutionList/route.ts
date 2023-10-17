import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { titleSlug, skip = 0, first = 15, orderBy = 'DEFAULT', userInput = '', tagSlugs = [] } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query questionTopicsList($questionSlug: String!, $skip: Int, $first: Int, $orderBy: SolutionArticleOrderBy, $userInput: String, $tagSlugs: [String!]) {\n  questionSolutionArticles(\n    questionSlug: $questionSlug\n    skip: $skip\n    first: $first\n    orderBy: $orderBy\n    userInput: $userInput\n    tagSlugs: $tagSlugs\n  ) {\n    totalNum\n    edges {\n      node {\n        ipRegion\n        rewardEnabled\n        canEditReward\n        uuid\n        title\n        slug\n        sunk\n        chargeType\n        status\n        identifier\n        canEdit\n        canSee\n        reactionType\n        hasVideo\n        favoriteCount\n        upvoteCount\n        reactionsV2 {\n          count\n          reactionType\n        }\n        tags {\n          name\n          nameTranslated\n          slug\n          tagType\n        }\n        createdAt\n        thumbnail\n        author {\n          username\n          profile {\n            userAvatar\n            userSlug\n            realName\n            reputation\n          }\n        }\n        summary\n        topic {\n          id\n          commentCount\n          viewCount\n          pinned\n        }\n        byLeetcode\n        isMyFavorite\n        isMostPopular\n        isEditorsPick\n        hitCount\n        videosInfo {\n          videoId\n          coverUrl\n          duration\n        }\n      }\n    }\n  }\n}\n    ',
      variables: {
        questionSlug: titleSlug,
        skip,
        first,
        orderBy,
        userInput,
        tagSlugs,
      },
      operationName: 'questionTopicsList',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: {
        list: res.data.data.questionSolutionArticles.edges.map((item: any) => item.node),
        total: res.data.data.questionSolutionArticles.totalNum,
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
