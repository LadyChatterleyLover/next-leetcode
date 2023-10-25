import { useEffect } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { Job, JobArticle } from '@/app/types'
import Image from 'next/image'
import { Pagination } from 'antd'

const Jobs = () => {
  const state = useReactive<{
    jobList: Job[]
    jobArticle: JobArticle[]
    chinaCity: string[]
    currentIndex: number
    limit: number
    skip: number
    postingType: string | null
    current: number
    total: number
  }>({
    jobList: [],
    jobArticle: [],
    currentIndex: 0,
    chinaCity: [],
    postingType: null,
    limit: 10,
    skip: 0,
    current: 1,
    total: 0,
  })

  const navs = [
    {
      name: '官方职位',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='1em'
          height='1em'
          fill='currentColor'
          className='mr-[6px] w-4 h-4'
        >
          <path
            fillRule='evenodd'
            d='M14 20h3a1 1 0 001-1V5a1 1 0 00-1-1H7a1 1 0 00-1 1v14a1 1 0 001 1h3v-2a1 1 0 011-1h2a1 1 0 011 1v2zM7 2h10a3 3 0 013 3v14a3 3 0 01-3 3H7a3 3 0 01-3-3V5a3 3 0 013-3zm2.5 4h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm4-6h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm0 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
    {
      name: '社区内推',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='1em'
          height='1em'
          fill='currentColor'
          className='mr-[6px] w-4 h-4'
        >
          <path
            fillRule='evenodd'
            d='M2 11.001a9.001 9.001 0 014.974-8.047A8.876 8.876 0 0110.998 2h.535c.018 0 .037 0 .055.002 3.934.218 7.204 3.02 8.15 6.753a1 1 0 01-1.94.49c-.734-2.9-3.27-5.065-6.294-5.245h-.51a6.876 6.876 0 00-3.12.74l-.004.002A7.001 7.001 0 004 11.003v.002a6.873 6.873 0 00.738 3.117c.206.407.271.871.185 1.32l-.387 2.022 2.022-.387c.448-.086.912-.021 1.32.185.44.222.9.395 1.373.518a1 1 0 11-.502 1.936 8.865 8.865 0 01-1.773-.669.067.067 0 00-.042-.006l-3.47.665a1 1 0 01-1.17-1.17l.665-3.47a.067.067 0 00-.006-.043A8.873 8.873 0 012 11.001zM17.004 20h-.005a3 3 0 01-2.68-1.658l-.004-.007A2.936 2.936 0 0114 17.004v-.206a2.995 2.995 0 012.773-2.797l.233-.001c.46-.001.917.107 1.33.315l.007.004A3 3 0 0120 17v.005c.001.425-.09.845-.268 1.232l-.133.29a1 1 0 00-.074.606l.093.485-.484-.093a1 1 0 00-.606.073l-.29.134a2.937 2.937 0 01-1.234.268zm-.296-8A4.995 4.995 0 0012 16.738v.262c-.002.777.18 1.543.53 2.237a5 5 0 006.542 2.313l2.303.441c.365.07.686-.25.616-.615l-.441-2.303a5 5 0 00-2.312-6.541A4.937 4.937 0 0017 12h-.292z'
            clipRule='evenodd'
          ></path>
        </svg>
      ),
    },
  ]

  const getJobList = () => {
    axios
      .post('/api/jobsOfficialPostings', {
        chinaCity: state.chinaCity,
        limit: state.limit,
        skip: state.skip,
        postingType: state.postingType,
      })
      .then(res => {
        const data = res.data.data
        state.jobList = data.jobs
        state.total = data.count
        console.log('res', data)
      })
  }

  const getJobArticle = () => {
    axios
      .post('/api/jobsCareerArticle', {
        limit: state.limit,
        skip: state.skip,
      })
      .then(res => {
        const data = res.data.data
        state.jobArticle = data.articles
        state.total = data.totalNum
      })
  }

  useEffect(() => {
    getJobList()
  }, [])

  return (
    <div className='flex'>
      <div className='flex items-center gap-x-5 mb-5'>
        {navs.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex items-center text-[#262626bf] bg-[#000a200c] py-[6px] px-4 font-[500] rounded-full cursor-pointer ${
                state.currentIndex === index ? 'text-white bg-black' : ''
              }`}
              onClick={() => {
                state.current = 1
                state.limit = 10
                state.skip = 0
                state.total = 0
                state.currentIndex = index
                state.currentIndex === 0 ? getJobList() : getJobArticle()
              }}
            >
              {item.icon}
              <div>{item.name}</div>
            </div>
          )
        })}
      </div>
      {state.currentIndex === 0
        ? state.jobList.map(item => {
            return (
              <div key={item.uuid} className='p-4 rounded-lg bg-white mb-3 cursor-pointer flex items-center gap-x-4'>
                <Image alt='' src={item.companyLogo} width={48} height={48}></Image>
                <div className='flex-1 flex flex-col gap-y-3 text-sm'>
                  <div className='flex items-center justify-between'>
                    <div>{item.title}</div>
                    <div className='text-[#2db55d]'>{item.salaryDisplay}</div>
                  </div>
                  <div className='flex items-center gap-x-1  text-[#3c3c4399]'>
                    <div>{item.chinaCityDisplay} /</div>
                    <div>{item.workExperienceDisplay} /</div>
                    <div>{item.educationDisplay}</div>
                  </div>
                </div>
              </div>
            )
          })
        : state.jobArticle.map((item, index) => {
            return (
              <div key={index} className='p-4 rounded-lg bg-white mb-3 cursor-pointer flex items-center gap-x-4'>
                <Image alt='' src={item.companyLogo} width={48} height={48}></Image>
                <div className='flex-1 flex flex-col gap-y-3 text-sm'>
                  <div>{item.title}</div>
                  <div className=' text-[#3c3c4399] line-clamp-1'>{item.summary}</div>
                </div>
              </div>
            )
          })}
      <Pagination
        current={state.current}
        pageSize={state.limit}
        pageSizeOptions={[10, 20, 50, 100]}
        total={state.total}
        onChange={(page, size) => {
          state.current = page
          state.limit = size
          state.skip = (page - 1) * size
          state.currentIndex === 0 ? getJobList() : getJobArticle()
        }}
      ></Pagination>
    </div>
  )
}

export default Jobs
