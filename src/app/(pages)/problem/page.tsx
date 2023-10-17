'use client'

import Content from '@/app/components/problemDetail/Content'
import Editor from '@/app/components/problemDetail/Editor'
import Header from '@/app/components/problemDetail/Header'
import { Button } from 'antd'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const Problem = () => {
  const params = useSearchParams()
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
        console.log(res.data)
      })
  }

  useEffect(() => {
    getProblemDetail()
  }, [getProblemDetail])

  return (
    <div className='h-[100vh] bg-[#f0f0f0] overflow-hidden'>
      <Header submit={submit}></Header>
      <div className='flex h-full' id='mainContent'>
        <div className='flex-1 mr-4'>
          <Content detail={detail!} title={titleCn!} slugTitle={slugTitle!}></Content>
        </div>
        <div className='flex-1'>
          <Editor ref={editorRef}></Editor>
        </div>
      </div>
    </div>
  )
}

export default Problem
