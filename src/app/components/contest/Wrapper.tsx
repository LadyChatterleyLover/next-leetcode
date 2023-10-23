import Image from 'next/image'

const Wrapper = () => {
  return (
    <div className='pb-[100px] text-white'>
      <div className='md:w-[750px] lg:w-[1170px] xl:w-[1170px] xl:pl-[150px] xl:pr-[150px]'>
        <div className='mt-[80px] mb-10 flex justify-center'>
          <Image
            src='https://static.leetcode-cn.com/cn-legacy-assets/images/LeetCode_Cup.png'
            alt='logo'
            width={150}
            height={150}
          ></Image>
        </div>
        <div className='flex items-center justify-center gap-x-5'>
          <Image
            src='https://static.leetcode-cn.com/cn-assets/dev/webpack_bundles/images/LCCN_name_black.409f3d3a2.svg'
            alt=''
            width={65}
            height={36}
          ></Image>
          <div className='text-[#b3b3b3] font-[100] text-[36px]'>竞赛</div>
        </div>
        <div className='mt-8 text-lg font-[300] text-center' style={{ color: 'grey' }}>
          快来参加每周排位赛，提升你的世界排名
        </div>
      </div>
    </div>
  )
}

export default Wrapper
