import React from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;
import { ITask } from '../../../interfaces/ITask';
import { ICourse, ITaskStep } from '../../../interfaces/ICourse';

interface AProps {
  dataSession: ICourse[];
  activeTask: string | undefined;
  getActiveTask: (value: string) => void;
}

const ActiveTask: React.FC<AProps> = ({ dataSession, getActiveTask }) => {
  const onSelected = (value: string) => {
    getActiveTask(value);
  };
  return (
    <>
      <Form>
        <Form.Item name="Active task" label="Active task" style={{ width: '100%' }}>
          <Select placeholder="Active task..." style={{ width: 810 }} onChange={onSelected}>
            {dataSession[0].tasks.map((province) => (
              <Option key={province.taskID} value={province.taskID}>
                {province.taskID}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default ActiveTask;
