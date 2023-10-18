import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import QuestionTag from './QuestionTag'
import { Button, Divider, Input } from 'antd'
import { DownOutlined } from '@ant-design/icons'

interface Item {
  name: string
  transName: string
  flag?: boolean
  tagRelation: {
    questionNum: number
    tag: {
      id: string
      name: string
      nameTranslated: string
      slug: string
    }
  }[]
}

const QuestionAllTag = () => {
  const [tagList, setTagList] = useState<Item[]>([])
  const [collapsed, setCollapsed] = useState(false)

  const getQuestionTag = () => {
    axios.get('/api/questionTag').then(res => {
      setTagList(
        res.data.data.map((item: Item) => ({
          ...item,
          flag: false,
        }))
      )
    })
  }

  const content = useMemo(() => {
    if (tagList.length) {
      return (
        <div>
          <Input.Search placeholder='筛选题目' allowClear></Input.Search>
          <div className='max-h-[376px] overflow-y-auto'>
            {tagList.map((item, index) => {
              return (
                <div key={item.transName} className='my-3'>
                  <div className='flex items-center justify-between h-5 mb-2'>
                    <div>{item.transName}</div>
                    <DownOutlined
                      className={`${item.flag ? 'rotate-180' : ''} transition duration-300 cursor-pointer`}
                      onClick={() => {
                        tagList[index].flag = !tagList[index].flag
                        setTagList([...tagList])
                      }}
                    ></DownOutlined>
                  </div>
                  <div
                    style={{
                      height: item.flag ? 'auto' : 34,
                      overflowY: item.flag ? 'auto' : 'hidden',
                    }}
                  >
                    {item.tagRelation.map(item1 => {
                      return (
                        <div
                          key={item1.tag.id}
                          className='inline-flex items-center px-2 whitespace-nowrap text-xs leading-6 rounded-full text-[#3c3c4399]  bg-[#000a200d] cursor-pointer transition-all hover:[#000a201a] m-1'
                        >
                          {item1.tag.nameTranslated}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <Divider style={{ margin: '20px 0 0 0' }}></Divider>
          <div className='flex items-center px-2 py-0.5 mt-2.5 cursor-pointer'>
            <Button
              type='link'
              onClick={() => {
                tagList.map(item => {
                  item.flag = !item.flag
                })
                setTagList([...tagList])
                setCollapsed(!collapsed)
              }}
            >
              {collapsed ? '收起全部' : '展开全部'}
            </Button>
          </div>
        </div>
      )
    } else {
      return null
    }
  }, [tagList, collapsed])

  useEffect(() => {
    getQuestionTag()
  }, [])

  return <QuestionTag content={content}>标签</QuestionTag>
}

export default QuestionAllTag
