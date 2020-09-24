import * as React from 'react';
import { useState, useEffect } from 'react';
//import { List, Select } from 'antd';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import MyCriteria from './Criteria';
import MyCriteriaItem from './CriteriaItem';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { db, taskRef } from "../firebase";
//import { useForm } from "react-hook-form";

interface ITask {
  id?: string;
  name?: string;
  authorName?: string;
  state?: StateTask;
  publishedAt?: Date;
  demo?: string;
  description?: string;
  evaluationCriteria?: ICriteriaGroup[];
  maxScore?: number;
  usefulLinks?: string[];
  oldUrl?: string; // откуда импортировали таск
  useJury?: boolean; //будет ли оценка жюри
  checkingType?: 'crossCheck',
  //setFieldsValue: (values:any) => void
 
}

export enum StateTask {
  draft,
  active,
  published,
}

interface ICriteriaGroup {
  groupID?: string;
  groupName?: string;
  criteriaPoints?: ICriteriaPoint[];
  //setFieldsValue: (values:any) => void;
}
interface ICriteriaPoint {
  criteriaPointID?: string;
  criteriaPointName?: string;
  criteriaPointScore?: number;
  //isFine: boolean;
  isThisPointForAMentor?: boolean;
}


const Myform: React.FC<ITask> = (props) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [demo, setDemo] = useState('');
  const [criteria, setCriteria] = useState('');


  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    const formValues = values;
    const task = {name: values.name, description: values.description,
    
    }

    db.collection('tasks').add(values);
  };
  
  



  return (
    <Form name="create-task" id={props.id} onFinish={onFinish}>
      <h2>Create a new task:</h2>  
      <Form.Item label="Name" name="name">
        <Input name="name" placeholder="your name" /> 
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input name="description" placeholder="This task is ..." /> 
      </Form.Item>
      <Form.Item label="Demo" name="demo">
        <Input name="demo"  placeholder="link at your demo" /> 
      </Form.Item>
      <h3>Requirements:</h3>
       
      <MyCriteria  />

    

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
     
    </Form>
  );
};

export default Myform;

