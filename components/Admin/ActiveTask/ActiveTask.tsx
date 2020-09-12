import React from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;

interface AProps {
  data: string [];
}

const ActiveTask: React.FC<AProps> = ({ data }) => {
  return (
    <>
      <Form>
        <Form.Item name="Active task" label="Active task" style={{ width: '100%' }}>
          <Select placeholder="Active task..." style={{ width: 810 }}>
            {data.map((province: string) => (
              <Option key={province} value={province}>
                {province}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
};

export default ActiveTask;
