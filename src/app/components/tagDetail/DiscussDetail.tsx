import { Avatar, Divider } from 'antd'
import dayjs from 'dayjs'
import { BellOutlined, EditOutlined, LikeOutlined, ShareAltOutlined, StarOutlined } from '@ant-design/icons'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { DiscussItem } from '@/app/types'

interface Props {
  detail: DiscussItem
}
const DiscussDetail: React.FC<Props> = ({ detail }) => {
  return (
    <>
      <div
        className='mb-3 p-4 rounded-lg bg-white'
        style={{
          boxShadow: '0px 1px 2px rgba(0,0,0,0.1),0px 2px 8px rgba(0,0,0, 0.08)',
        }}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Avatar src={detail?.contentAuthor.avatar} size={32}></Avatar>
            <div className='text-xl ml-2'>{detail?.title}</div>
          </div>
          <div
            className='flex items-center justify-center text-[#2db55d] py-[5px] px-3 rounded-md cursor-pointer'
            style={{ border: '1px solid #2db55d' }}
          >
            + 关注 TA
          </div>
        </div>
        <div className='mt-2 text-xs text-[#bfbfbf] flex items-center gap-x-2'>
          <div>{detail?.contentAuthor.realName}</div>
          <div>发布于 {dayjs(detail?.createdAt).format('YYYY.MM.DD')}</div>
          <div className='w-1 h-1 rounded-full bg-[#bfbfbf]'></div>
          <div>来自于 {detail?.ipRegion}</div>
        </div>
        <div className='leading-10 mt-5 text-justify w-full' style={{ wordBreak: 'break-word' }}>
          <Markdown rehypePlugins={[rehypeHighlight]}>{detail?.content}</Markdown>
        </div>
        <div className='mt-3 bg-[#eee] h-[1px]'></div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2 py-[14px] px-4'>
            <div className='flex items-center text-[#3c3c4399] gap-x-1 cursor-pointer hover:text-[#0fb55d]'>
              <LikeOutlined></LikeOutlined>
              {detail?.reactionsV2.length ? detail?.reactionsV2[0].count : 0}
            </div>
            <Divider type='vertical'></Divider>
            <div className='flex items-center gap-x-3'>
              <div className='flex items-center text-[#3c3c4399] gap-x-1 cursor-pointer hover:text-[#ffa116]'>
                <StarOutlined></StarOutlined>
                {detail?.favoriteCount}
              </div>
              <div className='flex items-center text-[#3c3c4399] gap-x-1 cursor-pointer hover:text-[#0a84ff] text-sm'>
                <ShareAltOutlined></ShareAltOutlined>
                分享
              </div>
            </div>
          </div>
          <div className='flex items-center gap-x-4'>
            <div className='flex justify-center items-center py-2 px-4 rounded-lg text-white bg-[#2db55d] cursor-pointer'>
              <EditOutlined></EditOutlined>
              回复讨论
            </div>
            <div
              className='flex justify-center items-center py-2 px-4 rounded-lg text-[#2db55d] cursor-pointer'
              style={{ border: '1px solid #2db55d' }}
            >
              <BellOutlined></BellOutlined>
              接收动态
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscussDetail
