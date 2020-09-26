import * as React from 'react';


import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Checkbox, Collapse, Row, Col, Typography, Tag  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import MyCriteriaItem from './CriteriaItem';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


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

const MyCriteria: React.FC<ICriteriaGroup> = (id, criteria) => {
 
 
  const onFinish = (values:any) => {
    console.log('Received values of form:', values);
  };

  const handleChange = () => {
    form.setFieldsValue({ requirements: [] });
  };
  
  const [form] = Form.useForm();

  return (

  <React.Fragment>
        
        <Form.List name="criteriagroup">
            {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                            <Form.Item label={'Criteria group'} name={[field.name,"groupName"]} required={false} style={{ width: '600px' }}>
                               <Input placeholder="hh" style={{ width: '100%' }} onChange={handleChange} />
                            </Form.Item>
                            <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                                remove(field.name);
                            }}
                            />
                        </Space>
                         
                    ))}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => {
                            add();
                            }}
                            block
                            style={{ width: '20%' }}
                        >
                            <PlusOutlined /> Add criteria group
                        </Button>
                    </Form.Item>
                  </div>
                );
             }}
        </Form.List>
        <MyCriteriaItem  />
  </React.Fragment>
  );
};

export default MyCriteria;