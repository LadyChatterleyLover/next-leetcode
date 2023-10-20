import { LeetBook } from '@/app/types'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  bookDetail: LeetBook
}

const BookInfo: React.FC<Props> = ({ bookDetail }) => {
  const router = useRouter()
  return (
    bookDetail && (
      <>
        <div className='flex items-center gap-x-2'>
          <div
            className='text-sm text-[#00000072] cursor-pointer'
            onClick={() => {
              router.push('/')
            }}
          >
            LeetBook 列表
          </div>
          <div>/</div>
          <div className='text-sm'>{bookDetail.title}</div>
        </div>
        <div className='flex gap-x-5'>
          <div className='flex gap-x-4 mt-4'>
            <Image alt='coverImg' src={bookDetail.coverImg} width={150} height={200}></Image>
            <div className='flex flex-col gap-y-2'>
              <div className='font-bold text-2xl'>{bookDetail.title}</div>
              <div className='line-clamp-2 text-sm leading-6'>{bookDetail.description}</div>
              <div className='mt-8 mb-2 flex items-center justify-end gap-x-1 text-xs'>
                <div className='font-[500]'>{bookDetail.totalStudied} 人</div>
                <div className='text-[#595959]'>已读</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex justify-center items-center bg-white cursor-pointer text-[#262626] rounded py-2 px-[30px] gap-x-2'>
                  阅读
                </div>
                <div className='flex items-center gap-x-3'>
                  <div className='flex justify-center items-center bg-white cursor-pointer text-[#262626] rounded py-2 px-[30px] gap-x-2'>
                    收藏
                  </div>
                  <div className='flex justify-center items-center bg-white cursor-pointer text-[#262626] rounded py-2 px-[30px] gap-x-2'>
                    分享
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default BookInfo
