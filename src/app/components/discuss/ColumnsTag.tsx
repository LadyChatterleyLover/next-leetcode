'use client'

import { ColumnsTagItem } from '@/app/types'

interface Props {
  columnsTagList: ColumnsTagItem[]
}

const ColumnsTag: React.FC<Props> = ({ columnsTagList }) => {
  return columnsTagList.length ? (
    <div className='flex items-center gap-5 my-6'>
      {columnsTagList.map(item => {
        return (
          <div
            key={item.slug}
            className='bg-[#000a200c] px-2 text-xs h-6 text-[#007aff] flex items-center justify-center rounded-full cursor-pointer'
          >
            {item.name}
          </div>
        )
      })}
    </div>
  ) : null
}

export default ColumnsTag
