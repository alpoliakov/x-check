import React from 'react';
import { Card, Typography } from 'antd';
import styles from './max-score-item.module.css';

type PropsMaxScoreItem = {
  nameInfoCard: string;
  scoreInfoCard: number;
};

export default function MaxScoreItem({
  nameInfoCard,
  scoreInfoCard,
}: PropsMaxScoreItem): JSX.Element {
  const { Text } = Typography;
  return (
    <div className={styles.cardMaxscore}>
      <Card>
        <p>{nameInfoCard}</p>
        <Text className={styles.maxScore}>{scoreInfoCard}</Text>
      </Card>
    </div>
  );
}
