import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import importTaskMD, { importTaskRSSChecklist } from '../services/importTasks';

const Import: React.FC<{ dataTasks: any[]; getClickDraft: (value: any) => void }> = ({
  dataTasks,
  getClickDraft,
}) => {
  const [getTask, setTask] = useState('');
  const onFinish = (values: any) => {
    // const x = async () => {
    //   const response = await fetch(values.link);
    //     const json = await response.json();
    console.log('Success:', values);
    // console.log(response);
    // if (response.ok) {
    // } else {
    //   console.log('Ошибка HTTP: ' + response.status);
    // }
    // }
    // x();
  };

  const onFinish2 = (values: any) => {
    let taskFromDB: any;
    dataTasks.forEach((task) => {
      if (task.name === values.taskName) {
        taskFromDB = JSON.stringify(task);
      }
    });
    if (taskFromDB) {
      setTask(taskFromDB);
    } else {
      setTask(
        'task with this name were not found in our database, make sure you entered it correctly'
      );
    }
  };

  const onFinish3 = (values: any) => {
    console.log('Success:', values);
  };

  const onOutputChange = (event: any) => {
    setTask(event.target.value);
  };

  const MDImport = (getTask: string) => {
    try {
      const newTask = importTaskMD(getTask);
      getClickDraft(newTask); 
    } catch {
      setTask("Sorry, I can't parse your data, please make sure you enter text as MD");
    }
  }

  const RSSChecklistImport = (getTask: string) => {
    try {
      const task = JSON.parse(getTask);
      const newTask = importTaskRSSChecklist(task);
      getClickDraft(newTask);
    } catch (err) {
      setTask(
        "Sorry, I can't parse your data, please make sure you enter JSON as a string according to the format RSS Checklist"
      );
    }

  }

  const houmImport = (getTask: string) => {
    try {
      const task = JSON.parse(getTask);
      getClickDraft(task);
    } catch (err) {
      setTask(
        "Sorry, I can't parse your data, please make sure you enter JSON as a string according to the format our application"
      );
    }
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
          <div style={{ margin: '0 10px 0 0' }}>
            <Form.Item label="" name="link" style={{ width: '500px', marginBottom: '0px' }}>
              <Input name="link" placeholder="https://github.com/... .md" />
            </Form.Item>
            <p style={{ color: 'grey', margin: '0 10px' }}>
              Enter URL of the github page with the task in md
            </p>
          </div>
          <div>
            <Form.Item label="" name="prefix-group" style={{ width: '200px', marginBottom: '0px' }}>
              <Input name="prefix-group" placeholder="-**" />
            </Form.Item>
            <p style={{ color: 'grey', margin: '0 10px' }}>
              prefix before the groupname of requirements
            </p>
          </div>
          <div style={{ margin: '0 10px' }}>
            <Form.Item label="" name="prefix-item" style={{ width: '200px', marginBottom: '0px' }}>
              <Input name="prefix-item" placeholder="*" />
            </Form.Item>
            <p style={{ color: 'grey' }}>prefix before each requirement</p>
          </div>
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
            name="taskName"
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
            value={getTask}
            onChange={onOutputChange}
            rows={4}
            style={{ width: '100%', padding: '15px', marginBottom: '15px' }}
            placeholder=" JSON fom the database will be shown here and you will be able to copy it. 
            If you want to add your task to the database type it in this field and press the button Send. 
            While the JSON format is correct the task will open in the form for editing."
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Button
                type="primary"
                style={{ marginBottom: '10px' }}
                onClick={() => RSSChecklistImport(getTask)}
              >
                Import JSON in RSS Checklist format
              </Button>
              <p style={{ color: 'grey' }}>
                click this button if you import JSON in RSS Checklist format
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                style={{ marginBottom: '10px' }}
                onClick={() => houmImport(getTask)}
              >
                Import JSON in our format
              </Button>
              <p style={{ color: 'grey' }}>
                click this button if you are importing JSON in our application format
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{ marginBottom: '10px' }}
                onClick={() => MDImport(getTask)}
              >
                Import from MD
              </Button>
              <p style={{ color: 'grey' }}>
                click this button if you are importing md format
              </p>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Import;