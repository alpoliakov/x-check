import React, { useState, Key, useEffect, Props } from 'react';
import { Card, Form, Input, Select, Button, Tag } from 'antd';
import { databaseRef, auth, checkRef } from '../../../firebase';
import { values } from 'lodash';


type tplotOptions = {
    [key: string]: any;
  };
interface IProps {
  user: any []
}

const AssignRole: React.FC<IProps> = ({user}) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [users, setUser] = useState<any[]>(user);
    const [userKey, setUserKey] = useState<string>('');
    const [role, setRole] = useState<string | null>(null)

    useEffect(
      () => {
       setUser(user);
      },
      [user]
    ) 
  const changeKeyUser = (value: any, event: any) => {
    console.log(event.key, value)
      setUserKey(event.key)
    } 
  const changeRole = (value: string) => {
    setRole(value)
  }
  const onFinish = (): void => {
    if(userKey !== '' && role !== null){
      const changeRoleRef = checkRef.child(userKey).child('roles')
      changeRoleRef.transaction(function(currentRole) {
        const result = currentRole.includes(role)
         if (result) {
           return currentRole
         }else{
            return [role,...currentRole]
         }
     });
    }
 
  };
  const deleteRole = (event: any) => {
    console.log(event)
  } 
  return (
    <>
      <Card style={{ width: '100%' }}> 
        <Form layout="inline"
         form={form}
         style={{ width: '100%', display: "flex", justifyContent: 'space-between', }}>
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
              {Object.entries(users).map(([key, value]) => (   
                <Option key={key}  value={value.nickname}>
                  {value.nickname}     { value.roles.map((userRoles: string, i: number) => <Tag data-tag={userRoles} key={i} color="blue"  closable={i == 0} onClose={deleteRole}>{userRoles}</Tag>)} 
                </Option>
            ))}
            </Select>
          </Form.Item>
          <Form.Item label="Role"> 
            <Select  placeholder="Select a role..." style={{ width: 300 }} onChange={changeRole}>
              <Option value="manager">Manager</Option>
              <Option value="mentor">Mentor</Option>
              <Option value="student">Student</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onFinish}>Assign role</Button>
          </Form.Item>
        </Form>
        </Card>
    </>
  );
};

export default AssignRole;