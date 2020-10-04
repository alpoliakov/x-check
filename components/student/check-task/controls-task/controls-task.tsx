import React from 'react';
import { Button, Row, Col, Checkbox } from 'antd';
import { TypeTask } from '../../../../interfaces/ITask';
import { CheckState } from '../../../../interfaces/IWorkDone';
import { Role } from '../../../../interfaces/IUser';

type PropsControlsTask = {
  isAnonim: boolean;
  typeTask: TypeTask;
  stateCheck: CheckState;
  role: Role;
  onChangeIsAnonim: () => void;
  onAgree: () => void;
  onSave: () => void;
  onSubmit: () => void;
};

function ControlsTask({
  isAnonim,
  typeTask,
  stateCheck,
  role,
  onChangeIsAnonim,
  onAgree,
  onSave,
  onSubmit,
}: PropsControlsTask): JSX.Element {
  const isSelfTest =
    stateCheck !== CheckState.SelfTest && role !== Role.mentor ? (
      <Checkbox checked={isAnonim} onChange={onChangeIsAnonim}>
        Make my name visible in feedback
      </Checkbox>
    ) : (
      <></>
    );
  const [buttonFunction, showCheckBox, nameButtonOne, nameButtonTwo] =
    typeTask === TypeTask.SubmitTask && stateCheck !== CheckState.SelfTest
      ? [onAgree, <></>, 'Agree All', 'Submit']
      : [onSave, <>{isSelfTest}</>, 'Save', 'Submit'];
  let controlsJSX: JSX.Element;
  if (
    stateCheck === CheckState.SelfTest ||
    stateCheck === CheckState.AuditorDraft ||
    stateCheck === CheckState.NotVerified ||
    stateCheck === CheckState.Negotiations
  ) {
    controlsJSX = (
      <Row>
        <Col flex={14}>{showCheckBox}</Col>
        <Col flex={2}>
          <Button size="large" type="primary" onClick={buttonFunction}>
            {nameButtonOne}
          </Button>
        </Col>
        <Col flex={2}>
          <Button size="large" type="primary" onClick={onSubmit}>
            {nameButtonTwo}
          </Button>
        </Col>
      </Row>
    );
  } else {
    controlsJSX = <></>;
  }
  return <>{controlsJSX}</>;
}

export default ControlsTask;
