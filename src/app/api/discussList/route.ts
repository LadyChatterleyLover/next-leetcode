import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { slug, isFeatured, pageNum, query } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'columnsAggregateArticles',
      variables: {
        query,
        filterTagSlugs: [slug],
        isFeatured,
        scope: 'ALL',
        pageNum,
      },
      query:
        'query columnsAggregateArticles($scope: AggregateScopeEnum!, $query: String, $filterTagSlugs: [String!], $isFeatured: Boolean, $pageNum: Int) {\n  columnsAggregateArticles(scope: $scope, query: $query, filterTagSlugs: $filterTagSlugs, isFeatured: $isFeatured, pageNum: $pageNum) {\n    totalNum\n    pageSize\n    nodes {\n      ... on ColumnArticleNode {\n        slug\n        uuid\n        title\n        hitCount\n        pinnedGlobally\n        pinned\n        articleSunk: sunk\n        createdAt\n        updatedAt\n        thumbnail\n        identifier\n        resourceType\n        articleType\n        score\n        subject {\n          title\n          slug\n          __typename\n        }\n        tags {\n          name\n          slug\n          nameTranslated\n          __typename\n        }\n        author {\n          username\n          profile {\n            userSlug\n            realName\n            userAvatar\n            __typename\n          }\n          __typename\n        }\n        reactionType\n        reactionsV2 {\n          count\n          reactionType\n          __typename\n        }\n        isMyFavorite\n        topic {\n          id\n          commentCount\n          __typename\n        }\n        summary\n        isEditorsPick\n        byLeetcode\n        status\n        favoriteCount\n        __typename\n      }\n      ... on QAQuestionNode {\n        uuid\n        slug\n        title\n        thumbnail\n        summary\n        content\n        qaSunk: sunk\n        pinned\n        pinnedGlobally\n        byLeetcode\n        isRecommended\n        isRecommendedGlobally\n        subscribed\n        hitCount\n        numAnswers\n        numPeopleInvolved\n        numSubscribed\n        createdAt\n        updatedAt\n        status\n        identifier\n        resourceType\n        articleType\n        alwaysShow\n        alwaysExpand\n        score\n        favoriteCount\n        isMyFavorite\n        isAnonymous\n        canEdit\n        reactionType\n        reactionsV2 {\n          count\n          reactionType\n          __typename\n        }\n        tags {\n          name\n          nameTranslated\n          slug\n          imgUrl\n          __typename\n        }\n        subject {\n          slug\n          title\n          __typename\n        }\n        contentAuthor {\n          username\n          userSlug\n          realName\n          avatar\n          __typename\n        }\n        realAuthor {\n          username\n          profile {\n            userSlug\n            realName\n            userAvatar\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.columnsAggregateArticles.nodes,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
