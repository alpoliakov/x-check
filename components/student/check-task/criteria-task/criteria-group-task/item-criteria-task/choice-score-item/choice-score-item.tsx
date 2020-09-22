import React, { useState } from 'react';
import { InputNumber, Radio, Button, Tooltip, Tag } from 'antd';
import { TypeTask } from '../../../../../../../interfaces/ITask';
import { Role } from '../../../../../../../interfaces/IUser';
import { RadioChangeEvent } from 'antd/lib/radio';
import { CheckState, CheсkingPointState } from '../../../../../../../interfaces/IWorkDone';
import styles from './choice-score-item.module.css';

type PropsChoiceScore = {
  maxScore: number;
  score: number;
  role: Role;
  typeTask: TypeTask;
  stateCheck: CheckState;
  stateCheckPoint: CheсkingPointState;
  onChangeScore: (score: number) => void;
  onClickAgree: () => void;
  onClickDisAgree: () => void;
};

export default function ChoiceScore({
  maxScore,
  score,
  role,
  typeTask,
  stateCheck,
  stateCheckPoint,
  onChangeScore,
  onClickAgree,
  onClickDisAgree,
}: PropsChoiceScore): JSX.Element {
  const minScore = 0;
  const nameOptions = ['не выполнено', 'выполнено частично', 'выполнено полностью'];
  const [choiceState, setChoiceState] = useState<boolean>(true);

  const onChangeInput = (value: string | number | undefined) => {
    if (typeof value === 'number') {
      onChangeScore(value);
    }
  };

  const onChangeRadio = (event: RadioChangeEvent) => {
    if (event.target.value !== undefined) {
      onChangeScore(event.target.value);
      setChoiceState(true);
    } else {
      setChoiceState(false);
    }
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  let scoreJSX: JSX.Element;
  if (typeTask === TypeTask.SubmitTask && stateCheck !== CheckState.SelfTest) {
    let colorTag: string;
    let textToolTip: string;
    switch (stateCheckPoint) {
      case CheсkingPointState.NotVerified:
        colorTag = 'orange';
        textToolTip = 'Read comment';
        break;
      case CheсkingPointState.Verified:
        colorTag = 'green';
        textToolTip = 'Verified';
        break;
      case CheсkingPointState.Negotiations:
        colorTag = 'processing';
        textToolTip = 'Negotiations';
        break;
      case CheсkingPointState.Dispute:
        colorTag = 'red';
        textToolTip = 'Dispute';
        break;
      case CheсkingPointState.DisputeClosed:
        colorTag = 'gold';
        textToolTip = 'Dispute сlosed';
        break;
    }

    const buttonsAgree =
      stateCheckPoint === CheсkingPointState.Dispute ||
      stateCheckPoint === CheсkingPointState.Verified ||
      stateCheckPoint === CheсkingPointState.DisputeClosed ? (
        <></>
      ) : (
        <div className={styles.scoreButton}>
          <Button htmlType="submit" onClick={onClickAgree} type="primary">
            Agree
          </Button>
          <Button htmlType="submit" danger onClick={onClickDisAgree} type="primary">
            Dispute
          </Button>
        </div>
      );

    scoreJSX = (
      <>
        <div className={styles.score}>
          <Tooltip title={textToolTip}>
            <Tag color={colorTag}>
              <span>Score: {score}</span>
            </Tag>
          </Tooltip>
        </div>
        {buttonsAgree}
      </>
    );
  } else if (
    (typeTask === TypeTask.SubmitTask && stateCheck === CheckState.SelfTest) ||
    (typeTask === TypeTask.ReviewTask &&
      (stateCheck === CheckState.AuditorDraft ||
        stateCheck === CheckState.NotVerified ||
        stateCheck === CheckState.Negotiations))
  ) {
    scoreJSX = (
      <Radio.Group name="radiogroup" defaultValue={score} onChange={onChangeRadio}>
        <Radio style={radioStyle} value={minScore}>
          {nameOptions[0]}
        </Radio>
        <Radio style={radioStyle} value={maxScore / 2}>
          {nameOptions[1]}
        </Radio>
        <Radio style={radioStyle} value={maxScore}>
          {nameOptions[2]}
        </Radio>
        <Radio style={radioStyle}>
          <InputNumber
            min={minScore}
            max={maxScore}
            onChange={onChangeInput}
            disabled={choiceState}
            value={score}
          />
        </Radio>
      </Radio.Group>
    );
  } else {
    scoreJSX = <span>Error(unforeseen situation)</span>;
  }
  return <div className={styles.scoreContainer}>{scoreJSX}</div>;
}
