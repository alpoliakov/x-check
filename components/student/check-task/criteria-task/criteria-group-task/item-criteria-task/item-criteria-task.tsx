import React from 'react';
import { Row, Col, Card } from 'antd';
import { ICriteriaPoint, TypeTask } from '../../../../../../interfaces/ITask';
import { Role } from '../../../../../../interfaces/IUser';
import { CheckState, ICheсkingPoint, IComment } from '../../../../../../interfaces/IWorkDone';
import ChoiceScore from './choice-score-item';
import MaxScoreItem from './max-score-item';
import InfoItem from './info-item';
import styles from './item-criteria-task.module.css';

type PropsItemCriteriaTask = {
  criteriaPoint: ICriteriaPoint;
  cheсkingPoint: ICheсkingPoint;
  role: Role;
  typeTask: TypeTask;
  stateCheck: CheckState;
  onChangeScore: (cheсkingPointID: string, score: number) => void;
  onChangeComment: (cheсkingPointID: string, comment: IComment) => void;
  onAgreePoint: (cheсkingPointID: string) => void;
  onDisagreePoint: (cheсkingPointID: string) => void;
};

function ItemCriteriaTask({
  criteriaPoint,
  cheсkingPoint,
  role,
  typeTask,
  stateCheck,
  onChangeScore,
  onChangeComment,
  onAgreePoint,
  onDisagreePoint,
}: PropsItemCriteriaTask): JSX.Element {
  const nameInfoCard = 'Балл за выполнение';
  const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'center',
  };

  const onClickAgree = () => {
    onAgreePoint(cheсkingPoint.cheсkingPointID);
  };

  const onClickDisAgree = () => {
    onDisagreePoint(cheсkingPoint.cheсkingPointID);
  };
  const onChangeScoreSwitch = (score: number) => {
    onChangeScore(cheсkingPoint.cheсkingPointID, score);
  };

  const onChangeCommentInfo = (comment: IComment) => {
    onChangeComment(cheсkingPoint.cheсkingPointID, comment);
  };
  const score =
    stateCheck === CheckState.SelfTest ? cheсkingPoint.autorScore : cheсkingPoint.auditorScore;
  let itemJSX: JSX.Element;
  if (
    (role === Role.mentor && criteriaPoint.isThisPointForAMentor) ||
    (role === Role.student && !criteriaPoint.isThisPointForAMentor)
  ) {
    itemJSX = (
      <>
        <Card.Grid className={styles.mb10} style={gridStyle}>
          <Row gutter={8}>
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
                role={role}
                typeTask={typeTask}
                stateCheck={stateCheck}
                onChangeComment={onChangeCommentInfo}
              />
            </Col>
            <Col span={6}>
              <ChoiceScore
                maxScore={criteriaPoint.criteriaPointScore}
                score={score}
                typeTask={typeTask}
                stateCheck={stateCheck}
                stateCheckPoint={cheсkingPoint.state}
                onChangeScore={onChangeScoreSwitch}
                onClickAgree={onClickAgree}
                onClickDisAgree={onClickDisAgree}
                key={criteriaPoint.criteriaPointID}
              />
            </Col>
          </Row>
        </Card.Grid>
      </>
    );
  } else {
    <></>;
  }
  return <>{itemJSX}</>;
}

export default ItemCriteriaTask;
