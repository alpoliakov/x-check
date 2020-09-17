import React from 'react';
import { Button, Row, Col, Checkbox } from 'antd';

type PropsControlsTask = {
  isAnonim: boolean;
  onChangeIsAnonim: () => void;
  onSave: () => void;
  onSubmit: () => void;
};

function ControlsTask({
  isAnonim,
  onChangeIsAnonim,
  onSave,
  onSubmit,
}: PropsControlsTask): JSX.Element {
  return (
    <>
      <Row>
        <Col flex={2}>
          <Checkbox checked={isAnonim} onChange={onChangeIsAnonim}>
            Make my name visible in feedback
          </Checkbox>
        </Col>
        <Col flex={2}>
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        </Col>
        <Col flex={2}>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ControlsTask;
