import React from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;
import { ITask } from '../../../interfaces/ITask';

interface AProps {
  task: any[];
}

const ActiveTask: React.FC<AProps> = ({ task }) => {
  const onSelected = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <Form>
        <Form.Item name="Active task" label="Active task" style={{ width: '100%' }}>
          <Select placeholder="Active task..." style={{ width: 810 }} onChange={onSelected}>
            {task
              .filter((e: ITask) => e.state === 'active')
              .map((province: ITask) => (
                <Option key={province.id} value={province.name}>
                  {province.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default ActiveTask;
