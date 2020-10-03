import React from 'react';

interface PropsWork {
  task: any;
}

const Work: React.FC<PropsWork> = ({ task }) => {
  return <h2>{task}</h2>;
};

export default Work;
