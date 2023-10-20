import { Author2, LeetBook } from '@/app/types'
import { PlusOutlined } from '@ant-design/icons'
import { useReactive } from 'ahooks'
import { Avatar, Button, Rate } from 'antd'
import Markdown from 'react-markdown'

interface Props {
  bookDetail: LeetBook
}

const BookIntro: React.FC<Props> = ({ bookDetail }) => {
  const desc = ['很差', '较差', '还行', '推荐', '力荐']
  const state = useReactive<{
    rateValue: number
  }>({
    rateValue: 0,
  })

  const status: Record<string, string> = {
    FINISHED: '已完结',
  }

  return (
    bookDetail && (
      <div className='flex flex-col w-full gap-y-3'>
        <div className='flex items-center justify-between'>
          <div className='text-sm text-[#3c3c4399] leading-6 mr-2'>评价这本书</div>
          <div className='flex items-center gap-x-2'>
            <Rate
              onChange={val => {
                state.rateValue = val
              }}
              onHoverChange={val => {
                state.rateValue = val
              }}
              value={state.rateValue}
            ></Rate>
            <div className='text-sm text-[#3c3c4399]'>{state.rateValue ? desc[state.rateValue - 1] : '评分'}</div>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='flex flex-col flex-1'>
            <div className='leading-6'>{bookDetail.progress ?? '暂无'}</div>
            <div className='text-xs leading-5 text-[#8c8c8c] mt-[2px]'>学习进度</div>
          </div>
          <div className='flex flex-col flex-1'>
            <div className='leading-6'>
              {bookDetail.chapterNum}章 / {bookDetail.pageNum}节
            </div>
            <div className='text-xs leading-5 text-[#8c8c8c] mt-[2px]'>{status[bookDetail.workStatus]}</div>
          </div>
          <div className='flex flex-col flex-1 items-end'>
            <div className='leading-6'>{(bookDetail.readTime / 60).toFixed(0)}小时</div>
            <div className='text-xs leading-5 text-[#8c8c8c] mt-[2px] relative right-[10px]'>预计时长</div>
          </div>
        </div>
        <div className='mt-5 flex flex-wrap gap-3'>
          {bookDetail.commonTags.map(item => {
            return (
              <div
                key={item.slug}
                className='h-6 px-2 rounded-full text-xs leading-6 text-center bg-[#000a200c] text-[#3c3c4399]'
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <div className='mt-8'>
          <div className='flex gap-x-3'>
            <Avatar size={40} src={(bookDetail.author as Author2).avatar}></Avatar>
            <div className='flex flex-col gap-y-1 flex-1'>
              <div className='font-bold'>{(bookDetail.author as Author2).realName}</div>
              <div className='text-xs text-ellipsis overflow-hidden whitespace-nowrap text-[#595959]'>
                {(bookDetail.author as Author2).title}
              </div>
            </div>
            <div className='w-[40px]'>
              <Button icon={<PlusOutlined></PlusOutlined>}>关注</Button>
            </div>
          </div>
          <div className='mt-3 text-sm text-[#595959] leading-6 line-clamp-3'>{bookDetail.author.bio}</div>
        </div>

        {bookDetail.descBlocks.map((item, index) => {
          return (
            <div className='mt-8 bookIntro' key={index}>
              {index === bookDetail.descBlocks.length - 1 ? <h3>LeetBook 购买 / 使用须知</h3> : null}
              <Markdown>{item.content}</Markdown>
            </div>
          )
        })}
      </div>
    )
  )
}

export default BookIntro
