import React, { useState } from 'react';
import { Button } from 'antd';
import { random } from '../../../db/random';
import { db } from '../../../firebase';

const SubmitRandom = () => {
  const [stopSubmit, setStopSubmit] = useState(true);

  const submitRandomData = (e: any) => {
    e.preventDefault();
    random.forEach((data) => {
      db.collection('user')
        .doc(data._id)
        .set(data)
        .then(() => console.log('A new random data has been added!', 'Success!', data))
        .catch((e) => new Error(`Create random data failed! ${e.message}`));
    });
  };

  return (
    <>
      <div>
        <Button type="primary" htmlType="button" onClick={submitRandomData}>
          Submit random data
        </Button>
      </div>
    </>
  );
};

export default SubmitRandom;
