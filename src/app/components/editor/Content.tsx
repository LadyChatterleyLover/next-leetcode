'use client'

import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Code } from '../problemDetail/Editor'

interface Props {
  currentCodeItem: Code
}

const Content = forwardRef((_props: Props, _ref: any) => {
  const { currentCodeItem } = _props
  const editorRef = useRef<any>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    const mainContent: HTMLDivElement = document.querySelector('#mainContent')!
    const mainContentHeight = window.getComputedStyle(mainContent, null).height.replace('px', '')
    setHeight(Number(mainContentHeight))
  }, [height])

  useImperativeHandle(_ref, () => ({
    getCode: () => {
      return editorRef.current.getValue()
    },
  }))

  return (
    <div className='flex-1'>
      {currentCodeItem ? (
        <Editor
          height={height * 0.5 + 'px'}
          language={currentCodeItem.lang.toLowerCase()}
          value={currentCodeItem.code}
          onMount={editor => {
            editorRef.current = editor
          }}
        />
      ) : null}
    </div>
  )
})

Content.displayName = 'EditorContent'

export default Content
