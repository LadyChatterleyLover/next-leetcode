import Action from '@/app/components/discuss/Action'
import ColumnsTag from '@/app/components/discuss/ColumnsTag'
import DiscussList from '@/app/components/discuss/DiscussList'
import MustRead from '@/app/components/discuss/MustRead'
import PicCard from '@/app/components/discuss/PicCard'
import QaList from '@/app/components/discuss/QaList'

const Discuss = () => {
  return (
    <div className='w-full h-full bg-[#f7f8fa]'>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px] '>
        <div className='flex gap-x-5'>
          <div className='flex-1'>
            <PicCard></PicCard>
            <DiscussList></DiscussList>
            <ColumnsTag></ColumnsTag>
            <QaList></QaList>
          </div>
          <div className='w-[256px] flex flex-col gap-y-5'>
            <Action></Action>
            <MustRead></MustRead>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Discuss
