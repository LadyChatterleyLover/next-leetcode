import QuestionTag from './QuestionTag'

const QuestionDifficultyTag = () => {
  return (
    <QuestionTag
      content={
        <div>
          <div className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626]'>
            <div className='flex h-5 items-center text-[#00af9b]'>简单</div>
          </div>
          <div className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626]'>
            <div className='flex h-5 items-center text-[#ffb800]'>中等</div>
          </div>
          <div className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626]'>
            <div className='flex h-5 items-center text-[#ff2d55]'>困难</div>
          </div>
        </div>
      }
    >
      难度
    </QuestionTag>
  )
}

export default QuestionDifficultyTag
