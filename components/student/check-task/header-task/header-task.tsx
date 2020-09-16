import { Divider, Row, Col } from 'antd';
import React from 'react';
import styles from './header-task.module.css';

type PropsHeaderTask = {
  title: string;
  description: string;
  score: number;
  checkPoint: number;
};

function HeaderTask({ title, description, checkPoint, score }: PropsHeaderTask): JSX.Element {
  return (
    <>
      <Row>
        <Col flex={2}>
          <h2>{title}</h2>
        </Col>
        <Col flex={3}>
          <span>
            Проверено {checkPoint} из 20 Total points: {score}
          </span>
        </Col>
      </Row>
      <Divider />
      <p>{description}</p>
    </>
  );
}

export default HeaderTask;
