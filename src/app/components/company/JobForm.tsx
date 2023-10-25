import { useReactive } from 'ahooks'
import { Button, Cascader, Select, Tag } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'

interface City {
  cityCode: number
  cityName: string
}

interface Props {
  setPostingType: (val: string | null) => void
  setChinaCity: (val: string[]) => void
  setCategoryId: (val: string[]) => void
}

const JobForm: React.FC<Props> = ({ setPostingType, setChinaCity, setCategoryId }) => {
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
    jobCategories: string[]
  }>({
    postingType: null,
    chinaCity: [],
    jobsPostingCategories: [],
    jobCities: [],
    jobCategories: []
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
      <div className="flex items-center justify-between mb-5">
        <div className="text-[#262626bf]">筛选</div>
        <Button
          type="link"
          onClick={() => {
            state.postingType = null
            state.chinaCity = []
            state.jobCategories = []
            setPostingType(null)
            setChinaCity([])
            setCategoryId([])
          }}>
          重置
        </Button>
      </div>
      <div className="text-[#3c3c4399] mb-3 text-sm">职位类型:</div>
      <div className="flex items-center gap-x-4">
        {tags.map(item => {
          return (
            <Tag
              key={item.value}
              color={state.postingType === item.value ? '#007aff' : '#000a200c'}
              className="cursor-pointer"
              style={{
                color: state.postingType === item.value ? '#fff' : '#3c3c4399',
              }}
              onClick={() => {
                state.postingType = item.value
                setPostingType(item.value as string)
              }}>
              {item.name}
            </Tag>
          )
        })}
      </div>
      <div className="text-[#3c3c4399] mb-3 mt-5 text-sm">职位类型:</div>
      <div>
        <Cascader
          options={state.jobsPostingCategories}
          fieldNames={{
            label: 'name',
            value: 'id',
            children: 'subCategories',
          }}
          placeholder="请选择职位类型"
          style={{ width: 256 }}
          value={state.jobCategories}
          onChange={val => {
            state.jobCategories = val as string[]
            setCategoryId(val as string[])
          }}
        />
      </div>
      <div className="text-[#3c3c4399] mb-3 mt-5 text-sm">工作城市:</div>
      <div>
        <Select
          placeholder="请选择工作城市"
          style={{ width: 256 }}
          mode="multiple"
          options={state.jobCities.map(item => ({
            value: item.cityCode,
            label: item.cityName,
          }))}
          value={state.chinaCity}
          onChange={val => {
            state.chinaCity = val
            setChinaCity(val)
          }}
        />
      </div>
    </div>
  )
}

export default JobForm
