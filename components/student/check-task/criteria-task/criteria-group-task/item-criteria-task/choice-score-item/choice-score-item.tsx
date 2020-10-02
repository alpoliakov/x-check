import React, { useState } from 'react';
import { InputNumber, Radio, Button, Tooltip, Tag } from 'antd';
import { TypeTask } from '../../../../../../../interfaces/ITask';
import { RadioChangeEvent } from 'antd/lib/radio';
import { CheckState, CheсkingPointState } from '../../../../../../../interfaces/IWorkDone';
import styles from './choice-score-item.module.css';

type PropsChoiceScore = {
  maxScore: number;
  score: number;
  typeTask: TypeTask;
  stateCheck: CheckState;
  stateCheckPoint: CheсkingPointState;
  onChangeScore: (score: number) => void;
  onClickAgree: () => void;
  onClickDisAgree: () => void;
};
type TstateScore = {
  stateFlag: boolean;
  stateScore: number;
};

export default function ChoiceScore({
  maxScore,
  score,
  typeTask,
  stateCheck,
  stateCheckPoint,
  onChangeScore,
  onClickAgree,
  onClickDisAgree,
}: PropsChoiceScore): JSX.Element {
  const minScore = 0;
  const nameOptions = ['не выполнено', 'выполнено частично', 'выполнено полностью'];
  const [choiceState, setChoiceState] = useState<TstateScore>({
    stateFlag: score !== minScore && score !== maxScore / 2 && score !== maxScore,
    stateScore:
      score !== minScore && score !== maxScore / 2 && score !== maxScore ? score : minScore - 1,
  });

  const onChangeInput = (value: string | number | undefined) => {
    if (typeof value === 'number') {
      onChangeScore(value);
    }
  };

  const onChangeRadio = (event: RadioChangeEvent) => {
    if (event.target.value !== choiceState.stateScore) {
      onChangeScore(event.target.value);
      setChoiceState((prev) => {
        return { ...prev, stateFlag: false };
      });
    } else {
      setChoiceState((prev) => {
        return { ...prev, stateFlag: true };
      });
    }
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  let scoreJSX: JSX.Element;
  let styleContainer = '';
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
          <Tooltip title="Если согласен с замечаниями">
            <Button htmlType="submit" onClick={onClickAgree} type="primary">
              Agree
            </Button>
          </Tooltip>
          <Tooltip title="Если не договорились (вызвать при крайней необходиомсти)">
            <Button htmlType="submit" danger onClick={onClickDisAgree} type="primary">
              Dispute
            </Button>
          </Tooltip>
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
    styleContainer = styles.scoreContainer;
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
        <Radio style={radioStyle} value={choiceState.stateScore}>
          Other
          {choiceState.stateFlag ? (
            <InputNumber
              min={minScore}
              max={maxScore}
              onChange={onChangeInput}
              value={score}
              style={{ width: 100, marginLeft: 10 }}
            />
          ) : null}
        </Radio>
      </Radio.Group>
    );
  } else {
    scoreJSX = (
      <Radio.Group name="radiogroup" defaultValue={score} onChange={onChangeRadio} disabled>
        <Radio style={radioStyle} value={minScore}>
          {nameOptions[0]}
        </Radio>
        <Radio style={radioStyle} value={maxScore / 2}>
          {nameOptions[1]}
        </Radio>
        <Radio style={radioStyle} value={maxScore}>
          {nameOptions[2]}
        </Radio>
        <Radio style={radioStyle} value={choiceState.stateScore}>
          Other
          {choiceState.stateFlag ? (
            <InputNumber
              min={minScore}
              max={maxScore}
              onChange={onChangeInput}
              value={score}
              style={{ width: 100, marginLeft: 10 }}
              disabled
            />
          ) : null}
        </Radio>
      </Radio.Group>
    );
  }
  return <div className={styleContainer}>{scoreJSX}</div>;
}
