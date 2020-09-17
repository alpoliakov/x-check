import React, { useState } from 'react';
import { InputNumber, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

type PropsChoiceScore = {
  maxScore: number;
  score: number;
  onChangeScore: (score: number) => void;
};

export default function ChoiceScore({
  maxScore,
  score,
  onChangeScore,
}: PropsChoiceScore): JSX.Element {
  const minScore = 0;
  const nameOptions = ['не выполнено', 'выполнено частично', 'выполнено полностью'];
  const [choiceState, setChoiceState] = useState<boolean>(true);

  const onChangeInput = (value: string | number | undefined) => {
    console.log('ss');
    if (typeof value === 'number') {
      onChangeScore(value);
    }
  };

  const onChangeRadio = (event: RadioChangeEvent) => {
    console.log(event.target.value);
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

  return (
    <>
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
    </>
  );
}
