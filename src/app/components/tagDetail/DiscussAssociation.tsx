import { DiscussItem } from '@/app/types'
import { Divider } from 'antd'
import { useRouter } from 'next/navigation'

interface Props {
  detail: DiscussItem
}

const DiscussAssociation: React.FC<Props> = ({ detail }) => {
  const router = useRouter()
  return (
    detail && (
      <div
        className='bg-white px-3 py-4 rounded-lg w-[260px]'
        style={{ boxShadow: '0 2px 8px rgba(0,0,0, 0.08),0 1px 2px rgba(0,0,0, 0.1)' }}
      >
        <div className='flex flex-col gap-y-5'>
          <div className='flex items-center justify-between w-full'>
            <div className='text-[#8c8c8c] text-sm'>收藏人数</div>
            <div className='bg-[#f7f7f7] text-[#262626] rounded px-2 leading-5 text-sm'>{detail.favoriteCount}</div>
          </div>
          <div className='flex items-center justify-between w-full'>
            <div className='text-[#8c8c8c] text-sm'>参与人数</div>
            <div className='bg-[#f7f7f7] text-[#262626] rounded px-2 leading-5 text-sm'>{detail.numAnswers}</div>
          </div>
          <div className='flex items-center justify-between w-full'>
            <div className='text-[#8c8c8c] text-sm'>浏览人数</div>
            <div className='bg-[#f7f7f7] text-[#262626] rounded px-2 leading-5 text-sm'>
              {Number(detail.hitCount / 100).toFixed(1)}K
            </div>
          </div>
        </div>
        <Divider></Divider>
        <div className='leading-5 text-[#8c8c8c] text-sm mb-3'>相关标签</div>
        <div className='flex flex-wrap gap-2'>
          <div className='flex justify-center items-center leading-5 text-xs px-2 min-w-10 rounded-[10px] text-[#5ab726] bg-[#def0d3]'>
            推荐
          </div>
          {detail.tags.map((tag, index) => {
            return (
              <div
                key={index}
                className='flex justify-center items-center leading-5 text-xs px-2 min-w-10 rounded-[10px] text-[#262626] bg-[#000a200c] hover:bg-[#000a2019] cursor-pointer'
                onClick={() => {
                  router.push(`/tag/${tag.slug}`)
                }}
              >
                {tag.nameTranslated || tag.name}
              </div>
            )
          })}
        </div>
      </div>
    )
  )
}

export default DiscussAssociation
