import { SubCategory } from '@/app/types'
import { Card, Col, Row } from 'antd'
import Image from 'next/image'
import { EyeOutlined } from '@ant-design/icons'

interface Props {
  bookList: SubCategory[]
}

const CategoryDetail: React.FC<Props> = ({ bookList }) => {
  return (
    bookList.length &&
    bookList.map(item => {
      return (
        <div key={item.id}>
          <div className='my-8 text-xl'>{item.name}</div>
          <Row gutter={20}>
            {item.bookList.length &&
              item.bookList.map(book => {
                return (
                  book && (
                    <Col span={8} key={book.id} className='mb-5'>
                      <Card hoverable>
                        <div className='flex gap-x-4'>
                          <Image alt='pic' src={book?.coverImg} width={68} height={92}></Image>
                          <div className='flex-1 flex flex-col'>
                            <div className='text-sm'>{book?.title}</div>
                            <div className='text-xs text-[#262626bf] mt-2'>{book?.recommendation}</div>
                            <div className='mt-5 text-xs text-[#52525299] flex items-center gap-x-3'>
                              <div className='flex items-center gap-x-1'>
                                <div>{book?.chapterNum}章</div>
                                <div className='h-1 w-1 rounded-full bg-[#52525299]'></div>
                                <div>{book?.pageNum}节</div>
                              </div>
                              <div className='flex items-center gap-x-1'>
                                <EyeOutlined style={{ fontSize: 14 }}></EyeOutlined>
                                <div>{book?.totalStudied}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  )
                )
              })}
          </Row>
        </div>
      )
    })
  )
}

export default CategoryDetail
