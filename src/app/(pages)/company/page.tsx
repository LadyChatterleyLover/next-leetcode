import HotSearch from '@/app/components/company/HotSearch'

const Company = () => {
  return (
    <div className='w-full h-full bg-[#f7f8fa]'>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] mt-[50px]'>
        <HotSearch></HotSearch>
      </div>
    </div>
  )
}

export default Company
