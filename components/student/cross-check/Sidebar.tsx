import React from 'react';
import { Select, Input } from 'antd';
import { ITaskStep } from '../../../interfaces/ICourse';

interface PropsSidebar {
  tasksData: ITaskStep[];
  getTask: (value: string) => void;
}

const Sidebar: React.FC<PropsSidebar> = ({ getTask, tasksData }) => {
  const { Option } = Select;

  // const [task, setTask] = React.useState('');
  // const [isDeadline, setIsDeadline] = React.useState(false);

  const taskList = tasksData.map((el) => el.name);
  // let deadline = new Date('19:36:21');

  // if (task) {
  //   const activeTask = tasksData.filter((el) => el.name === task);
  //   deadline = activeTask[0].deadline;
  // }

  const handleClick = (value: string) => {
    getTask(value);
    // setTask(value);

    // const date = new Date();

    // if (deadline > date) {
    //   setIsDeadline(true);
    // } else {
    //   setIsDeadline(false);
    // }
  };

  // console.log(deadline);

  return (
    <>
      <Select placeholder="Select the task" onChange={handleClick}>
        {taskList.map((item) => (
          <Option key={item} value={`${item}`}>
            {item}
          </Option>
        ))}
      </Select>
      {}
      <h3>Solution URL Demo</h3>
      <Input placeholder="Link here" />
      <h3>Solution URL Pull request</h3>
      <Input placeholder="Link here" />
    </>
  );
};

export default Sidebar;
