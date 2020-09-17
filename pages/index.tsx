import React, { useState } from 'react';
import AuthPage from './authorization';
import MainPages from './main';

const IndexPage: React.FC = () => {
  const [authorization, setAuthorization] = useState(false);

  const changeAuthorization = () => {
    setAuthorization(!authorization);
  };

  return (
    <>
      {authorization ? (
        <MainPages changeAuthorization={changeAuthorization} />
      ) : (
        <AuthPage changeAuthorization={changeAuthorization} />
      )}
    </>
  );
};

export default IndexPage;
