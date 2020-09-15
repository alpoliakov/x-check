import React, { useState } from 'react';
import { InputNumber, Radio, Switch } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

type PropsSwitchScore = {
  maxScore: number;
  score: number;
  onChangeScore: (score: number) => void;
};

export default function SwitchScore({
  maxScore,
  score,
  onChangeScore,
}: PropsSwitchScore): JSX.Element {
  const minScore = 0;
  const nameOptions = ['не выполнено', 'выполнено частично', 'выполнено полностью'];

  const [switchState, setSwitchState] = useState<boolean>(true);
  const onChangeInput = (value: string | number | undefined) => {
    if (typeof value === 'number') {
      onChangeScore(value);
    }
  };

  const onChangeRadio = (event: RadioChangeEvent) => {
    onChangeScore(event.target.value);
  };

  const onChangeSwitch = () => {
    setSwitchState((prev) => {
      return !prev;
    });
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  let switchCase: JSX.Element;
  if (switchState) {
    switchCase = (
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
      </Radio.Group>
    );
  } else {
    switchCase = (
      <InputNumber min={minScore} max={maxScore} defaultValue={score} onChange={onChangeInput} />
    );
  }

  return (
    <>
      <Switch
        checkedChildren="своя оценка"
        unCheckedChildren="стандарт"
        defaultChecked
        onChange={onChangeSwitch}
      />
      {switchCase}
    </>
  );
}
