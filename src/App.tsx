import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import { Route, Switch, Link } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.config';
import SignIn from './sign-in/sign-in.cmp';



const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            photoURL: userAuth.photoURL,
            ...snapShot.data()
          });
          console.log(currentUser);
        });
      }
    });
    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  return (
    <div className="App">
      <Header user={currentUser}/>
      <Link to='/sign-in'>Signin</Link>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
