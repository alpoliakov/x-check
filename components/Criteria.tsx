import * as React from 'react';
import { useState, useEffect } from 'react';
//import { List, Select } from 'antd';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


interface ICriteria {
    groupID: string;
    groupName: string;
    criteriaItem: ICriteriaItem[];
  }
  interface ICriteriaItem {
    itemID: string;
    itemName: string;
    itemScore: number;
    //isFine: boolean;
    isThisPointForAMentor: boolean;
  }

const MyCriteria: React.FC<ICriteria> = (id, criteria) => {

    //const [criteria, setCriteria] = useState('');
    
    /*
    const criteriaChange = (EO:React.ChangeEvent<HTMLInputElement>) => {
        setCriteria(EO.target.value);
        console.log(criteria);
      };
    */

    const onFinish = (values:any) => {
        console.log('Received values of form:', values);
    }
    
    return (
     <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">   
      <Form.Item label="Criteria" name="criteria">
        <Input name="criteria" value={criteria} placeholder="link at your demo" /> {/* onChange={criteriaChange}/> */}
      </Form.Item>
      </Form>
        );
};

export default MyCriteria;
