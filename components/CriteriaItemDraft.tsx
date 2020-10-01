import * as React from 'react';
import { Form, Input, Button, Space, Checkbox } from 'antd';
import { ICriteriaGroup } from '../interfaces/ITask';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const MyCriteriaItemDraft: React.FC<{ evaluationCriteria: any }> = ({ evaluationCriteria }) => {
  const pointArray: any[] = [];
  if (evaluationCriteria[0].criteriaPoints) {
    evaluationCriteria.forEach((group: ICriteriaGroup) => {
      group.criteriaPoints.forEach((point) => {
        const item = {
          criteriaPointName: point.criteriaPointName,
          criteriaPointScore: point.criteriaPointScore,
          isThisPointForAMentor: point.isThisPointForAMentor,
          isFine: point.isFine,
          groupName: group.groupName,
        };
        pointArray.push(item);
      });
    });
  }
  return (
    <Form.List name="criterias">
      {(fields, { add, remove }) => {
        for (let i = 0; i < pointArray.length; i++) {
          fields.push({ fieldKey: i, name: i, key: i });
        }

        return (
          <div>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item
                  label={'criteriaPointName'}
                  name={[field.name, 'criteriaPointName']}
                  required={true}
                  style={{ minWidth: '480px', width: 'auto' }}
                >
                  <Input
                    placeholder="Criteria item description"
                    style={{ width: '100%' }}
                    defaultValue={
                      pointArray[field.name].criteriaPointName
                        ? pointArray[field.name].criteriaPointName
                        : ''
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={'Score'}
                  name={[field.name, 'criteriaPointScore']}
                  required={true}
                  style={{ minWidth: '100px', width: 'auto' }}
                >
                  <Input
                    placeholder="10"
                    style={{ width: '100%' }}
                    defaultValue={
                      pointArray[field.name].criteriaPointScore
                        ? pointArray[field.name].criteriaPointScore
                        : ''
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={'For mentor'}
                  name={[field.name, 'isThisPointForAMentor']}
                  required={false}
                  style={{ minWidth: '180px', width: 'auto' }}
                >
                  <Input
                    placeholder="true if not empty"
                    style={{ width: '100%' }}
                    defaultValue={
                      pointArray[field.name].isThisPointForAMentor
                        ? pointArray[field.name].isThisPointForAMentor
                        : 'false'
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={'is Fine?'}
                  name={[field.name, 'isFine']}
                  required={false}
                  style={{ minWidth: '160px', width: 'auto' }}
                >
                  <Input
                    placeholder="true if not empty"
                    style={{ width: '100%' }}
                    defaultValue={
                      pointArray[field.name].isFine ? pointArray[field.name].isFine : 'false'
                    }
                  />
                </Form.Item>
                <Form.Item
                  label={'Criteria group'}
                  name={[field.name, 'groupName']}
                  required={true}
                  style={{ minWidth: '300px', width: 'auto' }}
                >
                  <Input
                    placeholder="Criteria group name"
                    style={{ width: '100%' }}
                    defaultValue={
                      pointArray[field.name].groupName ? pointArray[field.name].groupName : ''
                    }
                  />
                </Form.Item>
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    pointArray.shift();
                    remove(field.name);
                  }}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  pointArray.push("");
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
export default MyCriteriaItemDraft;
