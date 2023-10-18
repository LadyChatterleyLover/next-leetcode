'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Col, Row } from 'antd'
import Image from 'next/image'

const { Meta } = Card

interface StudyPlanItem {
  cover: string
  highlight: string
  name: string
  onGoing: boolean
  premiumOnly: boolean
  questionNum: number
  slug: string
}

const StudyPlan = () => {
  const [studyPlanList, setStudyPlanList] = useState<StudyPlanItem[]>([])
  const getStudyPlanList = () => {
    axios.post('/api/studyPlan').then(res => {
      if (res.data.code === 200) {
        setStudyPlanList(res.data.data)
      }
    })
  }

  useEffect(() => {
    if (!studyPlanList.length) {
      getStudyPlanList()
    }
  }, [studyPlanList])
  return (
    <div>
      <div className='text-xl font-500 text-[#1a1a1abf] mb-3 h-7'>精选推荐</div>
      <Row wrap gutter={20}>
        {studyPlanList.map(item => {
          return (
            <Col key={item.slug} span={8}>
              <Card hoverable className='flex-1'>
                <Meta
                  avatar={<Image src={item.cover} alt='' width={72} height={72} />}
                  title={item.name}
                  description={item.highlight}
                />
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default StudyPlan
