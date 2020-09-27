import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  dataReadme?: any;
}

const ReadmePage: React.FC<Props> = ({ dataReadme }) => {
  return (
    <>
      <div>
        <h1>Readme Page</h1>
        <ReactMarkdown source={dataReadme} />
      </div>
    </>
  );
};

export default ReadmePage;
