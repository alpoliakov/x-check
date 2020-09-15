import React from 'react';
import { Input } from 'antd';
import styles from './info-item.module.css';

type PropsInfoItem = {
  descriptionItem: string;
  commentsItem: string;
};

export default function InfoItem({ descriptionItem, commentsItem }: PropsInfoItem): JSX.Element {
  const { TextArea } = Input;
  console.log(commentsItem);
  return (
    <>
      <span> {descriptionItem}</span>
      <TextArea rows={2} />
    </>
  );
}
