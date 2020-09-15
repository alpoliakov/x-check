import { useState } from 'react';
import firebase from '../firebase';
import { auth } from '../firebase';

const useAuthWithGitHub = () => {
  const [userData, setUserData] = useState({});
  const [isNewUser, setIsNewUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const provider = new firebase.auth.GithubAuthProvider();

  const signUpWithGit = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const userInfo = result.additionalUserInfo;
        // @ts-ignore
        const { name, email, html_url, location, avatar_url, login } = userInfo.profile;
        // @ts-ignore
        const { uid } = user;
        // @ts-ignore
        setIsNewUser(userInfo.isNewUser);

        setUserData({
          email: email,
          html_url: html_url,
          location: location,
          name: name,
          avatar_url: avatar_url,
          nickname: login,
          login: login,
          roles: ['student', 'admin', 'mentor', 'manager'],
          uid: uid,
        });
      })
      .catch((error) => {
        setErrorMessage(`${error.code} ${error.message}`);
        console.log(errorMessage);
        setVisible(true);
      });
  };

  const closeModal = () => {
    setVisible(false);
    setErrorMessage('');
  };

  return {
    userData,
    isNewUser,
    errorMessage,
    visible,
    signUpWithGit,
    closeModal,
  };
};

export default useAuthWithGitHub;
