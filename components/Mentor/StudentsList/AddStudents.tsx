import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Button, Avatar, Tooltip } from 'antd';
import { UserBasic } from '../../../interfaces/IUser';

interface IProps {
  userData: UserBasic[];
  myUid: string;
  getUpdate: (value: string) => void;
}

const AddStudents: React.FC<IProps> = ({ myUid, userData, getUpdate }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [users, setUser] = useState<UserBasic[]>(userData);
  const [userKey, setUserKey] = useState<string>('');

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const changeKeyUser = (value: any, event: any) => {
    setUserKey(event.key);
  };
  const onFinish = (): void => {
    console.log(users.filter((e) => e.uid === userKey));
    if (userKey !== '') {
      getUpdate(userKey);
    }
  };
  return (
    <>
      <Card style={{ width: 'auto', marginRight: 20, marginBottom: 20 }}>
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
              allowClear
              showSearch
              style={{ width: 'auto' }}
              placeholder="Select a user..."
              optionFilterProp="value"
              onSelect={(value, event) => changeKeyUser(value, event)}
              filterOption={(input: string, option: any) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {users.map((item: any) => (
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
            <Tooltip placement="bottom" title="Become a mentor and add yourself a student">
              <Button type="primary" onClick={onFinish}>
                Add student
              </Button>
            </Tooltip>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AddStudents;
