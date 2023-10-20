import { LeetBookPage } from '@/app/types'
import { useReactive } from 'ahooks'
import { Divider } from 'antd'
import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { cloneDeep } from 'lodash-es'
import { CaretRightOutlined } from '@ant-design/icons'

interface Props {
  slug: string
}
const BookPages: React.FC<Props> = ({ slug }) => {
  const state = useReactive<{
    chapterList: LeetBookPage[]
  }>({
    chapterList: [],
  })

  const array2Tree = (items: LeetBookPage[]) => {
    const result = []
    const itemMap: Record<string, any> = {}
    for (const item of items) {
      itemMap[item.id] = { ...item, children: [] }
    }

    for (const item of items) {
      const id = item.id
      const pid = item.parentId
      const treeItem = itemMap[id]
      if (pid === null) {
        result.push(treeItem)
      } else {
        if (!itemMap[pid!]) {
          itemMap[pid!] = {
            children: [],
          }
        }
        itemMap[pid!].children.push(treeItem)
      }
    }
    return result
  }

  const getBookPages = useCallback(() => {
    axios
      .post('/api/leetbookBookPages', {
        slug,
      })
      .then(res => {
        const pages = cloneDeep(res.data.data.pages) as LeetBookPage[]
        state.chapterList = array2Tree(pages).sort((a, b) => a.order - b.order)
        state.chapterList.map(item => {
          item.children.map(item1 => {
            item1.collapse = false
          })
        })
        console.log('list', state.chapterList)
      })
  }, [slug, state])

  useEffect(() => {
    getBookPages()
  }, [getBookPages])

  return (
    <div
      className='bg-white rounded-lg pb-7 w-full'
      style={{
        boxShadow: '0 1px 5px #fff',
      }}
    >
      {state.chapterList.map((item, index) => {
        return (
          <div key={item.id} className='pl-4 pr-2 pt-4 relative text-base'>
            <div className='flex justify-between items-center pl-8 pr-3 min-h-[40px]'>
              <div className='absolute text-lg h-8 min-w-[48px] leading-8 px-2 rounded-2xl text-center text-white bg-[#262626] top-5 left-[-12px]'>
                {index < 9 ? `0${index + 1}` : index + 1}
              </div>
              <div>{item.title}</div>
              <div>
                <div className='w-4 h-4 rounded-full' style={{ border: '3px solid #f0f0f0' }}></div>
              </div>
            </div>
            <div className='pl-8'>
              {item.children.length &&
                item.children.map(child => {
                  return (
                    <>
                      <div
                        key={child.id}
                        className='flex h-11 items-center justify-between cursor-pointer pl-3 rounded text-[#262626] hover:bg-[#0000000a]'
                      >
                        <div className='flex items-center gap-x-2'>
                          {child.children.length ? (
                            <div
                              className={`transition-all duration-300 ${child.collapse ? 'rotate-90' : ''}`}
                              onClick={e => {
                                e.stopPropagation()
                                child.collapse = !child.collapse
                              }}
                            >
                              <CaretRightOutlined style={{ color: '#8c8c8c' }} />
                            </div>
                          ) : null}
                          {child.pageType === 'MIXED' ? (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              width='1em'
                              height='1em'
                              fill='currentColor'
                              className='eokqbvu0 css-1yv5nl7-Svg-StyledPageIcon ea8ky5j0'
                              color='#007aff'
                            >
                              <path
                                fillRule='evenodd'
                                d='M12.508 3c.429 0 .818.237 1.016.608l.053.115 6.36 16.047a.903.903 0 01-.738 1.224l-.106.006h-.422a1.15 1.15 0 01-1.021-.619l-.052-.116-1.409-3.68a.848.848 0 00-.677-.536l-.116-.008H8.584a.85.85 0 00-.745.439l-.049.105-1.408 3.68c-.154.402-.521.68-.945.728L5.308 21h-.41a.89.89 0 01-.87-1.112l.035-.106 6.365-16.06c.157-.396.521-.669.94-.715L11.497 3h1.012zm-.494 2.62l-3.252 8.413h6.456L12.014 5.62z'
                                clipRule='evenodd'
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              width='1em'
                              height='1em'
                              fill='currentColor'
                              className='eokqbvu0 css-1yv5nl7-Svg-StyledPageIcon ea8ky5j0'
                              color='#ffa116'
                            >
                              <path
                                fillRule='evenodd'
                                d='M4 5a1 1 0 01.993.883L5 6v10.2a.8.8 0 00.7.794l.1.006H10a1 1 0 01.117 1.993L10 19H5.8a2.8 2.8 0 01-2.795-2.63L3 16.2V6a1 1 0 011-1zm13.448 0c1.077 0 2.117.288 3.046.829.463.27.628.88.369 1.361a.942.942 0 01-1.309.384A4.16 4.16 0 0017.448 7c-2.488 0-4.525 2.228-4.525 5s2.037 5 4.525 5c.75 0 1.47-.2 2.118-.58a.942.942 0 011.31.379 1.022 1.022 0 01-.365 1.362 6.027 6.027 0 01-3.063.839C13.876 19 11 15.855 11 12s2.876-7 6.448-7z'
                                clipRule='evenodd'
                              ></path>
                            </svg>
                          )}
                          <div>{child.title}</div>
                        </div>
                        <div className='w-3 h-3 rounded-full' style={{ border: '1px solid #f0f0f0' }}></div>
                      </div>
                      {child.children.length ? (
                        <div className={`${child.collapse ? ' h-auto overflow-auto' : 'h-0 overflow-hidden'}`}>
                          {child.children.map(c => {
                            return (
                              <div
                                key={c.id}
                                className='flex h-11 items-center justify-between cursor-pointer pl-10 ml-6 rounded text-[#262626] hover:bg-[#0000000a]'
                              >
                                <div className='flex items-center gap-x-2'>
                                  {c.pageType === 'MIXED' ? (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 24 24'
                                      width='1em'
                                      height='1em'
                                      fill='currentColor'
                                      className='eokqbvu0 css-1yv5nl7-Svg-StyledPageIcon ea8ky5j0'
                                      color='#007aff'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M12.508 3c.429 0 .818.237 1.016.608l.053.115 6.36 16.047a.903.903 0 01-.738 1.224l-.106.006h-.422a1.15 1.15 0 01-1.021-.619l-.052-.116-1.409-3.68a.848.848 0 00-.677-.536l-.116-.008H8.584a.85.85 0 00-.745.439l-.049.105-1.408 3.68c-.154.402-.521.68-.945.728L5.308 21h-.41a.89.89 0 01-.87-1.112l.035-.106 6.365-16.06c.157-.396.521-.669.94-.715L11.497 3h1.012zm-.494 2.62l-3.252 8.413h6.456L12.014 5.62z'
                                        clipRule='evenodd'
                                      ></path>
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 24 24'
                                      width='1em'
                                      height='1em'
                                      fill='currentColor'
                                      className='eokqbvu0 css-1yv5nl7-Svg-StyledPageIcon ea8ky5j0'
                                      color='#ffa116'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M4 5a1 1 0 01.993.883L5 6v10.2a.8.8 0 00.7.794l.1.006H10a1 1 0 01.117 1.993L10 19H5.8a2.8 2.8 0 01-2.795-2.63L3 16.2V6a1 1 0 011-1zm13.448 0c1.077 0 2.117.288 3.046.829.463.27.628.88.369 1.361a.942.942 0 01-1.309.384A4.16 4.16 0 0017.448 7c-2.488 0-4.525 2.228-4.525 5s2.037 5 4.525 5c.75 0 1.47-.2 2.118-.58a.942.942 0 011.31.379 1.022 1.022 0 01-.365 1.362 6.027 6.027 0 01-3.063.839C13.876 19 11 15.855 11 12s2.876-7 6.448-7z'
                                        clipRule='evenodd'
                                      ></path>
                                    </svg>
                                  )}
                                  <div>{c.title}</div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : null}
                    </>
                  )
                })}
            </div>
            <Divider></Divider>
          </div>
        )
      })}
    </div>
  )
}

export default BookPages
