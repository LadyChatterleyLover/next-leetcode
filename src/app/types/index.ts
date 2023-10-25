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
  translatedTitle: string
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

export interface DiscussItem {
  alwaysExpand: boolean
  alwaysShow: boolean
  articleType: string
  byLeetcode: boolean
  canEdit: boolean
  content: string
  ipRegion: string
  contentAuthor: {
    avatar: string
    realName: string
    userSlug: string
    username: string
    __typename: string
  }
  reactionsV2: {
    count: number
    reactionType: string
    __typename: string
  }[]
  createdAt: string
  favoriteCount: number
  hitCount: number
  identifier: string
  isAnonymous: boolean
  isMyFavorite: boolean
  isRecommended: boolean
  isRecommendedGlobally: boolean
  numAnswers: number
  numPeopleInvolved: number
  numSubscribed: number
  pinned: boolean
  pinnedGlobally: boolean
  qaSunk: boolean
  reactionType: string
  realAuthor: string | null
  resourceType: string
  score: string | null
  slug: string
  status: string
  subject: {
    slug: string
    title: string
    __typename: string
  }
  subscribed: boolean
  summary: string
  tags: {
    imgUrl: string | null
    name: string
    nameTranslated: string
    slug: string
    __typename: string
  }[]
  thumbnail: string
  title: string
  updatedAt: string | null
  uuid: string
  __typename: string
}

export interface Book {
  coverImg: string
  slug: string
  title: string
  totalStudied: number
  __typename: string
  commonTags: {
    imgUrl: string | null
    nameTranslated: string
    name: string
    slug: string
    __typename: string
  }[]
}

export interface SubCategory {
  bookIds: string
  id: string
  name: string
  ids: number[]
  bookList: LeetBook[]
  __typename: string
}

export interface Category {
  id: string
  name: string
  subcategories: SubCategory[]
}

export interface Author1 {
  bio: string
  title: string
  user: {
    realName: string
    userSlug: string
    userAvatar: string
    __typename: string
  }
}

export interface Author2 {
  avatar: string
  bio: string
  realName: string
  title: string
  userSlug: string
  __typename: string
}
export interface LeetBook {
  chapterNum: number
  summary: {
    content: string
  }
  workStatus: string
  readTime: number
  author: Author1 | Author2
  commonTags: {
    name: string
    nameTranslated: string
    slug: string
    __typename: string
  }[]
  descBlocks: {
    content: string
    title: string
    type: string
    __typename: string
  }[]
  coverImg: string
  description: string
  forSaleAt: string
  id: string
  lastNewPageForSaleAt: string
  ownedType: string
  pageNum: number
  productInfo: {
    premiumOnly: boolean
    allowBorrow: boolean
    product: {
      id: string
      slug: string
      price: number
      premiumPrice: number
      discounts: string | null
      __typename: string
    }
    __typename: string
  }
  progress: {
    numCompleted: number
    numCompletedPremium: number
    startedAt: string
    __typename: string
  } | null
  recommendation: string
  slug: string
  title: string
  totalStudied: number
  __typename: string
}

export interface LeetBookPage {
  id: string
  isDraft: boolean
  isGreyTitle: boolean
  isSample: boolean
  isTitleHidden: boolean
  order: number
  pageType: string
  parentId: string | null
  premiumOnly: boolean
  prerequisite: string | null
  publishedAt: string | null
  qaQuestionUuid: string | null
  title: string
  collapse: boolean
  __typename: string
  children: LeetBookPage[]
}

export interface HomeFeedCompanies {
  logoUrl: string
  name: string
  popularity: number
  slug: string
  trending: number
}

export interface HomeFeedPlainContents {
  authorAvatarUrl: string
  authorId: number
  authorNickname: string
  authorSlug: string
  contentCollectCount: number
  contentCommentCount: number
  contentCoverUrl: string
  contentSlug: string
  contentSummary: string
  contentTitle: string
  contentType: string
  contentUpvoteCount: number
  contentUuid: string
  isCollected: boolean
  isCommented: boolean
  isUpvoted: boolean
  publishTimestamp: number
}

export interface HomeFeedProblems {
  contentType: string
  offset: number
  problemSlug: string
  problemTitle: string
  recommendationReason: string
  solutions: {
    authorAvatarUrl: string
    authorName: string
    authorSlug: string
    id: number
    slug: string
    summary: string
    title: string
  }[]
}

export interface PicCardItem {
  cardImg: string
  containsPremium: boolean
  description: string
  duration: number
  isLightCardFontColor: boolean
  isVirtual: boolean
  originStartTime: number
  startTime: number
  title: string
  titleSlug: string
  __typename: string
}

export interface LocalRank {
  attendedContestCount: number
  currentRatingRanking: number
  dataRegion: string
  isDeleted: boolean
  user: {
    realName: string
    userAvatar: string
    userSlug: string
    __typename: string
  }
  __typename: string
}

export interface GlobalRank {
  currentGlobalRanking: number
  dataRegion: string
  isDeleted: boolean
  ranking: string
  user: {
    profile: {
      countryCode: string | null
      countryName: string | null
      realName: string
      userAvatar: string
      userSlug: string
      __typename: string
    }
    username: string
    __typename: string
  }
  __typename: string
}

export interface Contests {
  cardImg: string
  containsPremium: boolean
  description: string
  duration: number
  isEeExamContest: boolean
  isVirtual: boolean
  originStartTime: number
  startTime: number
  title: string
  titleSlug: string
  __typename: string
  company: {
    watermark: string
    __typename: string
  }
}

export interface ColumnsTagItem {
  imgUrl: string
  name: string
  nameTranslated: string
  slug: string
  __typename: string
}

export interface CompanyCard {
  hotScore: number
  id: string
  isPremiumOnly: boolean
  privilegeExpiresAt: string | null
  __typename: string
  acRate: number
  companyInfo: {
    companyTag: {
      imgUrl: string
      name: string
      questionCount: number
      slug: string
      translatedName: string
      __typename: string
    }
    jobCompany: {
      isVerified: boolean
      jobPostingCount: number
      __typename: string
    }
    mostFreqQuestion: {
      frontendId: string
      title: string
      titleCn: string
      titleSlug: string
      __typename: string
    }
    submissionUsers: {
      realName: string
      userAvatar: string
      userSlug: string
      __typename: string
    }[]
    submissionUserNum: number
  }
}

export interface Job {
  chinaCity: string
  chinaCityDisplay: string
  companyLogo: string
  companyName: string
  companySlug: string
  educationDisplay: string
  hasApplyQualification: boolean
  isHot: boolean
  isRecommended: boolean
  postingType: string
  publishedAt: string
  salaryDisplay: string
  salaryMax: string | null
  salaryMin: string | null
  salaryNegotiable: boolean
  shortlists: string[]
  status: number
  title: string
  uuid: string
  workExperienceDisplay: string
  __typename: string
}

export interface JobArticle {
  companyLogo: string
  companyName: string
  companyNameSlug: string
  identifier: string
  resourceType: string
  summary: string
  title: string
  __typename: string
}
