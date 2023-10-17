'use client'

import { Button, Form, Image, Input } from 'antd'
import axios from 'axios'

interface FieldType {
  username?: string
  password?: string
}

const Login = () => {
  const [form] = Form.useForm()
  const login = () => {
    const values = form.getFieldsValue()
  }

  return (
    <div className=' h-full w-full bg-[#f7f8fa] pt-24'>
      <div
        className='w-[384px] rounded-[21px] mx-auto'
        style={{
          border: '1px solid #e5e5e5',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 10px 22px rgba(0,0,0, 0.16)',
        }}
      >
        <div className='mx-w-[384px] py-6 px-8'>
          <div>
            <Image
              alt='logo'
              src='https://static.leetcode.cn/cn-mono-assets/production/assets/logo-dark-cn.4c5e285b.svg'
              preview={false}
              width={152}
            ></Image>
          </div>
          <div className='mt-5'>
            <Form name='basic' autoComplete='off' form={form}>
              <Form.Item<FieldType> name='username'>
                <Input placeholder='请输入用户名' allowClear />
              </Form.Item>

              <Form.Item<FieldType> name='password'>
                <Input.Password placeholder='请输入密码' allowClear />
              </Form.Item>

              <Form.Item>
                <Button size='large' style={{ background: '#242528', color: '#fff' }} block onClick={login}>
                  登录 / 注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
