import React from 'react';
import { Row, Col, Card } from 'antd';
import { ICriteriaPoint } from '../../../../../../interfaces/ITask';
import { ICheсkingPoint } from '../../../../../../interfaces/IWorkDone';
import SwitchScore from './switch-score-item';
import MaxScoreItem from './max-score-item';
import InfoItem from './info-item';
import styles from './item-criteria-task.module.css';

type PropsItemCriteriaTask = {
  criteriaPoint: ICriteriaPoint;
  cheсkingPoint: ICheсkingPoint;
  onChangeScore: (cheсkingPointID: string, score: number) => void;
  onChangeComment: (cheсkingPointID: string, score: number) => void;
};

function ItemCriteriaTask({
  criteriaPoint,
  cheсkingPoint,
  onChangeScore,
  onChangeComment,
}: PropsItemCriteriaTask): JSX.Element {
  const nameInfoCard = 'Балл за выполнение';
  const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
  };
  const onChangeScoreSwitch = (score: number) => {
    onChangeScore(cheсkingPoint.cheсkingPointID, score);
  };
  return (
    <Card.Grid className={styles.mb10} style={gridStyle}>
      <Row gutter={8} justify="space-between">
        <Col span={3}>
          <MaxScoreItem
            nameInfoCard={nameInfoCard}
            scoreInfoCard={criteriaPoint.criteriaPointScore}
          />
        </Col>
        <Col span={15}>
          <InfoItem
            descriptionItem={criteriaPoint.criteriaPointName}
            commentsItem={cheсkingPoint.comments}
            onChangeComment={onChangeComment}
          />
        </Col>
        <Col span={6}>
          <SwitchScore
            maxScore={criteriaPoint.criteriaPointScore}
            score={cheсkingPoint.autorScore}
            onChangeScore={onChangeScoreSwitch}
            key={criteriaPoint.criteriaPointID}
          />
        </Col>
      </Row>
    </Card.Grid>
  );
}

export default ItemCriteriaTask;
