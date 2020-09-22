import React from 'react';
import { Collapse, Row, Col, Typography, Tag } from 'antd';
import { ICriteriaGroup, ICriteriaPoint, TypeTask } from '../../../../../interfaces/ITask';
import { Role } from '../../../../../interfaces/IUser';
import { CheckState, ICheсkingPoint, IComment } from '../../../../../interfaces/IWorkDone';
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

  const colorTag = scoreGroup < maxGroupScore ? 'orange' : 'green';

  const nameGroup = (
    <Row justify="space-between">
      <Col span={21}>
        <Title level={5}>{criteriaGroup.groupName}</Title>
      </Col>
      <Col span={3}>
        <Tag color={colorTag}>
          {scoreGroup}/{maxGroupScore}
        </Tag>
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
