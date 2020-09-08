import React, { useEffect, useState } from 'react';
import { checkRef } from '../../firebase';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip, Checkbox, Button, Row, Col, Modal } from 'antd';
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

interface PropsRegister {
  changeAuthPage: (data: string) => void;
  changeRole: (data: string) => void;
  changeAuthorization: () => void;
}

const Register: React.FC<PropsRegister> = ({ changeAuthPage, changeRole, changeAuthorization }) => {
  const [form] = Form.useForm();
  const [notify, setNotification] = useState('');
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserdata] = useState({});
  const [userId, setUserId] = useState('');

  const onFinish = (values: any) => {
    const { email, password } = values;
    setUserdata(values);
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorMessage} - ${errorCode}`);
      setNotification(`${errorMessage} - ${errorCode}`);
      setVisible(true);
    });

    console.log('Received values of form: ', values);
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      setUserId(user.uid);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    if (loggedIn) {
      userData.id = userId;
      checkRef.push(userData);
      changeAuthorization();
    }
  }, [loggedIn]);

  console.log(`Register - ${loggedIn}`);

  const onReset = () => {
    form.resetFields();
    setNotification('');
  };

  const onCancel = () => {
    setVisible(false);
    setNotification('');
  };

  const handleClick = (data: string) => {
    changeAuthPage(data);
  };

  const signOut = () => {
    auth.signOut().then(
      function () {
        console.log('Logged out!');
      },
      function (error) {
        console.log(error.code);
        console.log(error.message);
      }
    );
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
            <p className={'notify'}>{notify}</p>
          </div>
          {
            <Modal visible={visible} title="Error!" onOk={onCancel} onCancel={onCancel}>
              {notify}
            </Modal>
          }
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
          <button type="button" onClick={signOut}>
            {!loggedIn ? 'Some' : 'LogOut'}
          </button>
        </div>
      </main>
    </>
  );
};

export default Register;
