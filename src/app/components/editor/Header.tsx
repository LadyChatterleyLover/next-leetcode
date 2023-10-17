'use client'

import { Select, Tooltip } from 'antd'
import { SyncOutlined, TabletOutlined } from '@ant-design/icons'
import { OptionItem } from '../problemDetail/Editor'
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import Fullscreen from './Fullscreen'

interface Props {
  codeSnippets: OptionItem[]
  setCurrentCode: (val: string) => void
}

const Header = forwardRef((_props: Props, _ref: any) => {
  const { codeSnippets, setCurrentCode } = _props
  const [value, setValue] = useState('')

  useEffect(() => {
    if (codeSnippets.length) {
      setValue(codeSnippets[0].value)
    }
  }, [codeSnippets])

  useImperativeHandle(_ref, () => ({
    getCurrentCode: () => {
      return value
    },
  }))

  return (
    <>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 14 14'
            width='1em'
            height='1em'
            fill='currentColor'
            className='h-3.5 w-3.5 flex-none fill-none stroke-current stroke-1.5 text-[#01b328]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.417 11.375l1.166-8.75m-3.646 7.491l-2.77-3.1 2.77-3.102m6.125 0l2.771 3.101-2.77 3.101'
            ></path>
          </svg>
          <div className='text-xs ml-1'>代码</div>
        </div>
        <Fullscreen></Fullscreen>
      </div>
      <div className='flex h-7 justify-between items-center pr-4 border-fill-3 rounded-t border-b'>
        {codeSnippets.length ? (
          <Select
            size='small'
            value={value}
            options={codeSnippets}
            style={{ width: 100 }}
            onChange={val => {
              setCurrentCode(val)
              setValue(val)
            }}
          ></Select>
        ) : null}
        <div className='flex items-center'>
          <Tooltip title='获取备注过的提交记录' placement='topRight' arrow={false}>
            <TabletOutlined style={{ color: '#0000008c', marginRight: '15px' }} />
          </Tooltip>
          <Tooltip title='还原到默认的代码模板' placement='topRight' arrow={false}>
            <SyncOutlined style={{ color: '#0000008c' }} />
          </Tooltip>
        </div>
      </div>
    </>
  )
})

Header.displayName = 'EditorHeader'

export default Header
