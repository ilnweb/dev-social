import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.config';
import SignIn from './sign-in/sign-in.cmp';


const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [post, setpost] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            photoURL: userAuth.photoURL,
            ...snapShot.data()
          });
        });
      } else {

      }
    });
  });

  return (
    <div className="App">
      <Header name={currentUser} />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/login" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
