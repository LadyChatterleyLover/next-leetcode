import { useState } from 'react'
import { Popover } from 'antd'
import { DownOutlined } from '@ant-design/icons'

interface Props {
  content: React.ReactNode
  children: React.ReactNode
}
const QuestionTag: React.FC<Props> = ({ children, content }) => {
  const [flag, setFlag] = useState(false)
  return (
    <Popover
      placement='bottomLeft'
      content={content}
      trigger='click'
      arrow={false}
      overlayStyle={{ width: 320 }}
      onOpenChange={val => {
        setFlag(val)
      }}
    >
      <div className='items-center rounded px-3 py-1.5 text-left cursor-pointer whitespace-nowrap leading-5 bg-[#000a200d] text-[#262626bf] hover:bg-[#000a201a] flex w-full justify-between'>
        <div>{children}</div>
        <div>
          <DownOutlined className={`${flag ? 'rotate-180' : ''} transition duration-300`} />
        </div>
      </div>
    </Popover>
  )
}

export default QuestionTag
