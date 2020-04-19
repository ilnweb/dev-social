import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.config';

let user:{};

const App = () => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef =  await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          user = {
            id: snapShot.id,
            photoURL: userAuth.photoURL,
            ...snapShot.data()
          };
        });
      } else {

      }
    });
  });

  return (
    <div className="App">
      <Header name="Tosheto" />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
