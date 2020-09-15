import React from 'react';
import styles from './header-task.module.css';

type PropsHeaderTask = {
  title: string;
  description: string;
};

function HeaderTask({ title, description }: PropsHeaderTask): JSX.Element {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
    </>
  );
}

export default HeaderTask;
