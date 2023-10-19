'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
import { useReactive } from 'ahooks'
import { Category, LeetBook, SubCategory } from '@/app/types'
import CategoryDetail from './CategoryDetail'

const Categories = () => {
  const detailRef = useRef<any>()
  const state = useReactive<{
    currentIndex: number
    categories: Category[]
    bookList: SubCategory[]
    ids: number[]
  }>({
    categories: [],
    currentIndex: 0,
    bookList: [],
    ids: [],
  })

  const getLeetbookCategories = () => {
    axios.get('/api/leetbookCategories').then(res => {
      res.data.data.map((item: Category) => {
        item.subcategories.map(item1 => {
          item1.ids = item1.bookIds
            .replace('[', '')
            .replace(']', '')
            .split(',')
            .map(item => Number(item.trim()))
        })
      })
      state.categories = res.data.data
      let arr: number[] = []
      state.categories[state.currentIndex].subcategories.map(item => {
        arr = [...arr, ...item.ids]
      })
      state.ids = arr
      getBookList()
    })
  }
  const getBookList = () => {
    axios
      .post('/api/leetbooks', {
        ids: state.ids,
      })
      .then(res => {
        const data: LeetBook[] = res.data.data
        let length = 0
        state.bookList = state.categories[state.currentIndex].subcategories.map(item => {
          item.bookList = data.slice(length, item.ids.length + length)
          length += item.ids.length
          return item
        })
      })
  }

  useEffect(() => {
    getLeetbookCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    state.categories.length && (
      <>
        <div className='flex items-center'>
          {state.categories.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`px-4 h-10 rounded-lg flex justify-center items-center mr-6 hover:bg-[#0000000c] cursor-pointer ${
                  state.currentIndex === index ? 'font-[500] bg-[#0000000c]' : ''
                }`}
                onClick={() => {
                  state.currentIndex = index
                  let arr: number[] = []
                  state.categories[state.currentIndex].subcategories.map(item => {
                    arr = [...arr, ...item.ids]
                  })
                  state.ids = arr
                  getBookList()
                }}
              >
                {item.name}
              </div>
            )
          })}
        </div>
        <CategoryDetail bookList={state.bookList}></CategoryDetail>
      </>
    )
  )
}

export default Categories
