import React from 'react';
import { Collapse, Row, Col } from 'antd';
import { ICriteriaGroup, ICriteriaPoint } from '../../../../../interfaces/ITask';
import { ICheсkingPoint, IComment } from '../../../../../interfaces/IWorkDone';
import ItemCriteriaTask from './item-criteria-task';
import styles from './criteria-group-task.module.css';

type PropsCriteriaGroup = {
  criteriaGroup: ICriteriaGroup;
  cheсkingPoints: ICheсkingPoint[];
  onChangeScore: (cheсkingPointID: string, score: number) => void;
  onChangeComment: (cheсkingPointID: string, comment: IComment) => void;
};

function CriteriaGroupTask({
  criteriaGroup,
  cheсkingPoints,
  onChangeScore,
  onChangeComment,
}: PropsCriteriaGroup): JSX.Element {
  const { Panel } = Collapse;
  const scoreGroup = cheсkingPoints.reduce(
    (sum: number, { autorScore }: ICheсkingPoint) => sum + autorScore,
    0
  );
  const maxGroupScore = criteriaGroup.criteriaPoints.reduce(
    (sum: number, { criteriaPointScore }: ICriteriaPoint) => sum + criteriaPointScore,
    0
  );
  const nameGroup = (
    <Row justify="space-between">
      <Col span={21}>{criteriaGroup.groupName}</Col>
      <Col span={3}>
        {scoreGroup}/{maxGroupScore}
      </Col>
    </Row>
  );
  return (
    <>
      <Collapse>
        <Panel header={nameGroup} key={criteriaGroup.groupID}>
          {criteriaGroup.criteriaPoints.map((item, index) => {
            return (
              <ItemCriteriaTask
                criteriaPoint={item}
                cheсkingPoint={cheсkingPoints[index]}
                onChangeScore={onChangeScore}
                onChangeComment={onChangeComment}
                key={index}
              />
            );
          })}
        </Panel>
      </Collapse>
    </>
  );
}

export default CriteriaGroupTask;
