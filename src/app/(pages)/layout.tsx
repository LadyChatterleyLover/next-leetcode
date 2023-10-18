import Header from '../components/home/Header'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div className='mx-auto w-full grow p-4 md:mt-0 md:max-w-[888px] md:p-6 lg:max-w-[1100px] mt-[50px] bg-white'>
        {children}
      </div>
    </>
  )
}

export default Layout
