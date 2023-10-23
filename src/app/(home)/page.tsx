import React from 'react'
import StudyPlan from '../components/home/StudyPlan'
import StudyPlanContent from '../components/home/Content'

const Home = () => {
  return (
    <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1100px] mt-[50px] bg-white'>
      <StudyPlan></StudyPlan>
      <StudyPlanContent></StudyPlanContent>
    </div>
  )
}

export default Home
