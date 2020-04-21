import React, { useEffect, useContext } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.config';
import SignIn from './sign-in/sign-in.cmp';
import { observer } from 'mobx-react-lite';
import { UserContext } from './mobX/user/user.context';
import 'mobx-react-lite/batchingForReactDom'


const App: React.FC = observer(() => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          userContext.user={
            id: snapShot.id,
            photoURL: userAuth.photoURL,
            ...snapShot.data()
          };
        console.log({
          id: snapShot.id,
          photoURL: userAuth.photoURL,
          ...snapShot.data()
        });
        });
      }
    });
    return () => {
      unsubscribeFromAuth();
    }
  },[]);

  return (
    <div className="App">
      <Header user={userContext.user} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={SignIn} />
      </Switch>
    </div>
  );
});

export default App;
