import { Divider, Row, Col, Typography } from 'antd';
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
  const { Link, Title } = Typography;
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Row>
          <Col flex={3}>
            <Title level={2}>{title}</Title>
          </Col>
          <Col flex={2}>
            <Title level={3}>
              Total points: {score}/{maxScore}
            </Title>
          </Col>
        </Row>
      </div>
      <Divider />
      <div className={styles.url}>
        <Row>
          <Col flex={2}>
            <Link href={sourceGithubRepoUrl} target="_blank">
              PR gitHub
            </Link>
          </Col>
          <Col flex={2}>
            <Link href={deployUrl} target="_blank">
              Demo
            </Link>
          </Col>
        </Row>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}

export default HeaderTask;
