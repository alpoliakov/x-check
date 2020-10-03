import { useState } from 'react';
import firebase from '../firebase';

const useRequest = (): any => {
  const [data, setData] = useState();
  const databaseQuery = (node: string) => {
    firebase
      .database()
      .ref()
      .child(node)
      .on('value', (screenshot) => {
        const item = screenshot.val();
        setData(item);
      });
  };
  return [data, databaseQuery];
};

export default useRequest;
