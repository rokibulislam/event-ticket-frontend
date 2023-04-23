import Layout from '@/components/layout'
import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';

const Checkout = () => {
  return (
    <Layout>
      <div>
        <h2> Checkout Solution</h2> 
        <Form>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
            <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </Layout>
  )
}

export default Checkout