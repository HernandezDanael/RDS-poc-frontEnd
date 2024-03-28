import './App.css';
import { MyApplication } from './components/MyApplication';
import { PageLayout } from './components/PageLayout';
import React, { useEffect, useState } from 'react';
import { dataUserRequest, loginRequest } from './assets/config/authConfig';

function ProfileContent() {
  const [username, setUsername] = useState('danael');
  const [password, setPassword] = useState('testmdp');

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('/login', { username, password });
  //     // Traitez la réponse du backend (par exemple, stockez le jeton JWT dans l'état si l'authentification réussit)
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     // Gérez les erreurs d'authentification ici
  //   }
  // };
  return (
    <>
      <MyApplication
     ></MyApplication>
    </>
  );
}
const App = () => {
  return (
    <>
        <PageLayout>
            <ProfileContent />
        </PageLayout>
    </>
  );
};

export default App;
