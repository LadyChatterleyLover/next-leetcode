import Problems from '../components/problems/Problems'
import Tags from '../components/tags/Tags'
import StudyPlan from '../components/studyPlan/StudyPlan'
import Header from '../components/home/Header'

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-screen-xl mt-[50px] dark:bg-dark-layer-bg bg-white'>
        <StudyPlan></StudyPlan>
        <Tags></Tags>
        <Problems></Problems>
      </div>
    </>
  )
}
