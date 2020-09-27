import React from 'react';
import { Collapse, Row, Col, Typography, Tag, Tooltip } from 'antd';
import { ICriteriaGroup, ICriteriaPoint, TypeTask } from '../../../../../interfaces/ITask';
import { Role } from '../../../../../interfaces/IUser';
import {
  CheckState,
  CheсkingPointState,
  ICheсkingPoint,
  IComment,
} from '../../../../../interfaces/IWorkDone';
import ItemCriteriaTask from './item-criteria-task';
import styles from './criteria-group-task.module.css';

type PropsCriteriaGroup = {
  criteriaGroup: ICriteriaGroup;
  cheсkingPoints: ICheсkingPoint[];
  role: Role;
  typeTask: TypeTask;
  stateCheck: CheckState;
  onChangeScore: (cheсkingPointID: string, score: number) => void;
  onChangeComment: (cheсkingPointID: string, comment: IComment) => void;
  onAgreePoint: (cheсkingPointID: string) => void;
  onDisagreePoint: (cheсkingPointID: string) => void;
};

function CriteriaGroupTask({
  criteriaGroup,
  cheсkingPoints,
  role,
  typeTask,
  stateCheck,
  onChangeScore,
  onChangeComment,
  onAgreePoint,
  onDisagreePoint,
}: PropsCriteriaGroup): JSX.Element {
  const { Panel } = Collapse;
  const { Title } = Typography;
  const scoreGroup =
    role === Role.student && stateCheck === CheckState.SelfTest
      ? cheсkingPoints.reduce((sum: number, { autorScore }: ICheсkingPoint) => sum + autorScore, 0)
      : cheсkingPoints.reduce(
          (sum: number, { auditorScore }: ICheсkingPoint) => sum + auditorScore,
          0
        );

  const maxGroupScore = criteriaGroup.criteriaPoints.reduce(
    (sum: number, { criteriaPointScore }: ICriteriaPoint) => sum + criteriaPointScore,
    0
  );

  let colorTag: string;
  let textToolTip: string;
  if (
    (role === Role.student &&
      (stateCheck === CheckState.SelfTest ||
        ((stateCheck === CheckState.AuditorDraft || stateCheck === CheckState.NotVerified) &&
          typeTask === TypeTask.ReviewTask))) ||
    (role === Role.mentor &&
      (stateCheck === CheckState.AuditorDraft || stateCheck === CheckState.NotVerified) &&
      typeTask === TypeTask.ReviewTask)
  ) {
    [colorTag, textToolTip] =
      scoreGroup < maxGroupScore
        ? ['orange', 'выполнено не полностью']
        : ['green', 'выполнено полностью'];
  } else {
    switch (
      cheсkingPoints.reduce((sum: CheсkingPointState, cheсkingPoint: ICheсkingPoint) => {
        if (cheсkingPoint.state === CheсkingPointState.NotVerified) {
          sum = cheсkingPoint.state;
        } else if (
          cheсkingPoint.state !== CheсkingPointState.Verified &&
          sum !== CheсkingPointState.NotVerified
        ) {
          sum = cheсkingPoint.state;
        }
        return sum;
      }, cheсkingPoints[0].state)
    ) {
      case CheсkingPointState.NotVerified:
        colorTag = 'orange';
        textToolTip = 'The group is not verified';
        break;
      case CheсkingPointState.Verified:
        colorTag = 'green';
        textToolTip = 'The group is verified';
        break;
      case CheсkingPointState.Negotiations:
        colorTag = 'processing';
        textToolTip = 'The group has negotiations';
        break;
      case CheсkingPointState.Dispute:
        colorTag = 'red';
        textToolTip = 'The group has dispute';
        break;
      case CheсkingPointState.DisputeClosed:
        colorTag = 'gold';
        textToolTip = 'The group has сlosed dispute';
        break;
    }
  }
  const nameGroup = (
    <Row justify="space-between">
      <Col span={21}>
        <Title level={5}>{criteriaGroup.groupName}</Title>
      </Col>
      <Col span={3}>
        <Tooltip title={textToolTip}>
          <Tag color={colorTag}>
            {scoreGroup}/{maxGroupScore}
          </Tag>
        </Tooltip>
      </Col>
    </Row>
  );
  return (
    <div className={styles.group}>
      <Collapse>
        <Panel header={nameGroup} key={criteriaGroup.groupID}>
          {criteriaGroup.criteriaPoints.map((item, index) => {
            return (
              <ItemCriteriaTask
                criteriaPoint={item}
                cheсkingPoint={cheсkingPoints[index]}
                role={role}
                typeTask={typeTask}
                stateCheck={stateCheck}
                onChangeScore={onChangeScore}
                onChangeComment={onChangeComment}
                onAgreePoint={onAgreePoint}
                onDisagreePoint={onDisagreePoint}
                key={index}
              />
            );
          })}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CriteriaGroupTask;
