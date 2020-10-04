import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip, Checkbox, Button, Row, Modal, Typography } from 'antd';
import { auth, db } from '../../firebase';
import { gitUserAPI } from '../api/api';
import { useRouter } from 'next/router';

const { Link } = Typography;

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
  changeAuthorization: () => void;
}

const Register: React.FC<PropsRegister> = ({ changeAuthPage, changeAuthorization }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [notify, setNotification] = useState('');
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    avatar_url: '',
    location: '',
    nickname: '',
    html_url: '',
    password: '',
    email: '',
    roles: [],
    uid: '',
    login: '',
    tasksID: [],
    studentsid: [],
  });
  const [userDataFromGit, setUserDataFromGit] = useState({});

  const getUserDataFromGit = async (nickname: string) => {
    const response = await fetch(`${gitUserAPI}${nickname}`);
    const data = await response.json();
    await setUserDataFromGit(data);
  };

  const onFinish = (values: any) => {
    const { email, password, nickname, roles } = values;
    getUserDataFromGit(nickname).catch((e) => new Error(e));
    setUserData({
      uid: '',
      name: '',
      avatar_url: '',
      location: '',
      html_url: '',
      login: '',
      nickname: nickname,
      password: password,
      email: email,
      roles: roles,
      tasksID: [],
      studentsid: [],
    });
    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorMessage} - ${errorCode}`);
      setNotification(`${errorMessage} - ${errorCode}`);
      setVisible(true);
    });
    console.log('Received values of form: ', userData);
  };

  const setUserDataInDB = async () => {
    // @ts-ignore
    const { name, avatar_url, location, html_url, login } = userDataFromGit;
    // @ts-ignore
    const uid = auth.currentUser.uid;
    await setUserData(() => {
      userData.name = name;
      userData.avatar_url = avatar_url;
      userData.location = location || 'unknown';
      userData.html_url = html_url;
      userData.uid = uid;
      userData.login = login;
      return userData;
    });
    await db.collection('users').doc(userData.uid).set(userData);
    await changeAuthorization();
    await router.push(`/main`);
  };

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user): void => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    if (loggedIn) {
      setUserDataInDB().catch((e) => new Error(e.message));
    }
    return () => subscribe();
  }, [loggedIn]);

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
                  Nickname Git&nbsp;
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
            <Form.Item
              name="roles"
              label="Roles"
              rules={[{ required: true, message: 'Please select at least one role!' }]}
            >
              <Checkbox.Group>
                <Row>
                  <Checkbox value="student" style={{ lineHeight: '32px' }}>
                    student
                  </Checkbox>

                  <Checkbox value="admin" style={{ lineHeight: '32px' }}>
                    admin
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="mentor" style={{ lineHeight: '32px' }}>
                    mentor
                  </Checkbox>
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
            <br />
            <p className={'login__now_text'}>
              <Link onClick={() => handleClick('login')}>Login now</Link> or register with{' '}
              <Link onClick={() => handleClick('github')}>GitHub</Link>
            </p>
          </Form>
        </div>
      </main>
    </>
  );
};

export default Register;
