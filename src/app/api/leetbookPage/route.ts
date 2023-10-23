import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { pageId } = await req.json()
  try {
    const res = await axios.post('https://leetcode.cn/graphql/', {
      operationName: 'leetbookPageDetail',
      variables: {
        pageId,
      },
      query:
        'query leetbookPageDetail($pageId: ID!) {\n  leetbookPage(pageId: $pageId) {\n    title\n    subtitle\n    id\n    pageType\n    blocks {\n      type\n      value\n      __typename\n    }\n    commonTags {\n      nameTranslated\n      name\n      slug\n      __typename\n    }\n    qaQuestionUuid\n    ...leetbookQuestionPageNode\n    __typename\n  }\n}\n\nfragment leetbookQuestionPageNode on LeetbookQuestionPage {\n  question {\n    questionId\n    envInfo\n    judgeType\n    metaData\n    enableRunCode\n    sampleTestCase\n    judgerAvailable\n    langToValidPlayground\n    questionFrontendId\n    style\n    content\n    translatedContent\n    questionType\n    questionTitleSlug\n    editorType\n    mysqlSchemas\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    topicTags {\n      slug\n      name\n      translatedName\n      __typename\n    }\n    jsonExampleTestcases\n    __typename\n  }\n  __typename\n}\n',
    })
    return NextResponse.json({
      code: 200,
      msg: '获取成功',
      data: res.data.data.leetbookPage,
    })
  } catch (err) {
    return NextResponse.json({
      code: 500,
      msg: '获取失败',
      data: err,
    })
  }
}
