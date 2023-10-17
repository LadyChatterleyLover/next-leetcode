import { useCallback, useEffect, useMemo, useState, useImperativeHandle, forwardRef, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Header from '../editor/Header'
import Content from '../editor/Content'
import TestCase from '../editor/TestCase'

export interface Code {
  code: string
  lang: string
  langSlug: string
}

export interface OptionItem {
  code: string
  value: string
  label: string
}

const Editor = forwardRef((_props: any, _ref: any) => {
  const params = useSearchParams()
  const titleSlug = useMemo(() => {
    return params.get('slugTitle')
  }, [params])

  const [codeSnippets, setCodeSnippets] = useState<OptionItem[]>([])
  const [codeList, setCodeList] = useState<Code[]>([])
  const [currentCode, setCurrentCode] = useState('')
  const headerRef = useRef<any>()
  const contentRef = useRef<any>()

  const currentCodeItem = useMemo(() => {
    return codeList.find(item => item.langSlug === currentCode)
  }, [currentCode, codeList])

  const getCodeSnippets = useCallback(() => {
    axios
      .post('/api/codeSnippets', {
        titleSlug,
      })
      .then(res => {
        setCodeList(res.data.data)
        setCodeSnippets(
          res.data.data.map((item: Code) => ({
            code: item.code,
            value: item.langSlug,
            label: item.lang,
          }))
        )
        setCurrentCode(res.data.data[0].langSlug)
      })
  }, [titleSlug, setCodeSnippets])

  useEffect(() => {
    getCodeSnippets()
  }, [getCodeSnippets])

  useImperativeHandle(_ref, () => ({
    getValues: () => ({
      lang: headerRef.current?.getCurrentCode(),
      code: contentRef.current?.getCode(),
    }),
  }))

  return (
    <div className='my-[10px]  bg-white h-full w-full '>
      <div style={{ borderBottom: '1px solid #eee' }} className='p-5 pb-3'>
        <Header ref={headerRef} codeSnippets={codeSnippets} setCurrentCode={setCurrentCode}></Header>
      </div>
      <div className='py-5 flex flex-col'>
        <div>
          <Content ref={contentRef} currentCodeItem={currentCodeItem!}></Content>
        </div>
        <div className='bg-[#f0f0f0] h-3 w-full'></div>
        <div className='bg-white p-5'>
          <TestCase></TestCase>
        </div>
      </div>
    </div>
  )
})

Editor.displayName = 'Editor'

export default Editor
