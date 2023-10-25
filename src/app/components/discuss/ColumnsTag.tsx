'use client'

import { ColumnsTagItem } from '@/app/types'

interface Props {
  columnsTagList: ColumnsTagItem[]
  tags: string[]
  setTags: (tags: string[]) => void
}

const ColumnsTag: React.FC<Props> = ({ columnsTagList, tags, setTags }) => {
  return columnsTagList.length ? (
    <div className='flex items-center gap-5 my-6'>
      {columnsTagList.map(item => {
        return (
          <div
            key={item.slug}
            className={`bg-[#000a200c] px-2 text-xs h-6 flex items-center justify-center rounded-full cursor-pointer ${
              tags.includes(item.slug) ? 'bg-[#007aff] text-white' : ''
            }`}
            onClick={() => {
              let arr = [...tags]
              if (arr.includes(item.slug)) {
                arr = arr.filter(tag => tag !== item.slug)
              } else {
                arr.push(item.slug)
              }
              setTags([...arr])
            }}
          >
            {item.name}
          </div>
        )
      })}
    </div>
  ) : null
}

export default ColumnsTag
