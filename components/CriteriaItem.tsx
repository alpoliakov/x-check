import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface ICriteriaPoint {
  criteriaPointID?: string;
  criteriaPointName?: string;
  criteriaPointScore?: number;
  //isFine: boolean;
  isThisPointForAMentor?: boolean;
}

const MyCriteriaItem: React.FC<ICriteriaPoint> = (props) => {
  return (
    <Form.List name="criterias">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item
                  label={'Criteria item description'}
                  name={[field.name, 'criteriaPointName']}
                  required={true}
                  style={{ minWidth: '480px', width: 'auto' }}
                >
                  <Input placeholder="hh" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={'Score'}
                  name={[field.name, 'criteriaPointScore']}
                  required={true}
                  style={{ minWidth: '100px', width: 'auto' }}
                >
                  <Input placeholder="10" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={'For mentor'}
                  name={[field.name, 'isThisPointForAMentor']}
                  required={false}
                  style={{ minWidth: '180px', width: 'auto' }}
                >
                  <Input placeholder="true if not empty" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={'is Fine?'}
                  name={[field.name, 'isFine']}
                  required={false}
                  style={{ minWidth: '160px', width: 'auto' }}
                >
                  <Input placeholder="true if not empty" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={'Criteria group'}
                  name={[field.name, 'groupName']}
                  required={true}
                  style={{ minWidth: '300px', width: 'auto' }}
                >
                  <Input placeholder="Criteria group name" style={{ width: '100%' }} />
                </Form.Item>
                {/*<Form.Item label={'For mentor'} name="if" required={false}>
                      <Checkbox style={{ width: '10%' }} />
                     </Form.Item>*/}
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
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};
export default MyCriteriaItem;
