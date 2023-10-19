import Problems from '../../components/problems/Problems'
import Tags from '../../components/tags/Tags'
import StudyPlan from '../../components/studyPlan/StudyPlan'
import CompanyTag from '../../components/home/CompanyTag'

export default function Home() {
  return (
    <>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-screen-xl mt-[50px] bg-white'>
        <div className='flex w-full'>
          <div className='flex-1'>
            <StudyPlan></StudyPlan>
            <Tags></Tags>
            <Problems></Problems>
          </div>
          <div className='ml-5 mt-8 w-[280px]'>
            <CompanyTag></CompanyTag>
          </div>
        </div>
      </div>
    </>
  )
}
