import { LeetBook, SubCategory } from '@/app/types'
import { Avatar, Card, Col, Divider, Popover, Row } from 'antd'
import Image from 'next/image'
import { EyeOutlined } from '@ant-design/icons'

interface Props {
  bookList: SubCategory[]
}

const CategoryDetail: React.FC<Props> = ({ bookList }) => {
  const renderContent = (book: LeetBook) => {
    return (
      <div className="w-[320px] text-white bg-gradient-to-b p-4 rounded-md from-[rgba(0,0,0,.7)] to-[rgba(0,0,0,.3)]">
        <div className="mb-5">{book.title}</div>
        <div>{book.description}</div>
        <div className="mt-2 flex items-center text-xs text-white">
          <Avatar
            src={book.author.user.userAvatar}
            size={22}></Avatar>
          <div className="ml-1">{book.author.user.realName}</div>
          <Divider
            type="vertical"
            style={{ background: 'white' }}></Divider>
          <div>{book.author.title}</div>
        </div>
      </div>
    )
  }
  return (
    bookList.length &&
    bookList.map(item => {
      return (
        <div key={item.id}>
          <div className="my-8 text-xl">{item.name}</div>
          <Row gutter={20}>
            {item.bookList.length &&
              item.bookList.map(book => {
                return (
                  book && (
                    <Popover
                      placement="rightTop"
                      content={renderContent(book)}
                      arrow={false}
                      overlayInnerStyle={{
                        background: 'none',
                        padding: 0,
                      }}>
                      <Col
                        span={8}
                        key={book.id}
                        className="mb-5">
                        <Card hoverable>
                          <div className="flex gap-x-4">
                            <Image
                              alt="pic"
                              src={book?.coverImg}
                              width={68}
                              height={92}></Image>
                            <div className="flex-1 flex flex-col">
                              <div className="text-sm">{book?.title}</div>
                              <div className="text-xs text-[#262626bf] mt-2">
                                {book?.recommendation}
                              </div>
                              <div className="mt-5 text-xs text-[#52525299] flex items-center gap-x-3">
                                <div className="flex items-center gap-x-1">
                                  <div>{book?.chapterNum}章</div>
                                  <div className="h-1 w-1 rounded-full bg-[#52525299]"></div>
                                  <div>{book?.pageNum}节</div>
                                </div>
                                <div className="flex items-center gap-x-1">
                                  <EyeOutlined style={{ fontSize: 14 }}></EyeOutlined>
                                  <div>{book?.totalStudied}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Popover>
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
