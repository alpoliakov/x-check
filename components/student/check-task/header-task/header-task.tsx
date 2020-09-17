import { Divider, Row, Col } from 'antd';
import React from 'react';
import styles from './header-task.module.css';

type PropsHeaderTask = {
  title: string;
  description: string;
  score: number;
  maxScore: number;
  sourceGithubRepoUrl: string;
  deployUrl: string;
};

function HeaderTask({
  title,
  description,
  score,
  maxScore,
  deployUrl,
  sourceGithubRepoUrl,
}: PropsHeaderTask): JSX.Element {
  return (
    <div className={styles.header}>
      <Row>
        <Col flex={2}>
          <h2>{title}</h2>
        </Col>
        <Col flex={3}>
          <span>
            Total points: {score}/{maxScore}
          </span>
        </Col>
      </Row>
      <Divider />
      <div className={styles.url}>
        PR gitHub: {sourceGithubRepoUrl} Demo: {deployUrl}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

export default HeaderTask;
