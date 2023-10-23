'use client'

import React, { useCallback, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useReactive } from 'ahooks'
import axios from 'axios'
import { Menu, Spin } from 'antd'
import { LeetBookPage } from '@/app/types'
import { array2Tree } from '@/app/utils/bookArrayToTree'
import SubMenu from 'antd/lib/menu/SubMenu'
import { useReadIdStore } from '@/app/store/readId'
import { localSet } from '@/app/utils/storage'

const ReadMenu = () => {
  const params = useParams()

  const state = useReactive<{
    chapterList: LeetBookPage[]
  }>({
    chapterList: [],
  })
  const slug = useMemo(() => {
    return params.slug as string
  }, [params])

  const readIdStore = useReadIdStore()
  const id = useReadIdStore(state => state.readId)

  const openKeys = useMemo(() => {
    let key: string[] = []
    state.chapterList.map(item => {
      item.children.map(item1 => {
        if (id === item1.id) {
          key = [item1.parentId as string]
        }
        item1.children.map(item2 => {
          if (id === item2.id) {
            key = [item1.parentId as string, item2.parentId as string]
          }
        })
      })
    })
    return key
  }, [id, state.chapterList])

  const renderMenu = (items: LeetBookPage[]) => {
    return items.map((item: LeetBookPage) => {
      if (item.children?.length > 0) {
        return (
          <SubMenu
            key={item.id}
            title={
              item.parentId ? (
                <div className='flex items-center gap-x-2'>
                  {item.pageType === 'MIXED' ? (
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
                      style={{ fontSize: 16 }}
                    >
                      <path
                        fillRule='evenodd'
                        d='M4 5a1 1 0 01.993.883L5 6v10.2a.8.8 0 00.7.794l.1.006H10a1 1 0 01.117 1.993L10 19H5.8a2.8 2.8 0 01-2.795-2.63L3 16.2V6a1 1 0 011-1zm13.448 0c1.077 0 2.117.288 3.046.829.463.27.628.88.369 1.361a.942.942 0 01-1.309.384A4.16 4.16 0 0017.448 7c-2.488 0-4.525 2.228-4.525 5s2.037 5 4.525 5c.75 0 1.47-.2 2.118-.58a.942.942 0 011.31.379 1.022 1.022 0 01-.365 1.362 6.027 6.027 0 01-3.063.839C13.876 19 11 15.855 11 12s2.876-7 6.448-7z'
                        clipRule='evenodd'
                        style={{ fontSize: 16 }}
                      ></path>
                    </svg>
                  )}
                  <div> {item.title}</div>
                </div>
              ) : (
                <div>{item.title}</div>
              )
            }
          >
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item
          key={item.id}
          onClick={({ key }) => {
            readIdStore.setReadId(key)
            localSet('readId', key)
          }}
        >
          <div className='flex items-center gap-x-2'>
            {item.pageType === 'MIXED' ? (
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
                style={{ fontSize: 16 }}
              >
                <path
                  fillRule='evenodd'
                  d='M4 5a1 1 0 01.993.883L5 6v10.2a.8.8 0 00.7.794l.1.006H10a1 1 0 01.117 1.993L10 19H5.8a2.8 2.8 0 01-2.795-2.63L3 16.2V6a1 1 0 011-1zm13.448 0c1.077 0 2.117.288 3.046.829.463.27.628.88.369 1.361a.942.942 0 01-1.309.384A4.16 4.16 0 0017.448 7c-2.488 0-4.525 2.228-4.525 5s2.037 5 4.525 5c.75 0 1.47-.2 2.118-.58a.942.942 0 011.31.379 1.022 1.022 0 01-.365 1.362 6.027 6.027 0 01-3.063.839C13.876 19 11 15.855 11 12s2.876-7 6.448-7z'
                  clipRule='evenodd'
                  style={{ fontSize: 16 }}
                ></path>
              </svg>
            )}
            <div> {item.title}</div>
          </div>
        </Menu.Item>
      )
    })
  }

  const getBookPages = useCallback(() => {
    axios
      .post('/api/leetbookBookPages', {
        slug,
      })
      .then(res => {
        const pages = res.data.data.pages as LeetBookPage[]
        state.chapterList = array2Tree(pages).sort((a, b) => a.order - b.order)
      })
  }, [slug, state])

  useEffect(() => {
    getBookPages()
  }, [getBookPages, id, state])

  return state.chapterList.length ? (
    <Menu style={{ width: 350 }} mode='inline' selectedKeys={[id]} defaultOpenKeys={openKeys}>
      {renderMenu(state.chapterList)}
    </Menu>
  ) : (
    <Spin></Spin>
  )
}

export default ReadMenu
