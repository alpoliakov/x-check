import * as React from 'react';
import { useState, useEffect } from 'react';
//import { List, Select } from 'antd';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';



  interface ICriteriaItem {
    itemID: string;
    itemName: string;
    itemScore: number;
    //isFine: boolean;
    isThisPointForAMentor: boolean;
  }
  
const MyCriteriaItem: React.FC<ICriteriaItem> = (props) => {

    const [criteria, setCriteria] = useState('');

    return (

        <React.Fragment>
       <Form.List name="basic">
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
         </React.Fragment>

          );
  };
  
  export default MyCriteriaItem;
  