import { useReactive } from 'ahooks'
import { Button, Cascader, Select, Tag } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'

interface City {
  cityCode: number
  cityName: string
}

const JobForm = () => {
  const tags = [
    {
      name: '全部',
      value: null,
    },
    {
      name: '社招',
      value: 'EXPERIENCED',
    },
    {
      name: '校招',
      value: 'CAMPUS',
    },
    {
      name: '全部',
      value: 'INTERNSHIP',
    },
  ]
  const state = useReactive<{
    postingType: string | null
    chinaCity: string[]
    jobsPostingCategories: any[]
    jobCities: City[]
  }>({
    postingType: null,
    chinaCity: [],
    jobsPostingCategories: [],
    jobCities: [],
  })

  const getJobsPostingCategories = () => {
    axios.get('/api/jobsPostingCategories').then(res => {
      state.jobsPostingCategories = res.data.data
    })
  }

  const getjobCities = () => {
    axios.get('/api/jobCities').then(res => {
      state.jobCities = res.data.data
    })
  }

  useEffect(() => {
    getJobsPostingCategories()
    getjobCities()
  }, [])

  return (
    <div>
      <div className='flex items-center justify-between mb-5'>
        <div className='text-[#262626bf]'>筛选</div>
        <Button type='link'>重置</Button>
      </div>
      <div className='text-[#3c3c4399] mb-3 text-sm'>职位类型:</div>
      <div className='flex items-center gap-x-4'>
        {tags.map(item => {
          return (
            <Tag
              key={item.value}
              color={state.postingType === item.value ? '#007aff' : '#000a200c'}
              className='cursor-pointer'
              style={{
                color: state.postingType === item.value ? '#fff' : '#3c3c4399',
              }}
              onClick={() => {
                state.postingType = item.value
              }}
            >
              {item.name}
            </Tag>
          )
        })}
      </div>
      <div className='text-[#3c3c4399] mb-3 mt-5 text-sm'>职位类型:</div>
      <div>
        <Cascader
          options={state.jobsPostingCategories}
          fieldNames={{
            label: 'name',
            value: 'id',
            children: 'subCategories',
          }}
          placeholder='请选择职位类型'
          style={{ width: 256 }}
        />
      </div>
      <div className='text-[#3c3c4399] mb-3 mt-5 text-sm'>工作城市:</div>
      <div>
        <Select
          placeholder='请选择工作城市'
          style={{ width: 256 }}
          mode='multiple'
          options={state.jobCities.map(item => ({
            value: item.cityCode,
            label: item.cityName,
          }))}
        />
      </div>
    </div>
  )
}

export default JobForm
