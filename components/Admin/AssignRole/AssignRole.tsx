import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Button, Tag, Avatar } from 'antd';
import firebase from 'firebase';
import { updateObjectField } from '../../../services/updateFirebase';

interface IProps {
  users: any[];
}

const AssignRole: React.FC<IProps> = ({ users }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [usersData, setUser] = useState<any[]>(users);
  const [userKey, setUserKey] = useState<string>('');
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setUser(users);
  }, [users]);
  const changeKeyUser = (value: any, event: any) => {
    setUserKey(event.key);
  };
  const changeRole = (value: string) => {
    setRole(value);
  };
  const onFinish = (): void => {
    if (
      userKey !== '' &&
      role !== null &&
      !usersData.filter((e) => e.uid === userKey)[0].roles.includes(role)
    ) {
      setUser(
        usersData.map((e) => {
          if (e.uid === userKey) {
            e.roles.push(role);
          }
          return e;
        })
      );
      updateObjectField('users', userKey, {
        roles: firebase.firestore.FieldValue.arrayUnion(role),
      });
    }
  };
  const deleteRole = (key: any) => {
    const result: any = usersData.filter((e) => e.uid === userKey);
    updateObjectField('users', result[0].uid, {
      roles: firebase.firestore.FieldValue.arrayRemove(key),
    });
    console.log(key);
    setUser(
      usersData.map((e) => {
        if (e.uid === userKey) {
          e.roles = result[0].roles.filter((e: string) => e !== key);
        }
        return e;
      })
    );
  };
  return (
    <>
      <Card style={{ width: 962 }}>
        <Form
          layout="inline"
          form={form}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        >
          <Form.Item label="User">
            <Select
              showSearch
              style={{ width: 400 }}
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
                  {item.roles.map((userRoles: string, i: number) => (
                    <Tag
                      data-tag={userRoles}
                      key={i}
                      color="blue"
                      closable={userKey === item.uid}
                      onClose={() => deleteRole(userRoles)}
                    >
                      {userRoles}
                    </Tag>
                  ))}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Role">
            <Select placeholder="Select a role..." style={{ width: 250 }} onChange={changeRole}>
              <Option value="manager">Manager</Option>
              <Option value="mentor">Mentor</Option>
              <Option value="student">Student</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onFinish}>
              Assign role
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AssignRole;
