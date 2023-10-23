'use client'

import Channels from './Channels'
import { useReactive } from 'ahooks'
import PlanList from './PlanList'

const StudyPlanContent = () => {
  const state = useReactive<{
    currentId: number
  }>({
    currentId: -1,
  })

  const setCurrentId = (val: number) => {
    state.currentId = val
  }

  return (
    <div className='mt-[60px]'>
      <Channels setCurrentId={setCurrentId}></Channels>
      <PlanList currentId={state.currentId === -1 ? '' : state.currentId}></PlanList>
    </div>
  )
}

export default StudyPlanContent
