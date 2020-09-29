import * as React from 'react';
import { Form, Input, Button } from 'antd';
import MyCriteria from './Criteria';
import { auth } from '../firebase';
import { ICriteriaGroup, StateTask } from '../interfaces/ITask';
import { setDocument } from '../services/updateFirebase';
import { useEffect, useState } from 'react';

const Myform: React.FC = () => {
  const [myUid, setMyUid] = useState<any>();
  useEffect(() => {
    const waitForCurrentUser = setInterval(() => {
      // @ts-ignore
      const uid = auth.currentUser;
      if (uid !== null) {
        clearInterval(waitForCurrentUser);
        const myuid = uid.uid;
        setMyUid(myuid);
        return uid;
      } else {
        console.log('Wait for it');
      }
    }, 300);
  }, []);
  const onFinish = (values: any) => {
    const evaluationCriteria: any = [];

    for (let i = 0; i < values.criterias.length; i++) {
      const criteriaPoint = {
        criteriaPointID: values.criterias[i].criteriaPointName,
        criteriaPointName: values.criterias[i].criteriaPointName,
        criteriaPointScore: values.criterias[i].criteriaPointScore,
        isFine: values.criterias[i].isFine && values.criterias[i].isFine !== 'false'? true : false,
        isThisPointForAMentor:
          values.criterias[i].isThisPointForAMentor &&
          values.criterias[i].isThisPointForAMentor !== 'false'
            ? true
            : false,
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

    let taskstate = StateTask.published;
    if (values.ifPublish && values.ifPublish !== 'false') {
      taskstate = StateTask.draft;
    }

    let useJury = false;
    if (values.useJury && values.useJury !== 'false') {
      useJury = true;
    } 

    const newTask = {
      name: values.name,
      id: values.name,
      description: values.description,
      evaluationCriteria: evaluationCriteria,
      useJury: useJury,
      checkingType: 'crossCheck',
      state: taskstate,
      publishedAt: new Date(2020, 0, 2).getTime(),
      demo: values.demo,
      authorName: values.authorName,
      usefulLinks: values.usefulLinks,
      oldUrl: values.oldUrl,
      publisherID: myUid,
    };
    setDocument('TasksArray', newTask.id, newTask);
  };

  return (
    <Form name="create-task" onFinish={onFinish}>
      <h2>Create a new task:</h2>
      <Form.Item label="Name" name="name">
        <Input name="name" placeholder="Task name" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input name="description" placeholder="This task is ..." />
      </Form.Item>
      <Form.Item label="demo" name="demo">
        <Input name="demo" placeholder="demo url" />
      </Form.Item>
      <Form.Item label="usefulLinks" name="usefulLinks">
        <Input name="usefulLinks" placeholder="useful links" />
      </Form.Item>
      <Form.Item label="authorName" name="authorName">
        <Input name="authorName" placeholder="task author name" />
      </Form.Item>
      <Form.Item label="oldUrl" name="oldUrl">
        <Input name="oldUrl" placeholder="old link where you got this task from" />
      </Form.Item>
      <h3>Requirements:</h3>
      <MyCriteria />
      <Form.Item label="_Save as draft?_" name="ifPublish" style={{ width: '130px' }}>
        <Input name="ifPublish" placeholder="true if not empty" />
      </Form.Item>
      <Form.Item label="use presentation?" name="useJury" style={{ width: '130px' }}>
        <Input name="useJury" placeholder="true if not empty" />
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
