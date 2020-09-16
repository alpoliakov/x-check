import React from 'react';
import { Button, Row, Col } from 'antd';

type PropsControlsTask = {
  onSave: () => void;
  onSubmit: () => void;
};

function ControlsTask({ onSave, onSubmit }: PropsControlsTask): JSX.Element {
  return (
    <>
      <Row>
        <Col flex={2}>
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        </Col>
        <Col flex={3}>
          <Button type="primary" onClick={onSubmit}>
            Send
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default ControlsTask;
