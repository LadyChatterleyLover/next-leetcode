'use client'

import Content, { MenuItem } from '@/app/components/problemDetail/Content'
import Editor from '@/app/components/problemDetail/Editor'
import Header from '@/app/components/problemDetail/Header'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const Problem = () => {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const slugTitle = useMemo(() => {
    return params.get('slugTitle')
  }, [params])
  const titleCn = useMemo(() => {
    return params.get('title')
  }, [params])
  const questionId = useMemo(() => {
    const title = params.get('title')
    const arr = title?.split('=')
    const arr1 = arr?.[0].split('.')
    return arr1?.[0]
  }, [params])
  const editorRef = useRef<any>()
  const [detail, setDetail] = useState()
  const [items, setItems] = useState<MenuItem[]>([
    {
      label: '题目描述',
      key: 'problem',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          width="1em"
          height="1em"
          fill="currentColor"
          className="h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-[#007aff]">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.9 4.2h4.2M4.9 6.3h4.2M4.9 8.4H7m-3.15-7h6.3a1.4 1.4 0 011.4 1.4v8.4a1.4 1.4 0 01-1.4 1.4h-6.3a1.4 1.4 0 01-1.4-1.4V2.8a1.4 1.4 0 011.4-1.4z"></path>
        </svg>
      ),
    },
    {
      label: '题解',
      key: 'solution',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          width="1em"
          height="1em"
          fill="currentColor"
          className="h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-[#007aff]">
          <path d="M4.367 1.633h5.047m-4.17 4.093V1.692c0-.033.027-.059.059-.059h3.251c.032 0 .058.026.058.059v4.457c0 .012.004.023.01.033l2.754 3.977c.646.933-.022 2.208-1.157 2.208H3.73a1.407 1.407 0 01-1.17-2.19l2.675-3.995c.006-.01.01-.021.01-.033v-.423zm0 0H6.67M5.244 3.65H6.67"></path>
        </svg>
      ),
    },
    {
      label: '提交记录',
      key: 'submission',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          width="1em"
          height="1em"
          fill="currentColor"
          className="h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-[#007aff]">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.97 7a5.6 5.6 0 01-5.602 5.6 5.6 5.6 0 114.852-8.4m-.787 3.414l1.4-1.4 1.4 1.4m-4.766.913l-2.1-.7V4.9"></path>
        </svg>
      ),
    },
  ])

  const getProblemDetail = useCallback(() => {
    axios
      .post('/api/problemDetail', {
        slugTitle,
      })
      .then(res => {
        setDetail(res.data.data)
      })
  }, [slugTitle])

  const submit = () => {
    const values = editorRef.current?.getValues()
    axios
      .post('/api/submit', {
        ...values,
        questionId,
        slugTitle,
      })
      .then(res => {
        const data = res.data
        if (data.code === 200 && data.data) {
          if (data.data.status_msg === 'Wrong Answer') {
            items.push({
              label: '解答错误',
              key: 'answer',
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 14"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-[#007aff]">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.97 7a5.6 5.6 0 01-5.602 5.6 5.6 5.6 0 114.852-8.4m-.787 3.414l1.4-1.4 1.4 1.4m-4.766.913l-2.1-.7V4.9"></path>
                </svg>
              ),
            })
            setItems([...items])
            router.push(`${pathname}?title=${titleCn}&slugTitle=${slugTitle}&type=answer`)
          }
        }
        console.log(res.data.data)
      })
  }

  useEffect(() => {
    getProblemDetail()
  }, [getProblemDetail])

  return (
    <div className="h-[100vh] bg-[#f0f0f0] overflow-hidden">
      <Header submit={submit}></Header>
      <div
        className="flex h-full"
        id="mainContent">
        <div className="flex-1 mr-4">
          <Content
            detail={detail!}
            title={titleCn!}
            slugTitle={slugTitle!}
            items={items}></Content>
        </div>
        <div className="flex-1">
          <Editor ref={editorRef}></Editor>
        </div>
      </div>
    </div>
  )
}

export default Problem
