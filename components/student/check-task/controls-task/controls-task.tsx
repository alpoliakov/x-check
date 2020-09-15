import React from 'react';
import { Button } from 'antd';

type PropsControlsTask = {};

function ControlsTask({}: PropsControlsTask): JSX.Element {
  return (
    <>
      <Button type="primary">Save</Button>
      <Button type="primary">Send</Button>
    </>
  );
}

export default ControlsTask;
