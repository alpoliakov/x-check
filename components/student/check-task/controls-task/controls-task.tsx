import React from 'react';
import { Button, Row, Col, Checkbox } from 'antd';
import { TypeTask } from '../../../../interfaces/ITask';
import { CheckState } from '../../../../interfaces/IWorkDone';

type PropsControlsTask = {
  isAnonim: boolean;
  typeTask: TypeTask;
  stateCheck: CheckState;
  onChangeIsAnonim: () => void;
  onSave: () => void;
  onSubmit: () => void;
};

function ControlsTask({
  isAnonim,
  typeTask,
  stateCheck,
  onChangeIsAnonim,
  onSave,
  onSubmit,
}: PropsControlsTask): JSX.Element {
  const [showCheckBox, nameButtonOne, nameButtonTwo] =
    typeTask !== TypeTask.SubmitTask && stateCheck !== CheckState.SelfTest
      ? [
          <>
            <Checkbox checked={isAnonim} onChange={onChangeIsAnonim}>
              Make my name visible in feedback
            </Checkbox>
          </>,
          'Save',
          'Submit',
        ]
      : [<></>, 'Agree All', 'Submit'];
  return (
    <>
      <Row>
        <Col flex={14}>{showCheckBox}</Col>
        <Col flex={2}>
          <Button size="large" type="primary" onClick={onSave}>
            {nameButtonOne}
          </Button>
        </Col>
        <Col flex={2}>
          <Button size="large" type="primary" onClick={onSubmit}>
            {nameButtonTwo}
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ControlsTask;
