import * as React from 'react';
import { useState, useEffect } from 'react';
//import { List, Select } from 'antd';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Criteria from './Criteria';
import CriteriaItem from './CriteriaItem';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
//import { useForm } from "react-hook-form";

interface ITask {
  id: string;
  name: string;
  author?: string;
  state: 'draft' | 'published';
  publishedAt?: Date;
  demo?: string;
  description: string;
  evaluationCriteria?: ICriteria[];
  maxScore: number;
  usefulLinks?: string[];
  oldUrl?: string; // откуда импортировали таск
  useJury?: boolean; //будет ли оценка жюри
  checkingType: 'crossCheck'
 
}
interface ICriteria {
  groupID: string;
  groupName: string;
  criteriaItem: ICriteriaItem[];
}
interface ICriteriaItem {
  itemID: string;
  itemName: string;
  itemScore: number;
  isFine: boolean;
  isThisPointForAMentor: boolean;
}

const Myform: React.FC<ITask> = (props) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [demo, setDemo] = useState('');
  const [criteria, setCriteria] = useState('');
  //const [itemName, setItemName] = useState('');
  //const [itemScore, setItemScore] = useState('');
  //const [itemChecked, setItemChecked] = useState('');

/*
  const nameChange = (EO:React.ChangeEvent<HTMLInputElement>) => {
    setName(EO.target.value);
    console.log(name);
  };

  const descriptionChange = (EO:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(EO.target.value);
    console.log(description);
  };

  const demoChange = (EO:React.ChangeEvent<HTMLInputElement>) => {
    setDemo(EO.target.value);
    console.log(demo);
  };

  const criteriaChange = (EO:React.ChangeEvent<HTMLInputElement>) => {
    setCriteria(EO.target.value);
    console.log(criteria);
  };
*/


  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  
  const onFinish2 = (values: any) => {
    console.log('Received values of form:', values);
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
      <p>Basic Scope:</p>
{/*      <Criteria groupID='' groupName={criteria} criteriaItem='' />
*/}
      
      <Form.Item label="CriteriaGroup" name="groupName">
        <Input name="groupName"  placeholder="Basic Scope" /> 
      </Form.Item>
      
{/*
      <CriteriaItem itemID='' itemName={itemName} itemScore={itemScore}
                    isFine='false' isThisPointForAMentor={itemChecked} />       
*/}      
    <React.Fragment >
    
      <Form.List name="basic" >
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                   <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'For mentor'} required={false}>
                    <Checkbox style={{ width: '10%' }} />
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
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </React.Fragment>
  
      <p>Extra Scope:</p>
      <Form.Item label="CriteriaGroup" name="groupName">
        <Input name="groupName"  placeholder="Extra Scope" /> 
      </Form.Item>
      <Form.List name="extra">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'For mentor'} required={false}>
                    <Checkbox style={{ width: '10%' }} />
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
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <p>Fines:</p>
      <Form.List name="fines">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'For mentor'} required={false}>
                    <Checkbox style={{ width: '10%' }} />
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
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}     
      </Form.List>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Myform;

     
      {/*<p>Basic Scope:</p>
      <Form.List name="basic">
        {(fields, { add, remove }) => {
          return (
             <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria group'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
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
              {fields.length < 1 ? (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add criteria group
                </Button>
              </Form.Item>) : null}
            </div>
            );
        }}
      </Form.List>
      <Form.List name="basic2">
        {(fields, { add, remove }) => {
          return (
             <div>  
             {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'For mentor'} required={false}>
                  <Checkbox style={{ width: '10%' }} />
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
                style={{ width: '20%' }}
              >
                <PlusOutlined /> Add criteria
              </Button>
            </Form.Item>
            </div>
            );
        }}
      </Form.List>

      <Form.List name="basic">
        {(fields, { add, remove }) => {
          return (
             <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria group'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
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
              {fields.length < 1 ? (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add criteria group
                </Button>
              </Form.Item>) : null}
            </div>
            );
        }}
      </Form.List>
      <Form.List name="basic2">
        {(fields, { add, remove }) => {
          return (
             <div>  
             {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'For mentor'} required={false}>
                  <Checkbox style={{ width: '10%' }} />
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
                style={{ width: '20%' }}
              >
                <PlusOutlined /> Add criteria
              </Button>
            </Form.Item>
            </div>
            );
        }}
      </Form.List>

      <Form.List name="basic">
        {(fields, { add, remove }) => {
          return (
             <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria group'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
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
              {fields.length < 1 ? (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add criteria group
                </Button>
              </Form.Item>) : null}
            </div>
            );
        }}
      </Form.List>
      <Form.List name="basic2">
        {(fields, { add, remove }) => {
          return (
             <div>  
             {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'For mentor'} required={false}>
                  <Checkbox style={{ width: '10%' }} />
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
                style={{ width: '20%' }}
              >
                <PlusOutlined /> Add criteria
              </Button>
            </Form.Item>
            </div>
            );
        }}
      </Form.List>

      <Form.List name="basic">
        {(fields, { add, remove }) => {
          return (
             <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria group'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
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
              {fields.length < 1 ? (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add criteria group
                </Button>
              </Form.Item>) : null}
            </div>
            );
        }}
      </Form.List>
      <Form.List name="basic2">
        {(fields, { add, remove }) => {
          return (
             <div>  
             {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'For mentor'} required={false}>
                  <Checkbox style={{ width: '10%' }} />
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
                style={{ width: '20%' }}
              >
                <PlusOutlined /> Add criteria
              </Button>
            </Form.Item>
            </div>
            );
        }}
    </Form.List>*/}



          {/*  <div>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label={'For mentor'} required={false}>
                  <Checkbox style={{ width: '10%' }} />
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
                style={{ width: '20%' }}
              >
                <PlusOutlined /> Add criteria
            </Button>
            </Form.Item>*/}
          {/*</div>
  
          );
        }}
    </Form.List>*/}
     {/* <p>Extra Scope:</p>
      <Form.List name="extra">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'For mentor'} required={false}>
                    <Checkbox style={{ width: '10%' }} />
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
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <p>Fines:</p>
      <Form.List name="fines">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item label={'Criteria'} required={false} style={{ width: '700px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'Score'} required={false} style={{ width: '110px' }}>
                    <Input placeholder="" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label={'For mentor'} required={false}>
                    <Checkbox style={{ width: '10%' }} />
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
                  style={{ width: '20%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
    </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Myform;*/}
