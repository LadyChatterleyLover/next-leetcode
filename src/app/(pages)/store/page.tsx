import Banner from '@/app/components/store/Banner'
import SaleList from '@/app/components/store/SaleList'

const Store = () => {
  return (
    <>
      <Banner></Banner>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1200px] '>
        <SaleList></SaleList>
        <div className='mt-10 mb-3 text-xl text-center'>使用兑换码</div>
        <div className='flex justify-center'>
          <div className='w-[400px] flex'>
            <input
              className='w-[75%] h-[34px] text-sm text-[#555] bg-white rounded rounded-tl-full rounded-bl-full pl-3 outline-none focus:border-[#f0ad4e] '
              style={{
                boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)',
                border: '1px solid #f0ad4e',
              }}
              placeholder='请输入兑换码'
            ></input>
            <div className='flex justify-center items-center h-[34px] w-[25%] bg-[#f0ad4e] text-white rounded-tr-full rounded-br-full'>
              兑换
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Store
