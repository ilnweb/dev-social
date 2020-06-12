import React, { useEffect, useState } from 'react';
import { useMst } from "./mobX/root-store";
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import CommentPage from './pages/comments-page/comments-page.cpm';
import { Route, Switch, Link } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in.cmp';
import SignUp from './pages/sign-up/sign-up.cmp';
import { observer } from 'mobx-react-lite';
import Button from 'antd/es/button';
import { EditOutlined } from '@ant-design/icons';
import 'mobx-react-lite/batchingForReactDom';
import UserProfile from './pages/user-profile/user-profile.cmp';
import WritePost from './pages/write-post/write-post.cmp';
import { RootInstance } from './mobX/root-store';
import { autoSignInUser } from './database/connect';

const App: React.FC = observer(() => {
  const { addAllPosts, setCurrentUser, currentUser }: RootInstance = useMst();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
		const expiryDate = localStorage.getItem('expiryDate');
		if (!token || !expiryDate) {
			return;
		}
		if (new Date(expiryDate) <= new Date()) {
			// this.logoutHandler();
			return;
		}
		const userId = localStorage.getItem('userId');
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    
    // this.setState({ isAuth: true, token: token, userId: userId });
    (async function signInUser() {
      const user = await autoSignInUser(token)
      setCurrentUser(user)
    })();
		
    return () => {

    }
  }, [setCurrentUser]);

  useEffect(() => {
    // getPosts(addAllPosts);
  }, [addAllPosts]);

  const logInHandler = (email:string, password:string) => {
    console.log(email);
  }

  const logoutHandler = () => {
		// this.setState({ isAuth: false, token: null });
		localStorage.removeItem('token');
		localStorage.removeItem('expiryDate');
		localStorage.removeItem('userId');
	};

  const setAutoLogout = (milliseconds:number) => {
		setTimeout(() => {
			logoutHandler();
		}, milliseconds);
	};

  return (

    <div className="App">
      <Header user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={SignIn} logIn={logInHandler} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/write-post" component={() => <WritePost user={currentUser} />} />
        <Route path="/user-profile" component={() => <UserProfile user={currentUser} />} />
        <Route path="/:comments" component={CommentPage} />
      </Switch>
      <Link to='/write-post'>
        <Button className='button-post' type="primary" shape="circle" icon={<EditOutlined style={{ fontSize: '2rem' }} />} size={"large"} />
      </Link>
    </div>
  );
});

export default App;
