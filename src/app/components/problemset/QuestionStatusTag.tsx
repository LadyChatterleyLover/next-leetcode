import { RightCircleOutlined } from '@ant-design/icons'
import QuestionTag from './QuestionTag'

const QuestionStatusTag = () => {
  return (
    <QuestionTag
      content={
        <div>
          <div className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626]'>
            <div className='flex h-5 items-center '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                fill='currentColor'
                className='mr-1 h-[14px] w-[14px]'
              >
                <path fillRule='evenodd' d='M4 12a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z' clipRule='evenodd'></path>
              </svg>
              <div className='ml-1'>未开始</div>
            </div>
          </div>
          <div className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626]'>
            <div className='flex h-5 items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='1em'
                height='1em'
                fill='currentColor'
                className='mr-1 h-[14px] w-[14px] text-[#2db55d]'
              >
                <path
                  fillRule='evenodd'
                  d='M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <div className='ml-1'>已解答</div>
            </div>
          </div>
          <div className='cursor-pointer select-none relative h-8 py-1.5 pl-2 pr-12 text-[#262626]'>
            <div className='flex h-5 items-center'>
              <RightCircleOutlined style={{ color: '#FFB800' }} />
              <div className='ml-2'>尝试过</div>
            </div>
          </div>
        </div>
      }
    >
      状态
    </QuestionTag>
  )
}

export default QuestionStatusTag
