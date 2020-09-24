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




  {/*
    const { Panel } = Collapse;
    const { Title } = Typography;

    const nameGroup = (
        <Row justify="space-between">
          <Col span={21}>
            <Title level={5}>
                <Input placeholder="hh" style={{ width: '100%' }}  />
            </Title>
          </Col>
          <Col span={3}>
            <Tag >
              1/1
            </Tag>
          </Col>
        </Row>
      );
    */}  
    return (

  <React.Fragment>
        
        <Form.List name="criteriagroup">
            {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                            <Form.Item label={'Criteria group'} name={[field.name,"criteria"]} required={false} style={{ width: '700px' }}>
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




/*
        <div>
      <Collapse>
        <Panel header={nameGroup} key={111}>
          {criteriaGroup.criteriaPoints.map((item, index) => {
            return (
              <MyCriteriaItem
                //criteriaPoint={item}
                itemID='' 
                itemName={item} 
                itemScore={0}
               //cheсkingPoint={cheсkingPoints[index]}
                //role={role}
                //typeTask={typeTask}
                //stateCheck={stateCheck}
                //onChangeScore={onChangeScore}
                //onChangeComment={onChangeComment}
                //onAgreePoint={onAgreePoint}
                //onDisagreePoint={onDisagreePoint}
                key={index}
              />
            );
          })}
        </Panel>
      </Collapse>
    </div>



        );
};

export default MyCriteria; */




{/*
        
      <React.Fragment>
      <Form.Item label="Criteria" name="criteria">
        <Input name="criteria" value={criteria} placeholder="add your criteria" /> 
      </Form.Item>
      <MyCriteriaItem itemID='' itemName='' itemScore={0}  />
      </React.Fragment>

*/}
        
