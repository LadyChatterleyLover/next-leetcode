export interface UserStatus {
  avatar: string
  checkedInToday: boolean
  isAdmin: boolean
  isPhoneVerified: boolean
  isPremium: boolean
  isSignedIn: boolean
  isSuperuser: boolean
  isTranslator: boolean
  isVerified: boolean
  premiumExpiredAt: number
  realName: string
  useTranslation: boolean
  userSlug: string
  username: string
}

export interface ProblemDetail {
  categoryTitle: string
  difficulty: string
  dislikes: number
  isPaidOnly: boolean
  likes: number
  questionFrontendId: string
  questionId: string
  title: string
  titleSlug: string
}

export interface ProblemItem {
  acRate: number
  difficulty: string
  freqBar: string | null
  frontendQuestionId: string
  hasVideoSolution: boolean
  isFavor: boolean
  paidOnly: boolean
  questionId: string
  solutionNum: number
  status: string | null
  title: string
  titleCn: string
  titleSlug: string
  extra: {
    companyTagNum: number
    hasVideoSolution: boolean
  }
}

export interface CommentPost {
  content: string
  creationDate: number
  id: string
  isOwnPost: boolean
  mentionedUsers: any[]
  status: string
  updationDate: number
  voteStatus: number
  voteUpCount: number
  author: {
    isDiscussAdmin: boolean
    isDiscussStaff: boolean
    profile: {
      userSlug: string
      userAvatar: string
      realName: string
    }
    username: string
  }
}

export interface Comment {
  id: string
  ipRegion: string
  isEdited: boolean
  numChildren: number
  post: CommentPost
}

export interface Tag {
  name: string
  nameTranslated: string
  slug: string
}

export interface Solution {
  byLeetcode: boolean
  canEdit: boolean
  canEditReward: boolean
  canSee: boolean
  chargeType: string
  createdAt: string
  favoriteCount: number
  hasVideo: true
  hitCount: number
  identifier: string
  ipRegion: string
  isEditorsPick: boolean
  isMostPopular: boolean
  isMyFavorite: boolean
  reactionType: string | null
  author: {
    username: string
    profile: {
      userAvatar: string
      userSlug: string
      realName: string
      reputation: number
    }
  }
  reactionsV2: {
    count: number
    reactionType: string
  }[]
  rewardEnabled: any
  slug: string
  status: string
  summary: string
  sunk: boolean
  thumbnail: string
  title: string
  topic: {
    id: number
    commentCount: number
    viewCount: number
    pinned: boolean
  }
  upvoteCount: number
  uuid: string
  tags: {
    name: string
    nameTranslated: string
    slug: string
    tagType: string
  }[]
}

export interface Submission {
  id: string
  isPending: string
  lang: string
  langName: string
  memory: string
  runtime: string
  status: string
  statusDisplay: string
  submissionComment: string | null
  timestamp: string
  title: string
  url: string
}

export interface AnswerResult {
  code: string
  timestamp: number
  statusDisplay: string
  isMine: boolean
  runtimeDisplay: string
  memoryDisplay: string
  memory: string
  lang: string
  langVerboseName: string
  question: {
    questionId: string
    titleSlug: string
    hasFrontendPreview: boolean
  }
  user: {
    realName: string
    userAvatar: string
    userSlug: string
  }
  runtimePercentile: number
  memoryPercentile: number
  submissionComment: string | null
  passedTestCaseCnt: number
  totalTestCaseCnt: number
  fullCodeOutput: string | null
  testDescriptions: string | null
  outputDetail: {
    codeOutput: string
    expectedOutput: string
    input: string
    compileError: string
    runtimeError: string
    lastTestcase: string
  }
}
