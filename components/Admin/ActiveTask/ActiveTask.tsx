import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;
import { ITask } from '../../../interfaces/ITask';
import { ICourse, ITaskStep } from '../../../interfaces/ICourse';

interface AProps {
  dataSession: ICourse;
  activeTask: string | undefined;
  getActiveTask: (value: string) => void;
}

const ActiveTask: React.FC<AProps> = ({ dataSession, getActiveTask }) => {
  const [filterDataSession, setFilterDataSession] = useState<ITaskStep[]>([]);

  useEffect(() => {
    const filter = dataSession.tasks.filter((e) => e.taskStage !== 'ARCHIVED');
    setFilterDataSession(filter);
  }, []);
  const onSelected = (value: string) => {
    getActiveTask(value);
  };
  const updateActiveTask = () => {
    setFilterDataSession(dataSession.tasks);
  };
  return (
    <>
      <Form>
        <Form.Item name="Active task" label="Active task" style={{ width: '100%' }}>
          <Select
            placeholder="Active task..."
            style={{ width: 810 }}
            onClick={updateActiveTask}
            onChange={onSelected}
          >
            {filterDataSession.map((province) => (
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
