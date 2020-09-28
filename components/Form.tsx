import * as React from 'react';
import { Form, Input, Button, Space } from 'antd';
import MyCriteria from './Criteria';
import { db, taskRef } from '../firebase';
import { ITask, ICriteriaGroup } from '../interfaces/ITask';

const Myform: React.FC = (props) => {

  const onFinish = (values: any) => {
    const evaluationCriteria: any = [];

    for (let i = 0; i < values.criterias.length; i++) {
      const criteriaPoint = {
        criteriaPointID: values.criterias[i].criteriaPointName,
        criteriaPointName: values.criterias[i].criteriaPointName,
        criteriaPointScore: values.criterias[i].criteriaPointScore,
        isFine: values.criterias[i].isFine,
        isThisPointForAMentor: values.criterias[i].isThisPointForAMentor,
      };
      for (let j = 0; j < evaluationCriteria.length; j++) {
        if (evaluationCriteria[j].groupName === values.criterias[i].groupName) {
          evaluationCriteria[j].criteriaPoints.push(criteriaPoint);
          criteriaPoint.criteriaPointName = undefined;
        }
      }
      if (criteriaPoint.criteriaPointName !== undefined) {
        const criteriaGroup: ICriteriaGroup = {
          groupID: values.criterias[i].groupName,
          groupName: values.criterias[i].groupName,
          criteriaPoints: [],
        };
        criteriaGroup.criteriaPoints.push(criteriaPoint);
        evaluationCriteria.push(criteriaGroup);
      }
    }

    let taskstate = '';
    if (values.ifPublish === 'true') {
      taskstate = 'draft';
    } else {
      taskstate = 'published';
    }

    const newTask = {
      name: values.name,
      id: values.name,
      description: values.description,
      publisherID: '',
      evaluationCriteria: evaluationCriteria,
      useJury: false,
      checkingType: 'crossCheck',
      state: taskstate,
    };
    db.collection('tasks').add(newTask);
  };
// id={props.id}
  return (
    <Form name="create-task" onFinish={onFinish}>
      <h2>Create a new task:</h2>
      <Form.Item label="Name" name="name">
        <Input name="name" placeholder="Task name" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input name="description" placeholder="This task is ..." />
      </Form.Item>
      <h3>Requirements:</h3>
      <MyCriteria />
      <Form.Item label="Save as draft?" name="ifPublish" style={{ width: '110px' }}>
        <Input name="ifPublish" placeholder="true or false" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Myform;
