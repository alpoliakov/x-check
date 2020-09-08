import React, { useState } from 'react';
import { checkRef } from '../../firebase';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip, Checkbox, Button, Row, Col } from 'antd';
import { auth } from '../../firebase';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const onFinish = (values: any) => {
  const { email, password } = values;
  console.log(values);
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorMessage} - ${errorCode}`);
      return;
    })
    .then(() => {
      checkRef.push(values);
    });
  console.log('Received values of form: ', values);
};

interface PropsRegister {
  changeAuthPage: (data: string) => void;
}

const Register: React.FC<PropsRegister> = ({ changeAuthPage }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const handleClick = (data: string) => {
    changeAuthPage(data);
  };
  return (
    <>
      <main className={'main_register'}>
        <div className={'box__registration'}>
          <div className={'box__image_register'}>
            <img
              className="login-image"
              src="/static/images/logo-rs-school.svg"
              alt="RS School Logo"
            />
          </div>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            scrollToFirstError
          >
            <Form.Item
              name="nickname"
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="roles" label="Roles">
              <Checkbox.Group>
                <Row>
                  <Col span={20}>
                    <Checkbox value="student" style={{ lineHeight: '32px' }}>
                      student
                    </Checkbox>
                  </Col>
                  <Col span={20}>
                    <Checkbox value="author" style={{ lineHeight: '32px' }}>
                      author
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={20}>
                    <Checkbox value="supervisor" style={{ lineHeight: '32px' }}>
                      supervisor
                    </Checkbox>
                  </Col>
                  <Col span={20}>
                    <Checkbox value="course_manager" style={{ lineHeight: '32px' }}>
                      course manager
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
            <p className={'login__now_text'}>
              Or <a onClick={() => handleClick('login')}>login now!</a>
            </p>
          </Form>
        </div>
      </main>
    </>
  );
};

export default Register;
