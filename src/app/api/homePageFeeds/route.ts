import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { channelId } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      query:
        '\n    query homePageFeeds($channelId: Int, $nextCursor: String, $nextPage: Int, $offset: Int) {\n  homeFeedPlainContents(channelId: $channelId, nextCursor: $nextCursor) {\n    nextCursor\n    items {\n      contentType\n      authorId\n      authorNickname\n      authorAvatarUrl\n      authorSlug\n      contentTitle\n      contentSlug\n      contentUuid\n      contentSummary\n      publishTimestamp\n      contentUpvoteCount\n      contentCommentCount\n      contentCollectCount\n      contentCoverUrl\n      isUpvoted\n      isCollected\n      isCommented\n    }\n  }\n  homeFeedProblems(channelId: $channelId, offset: $offset) {\n    contentType\n    offset\n    problemSlug\n    problemTitle\n    recommendationReason\n    solutions {\n      authorAvatarUrl\n      authorName\n      authorSlug\n      slug\n      summary\n      title\n      id\n    }\n  }\n  homeFeedCompanies(channelId: $channelId, nextPage: $nextPage) {\n    nextPage\n    contentType\n    companies {\n      name\n      slug\n      logoUrl\n      popularity\n      trending\n    }\n  }\n}\n    ',
      variables: channelId
        ? {
            channelId,
          }
        : {},
      operationName: 'homePageFeeds',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
