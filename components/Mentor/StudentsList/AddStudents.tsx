import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Button, Tag, Avatar } from 'antd';
import firebase from 'firebase';
import { updateObjectField } from '../../../services/updateFirebase';
import { auth } from '../../../firebase';

interface IProps {
  users: any[];
  myUid: string;
}

const AddStudents: React.FC<IProps> = ({ users, myUid }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [usersData, setUser] = useState<any[]>([]);
  const [userKey, setUserKey] = useState<string>('');

  useEffect(() => {
    console.log('add', myUid);
    setUser(users.filter((e) => e.uid !== myUid));
  }, []);

  const changeKeyUser = (value: any, event: any) => {
    console.log(event.key);
    setUserKey(event.key);
  };
  const onFinish = (): void => {
    if (userKey !== '' && !usersData.filter((e) => e.uid === userKey).includes(userKey)) {
      updateObjectField('users', userKey, {
        students: firebase.firestore.FieldValue.arrayUnion(userKey),
      });
    }
  };
  return (
    <>
      <Card style={{ width: 'auto', marginRight: 20 }}>
        <Form
          layout="inline"
          form={form}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Form.Item label="User">
            <Select
              showSearch
              style={{ width: 'auto' }}
              placeholder="Select a user..."
              optionFilterProp="value"
              onSelect={(value, event) => changeKeyUser(value, event)}
              /* onChange={(e) => changeKeyUser(e)} */
              filterOption={(input: string, option: any) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {usersData.map((item: any) => (
                <Option key={item.uid} value={item.nickname}>
                  <Avatar
                    size={20}
                    src={
                      item.avatar_url
                        ? item.avatar_url
                        : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                  />{' '}
                  {item.nickname}{' '}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{
              marginTop: 30,
            }}
          >
            <Button type="primary" onClick={onFinish}>
              Add student
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddStudents;
