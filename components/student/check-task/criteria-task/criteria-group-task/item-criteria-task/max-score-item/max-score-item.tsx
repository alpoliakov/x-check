import React from 'react';
import { Card } from 'antd';
import styles from './max-score-item.module.css';

type PropsMaxScoreItem = {
  nameInfoCard: string;
  scoreInfoCard: number;
};

export default function MaxScoreItem({
  nameInfoCard,
  scoreInfoCard,
}: PropsMaxScoreItem): JSX.Element {
  return (
    <>
      <Card className={styles.maxCard}>
        <span className={styles.maxName}>{nameInfoCard}</span>
        <p className={styles.maxScore}>{scoreInfoCard}</p>
      </Card>
    </>
  );
}
