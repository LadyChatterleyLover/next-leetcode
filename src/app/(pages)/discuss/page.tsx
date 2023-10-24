import ColumnsTag from '@/app/components/discuss/ColumnsTag'
import DiscussList from '@/app/components/discuss/DiscussList'
import PicCard from '@/app/components/discuss/PicCard'
import QaList from '@/app/components/discuss/QaList'

const Discuss = () => {
  return (
    <div className="w-full h-full bg-[#f7f8fa]">
      <div className="mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1100px] mt-[50px] ">
        <PicCard></PicCard>
        <DiscussList></DiscussList>
        <ColumnsTag></ColumnsTag>
        <QaList></QaList>
      </div>
    </div>
  )
}

export default Discuss
