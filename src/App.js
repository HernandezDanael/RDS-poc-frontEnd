import './App.css';
import { MyApplication } from './components/MyApplication';
// import { PageLayout } from './components/PageLayout';
import React, { useEffect, useState } from 'react';
import { dataUserRequest, loginRequest } from './assets/config/authConfig';

function ProfileContent() {
  // const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [emailUser, setEmailUser] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const request = {
    ...loginRequest,
    // account: accounts[0],
  };

  // useEffect(() => {
  //   if (accessToken != null) {
  //     const requestUser = {
  //       ...dataUserRequest,
  //       account: accounts[0],
  //     };
  //     instance
  //       .acquireTokenSilent(requestUser)
  //       .then((response) => {
  //         setUserToken(response.accessToken);
  //       })
  //       .catch(() => {
  //         instance
  //           .acquireTokenPopup(requestUser)
  //           .then((response) => {
  //             setUserToken(response.accessToken);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [accessToken]);
  return (
    <>
      <MyApplication
        accessToken={accessToken}
        userToken={userToken}
        emailUser={emailUser}
        uniqueId={uniqueId}
        request={request}
        setAccessToken={setAccessToken}
        setEmailUser={setEmailUser}
        setUniqueId={setUniqueId}></MyApplication>
    </>
  );
}
const App = () => {
  return (
    <>
      {/* {' '}
      {modeProduction ? (
        <PageLayout>
          <AuthenticatedTemplate>
            <ProfileContent />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate></UnauthenticatedTemplate>
        </PageLayout>
      ) : ( */}
        <MyApplication></MyApplication>
      {/* )} */}
    </>
  );
};

export default App;
