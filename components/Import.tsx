import * as React from 'react';
import { Form, Input, Button } from 'antd';
import MyCriteria from './Criteria';
import { auth } from '../firebase';
import { ICriteriaGroup, StateTask } from '../interfaces/ITask';
import { setDocument } from '../services/updateFirebase';
import { useEffect, useState } from 'react';

const Import: React.FC = () => {

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinish2 = (values: any) => {
    console.log('Success:', values);
  };
  const onFinish3 = (values: any) => {
    console.log('Success:', values);
  };
  const { TextArea } = Input;
  return (
    <div>
      <h2 style={{ width: '400px', margin: '40px 0', lineHeight: '30px', padding: '0px' }}>
        Import a task from GitHub in md format:
      </h2>
      <div style={{ margin: '0 0 130px' }}>
        <Form
          name="load-task"
          onFinish={onFinish}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Form.Item
            label=""
            name="link"
            style={{ width: '500px', marginBottom: '0px', height: '50px' }}
          >
            <Input name="link" placeholder="https://github.com/... .md" />
            <p style={{ color: 'grey' }}>Enter URL of the github page with the task in md</p>
          </Form.Item>
          <Form.Item label="" name="prefix-group" style={{ width: '200px', marginBottom: '0px' }}>
            <Input name="prefix-group" placeholder="-**" />
            <p style={{ color: 'grey', margin: '0 10px' }}>
              prefix before the groupname of requirements
            </p>
          </Form.Item>
          <Form.Item label="" name="prefix-item" style={{ width: '200px', marginBottom: '0px' }}>
            <Input name="prefix-item" placeholder="*" />
            <p style={{ color: 'grey' }}>prefix before each requirement</p>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add the task to the database
            </Button>
          </Form.Item>
        </Form>
      </div>
      <h2 style={{ width: '400px', margin: '40px 0', lineHeight: '30px', padding: '0px' }}>
        Import/Export to JSON:
      </h2>
      <div>
        <Form
          name="recieve-task"
          onFinish={onFinish2}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <p style={{ color: 'grey', lineHeight: '30px', paddingBottom: '10px' }}>
            You can recieve any task in JSON format from the database by its name
          </p>
          <Form.Item
            label=""
            name="name"
            style={{ width: '500px', marginBottom: '0px', paddingBottom: '0', height: '50px' }}
          >
            <Input name="name" placeholder="Task name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Recieve JSON
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Form name="show-task" onFinish={onFinish3}>
          <TextArea
            rows={4}
            style={{ width: '100%', padding: '15px', marginBottom: '15px' }}
            placeholder=" JSON fom the database will be shown here and you will be able to copy it. 
            If you want to add your task to the database type it in this field and press the button Send. 
            While the JSON format is correct the task will open in the form for editing."
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Button type="primary" htmlType="submit">
                  Import JSON in RSS Checklist format
                </Button>
              </Form.Item>
              <p style={{ color: 'grey' }}>
                click this button if you import JSON in RSS Checklist format
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Button type="primary" htmlType="submit">
                  Import JSON in our format
                </Button>
              </Form.Item>
              <p style={{ color: 'grey' }}>
                click this button if you are importing JSON in our application format
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Import;