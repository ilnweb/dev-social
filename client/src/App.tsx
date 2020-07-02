import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';
import { setAllPosts } from './redux/posts/posts-actions';
import { selectCurrentUser } from './redux/user/user-selectors';
import { selectAllPosts } from './redux/posts/post-selectors';
import { useLocation } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.scss';
import 'react-quill/dist/quill.core.css'
import 'highlight.js/styles/monokai.css'
import Header from './components/header/header.cmp';
import Footer from './components/footer/footer.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import { Route, Switch } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in.cmp';
import SignUp from './pages/sign-up/sign-up.cmp';
import SinglePost from './pages/single-post/single-post.cmp';
import ProtectedRouts from './components/protected-routs/protected-routs.cmp';
import { autoSignInUser, getAllPosts } from './database/connect';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [state, setState] = useState({ isAuth: false });
  // let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    setState({ isAuth: true });
    // this.setState({ state: true, token: token, userId: userId });
    (async function signInUser() {
      const user = await autoSignInUser(token)
      dispatch(setCurrentUser(user));
      console.log('Loged');

    })();

    return () => {

    }
  }, [dispatch]);

  useEffect(() => {
    (async function posts() {
      const posts = await getAllPosts();
      dispatch(setAllPosts(posts));
      console.log('posts');

    })();

  }, []);

  const signOutHandler = () => {
    // if (currentUser) {
    //   removeCurrentUser(currentUser)
    //   localStorage.removeItem('token');

    // }
  };


  return (
    <div className="App">
      <Header signOutHandler={signOutHandler} user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/post/:postId" component={SinglePost} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        {state.isAuth ? <ProtectedRouts /> : ''}
      </Switch>
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && <Footer />}
    </div>
  );
};

export default App;
