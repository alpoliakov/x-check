import * as React from 'react';
import { useState, useEffect } from 'react';
//import { List, Select } from 'antd';
import { Form, Input, Button, Space } from 'antd';
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

  const [state, setState] = useState(false);
  
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    const formValues = values;
    if (values.ifPublish) 
          setState (true) ;
    const collectGroupName = values.criteriagroup.map ((v:any) => v.groupName);
    console.log(collectGroupName);
    const u = values.criteria1.map ((v:any) => v.groupName);
    console.log(u);
    
    const collectItemName = values.criteria1.filter( (v:any, index:any) => {return v.groupName == collectGroupName[0]});
    console.log(collectItemName);
    
   
    const x2 = 
      values.criteriagroup.map ((v:any, index:any) => 
           v.groupName.concat (
            values.criteria1.filter( (i:any) => {return i.groupName == collectGroupName[index]})
            )
          
        
           
          );
    console.log(x2);  
     const x = values.criteriagroup.forEach(function(item:any, i:any) {
          item: {
            values.criteria1.forEach (function(item2:any,j:any) {
                  item2: {values.criteria1.filter( (v:any, index:any) => {return v.groupName == collectGroupName[i]})
                   }

             },
            )
          }
        })
      ;
    console.log(x);

    const taskValues = {name: values.name, id: values.id, description: values.description,
                        demo: values.demo, usefulLinks:values.usefulLinks,
                        evaluationCriteria: {groupName: collectGroupName, criteriaPointName: collectItemName},
                        
                        state: state
    };
    
    
    console.log('taskValues:', taskValues);
    db.collection('tasks').add(values);
  };
  
  



  return (
    <Form name="create-task" id={props.id} onFinish={onFinish}>
      <h2>Create a new task:</h2>  
      <Form.Item label="Name" name="name">
        <Input name="name" placeholder="Task name" /> 
      </Form.Item>
      <Form.Item label="ID" name="id">
        <Input name="id" placeholder="Task id" /> 
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input name="description" placeholder="This task is ..." /> 
      </Form.Item>
      <Form.Item label="Demo" name="demo">
        <Input name="demo"  placeholder="Link to your demo" /> 
      </Form.Item>
      <Form.Item label="Useful links" name="usefulLinks">
        <Input name="usefulLinks" placeholder="Your links" /> 
      </Form.Item>
      <h3>Requirements:</h3>
      <MyCriteria  />
      <Form.Item label="Publish your task?" name="ifPublish" style={{ width: '110px' }}>
        <Input name="ifPublish" placeholder="true or false" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
     
    </Form>
  );
};

export default Myform;

