import React, { useEffect, useState } from 'react';
import { useMst } from "./mobX/root-store";
import 'antd/dist/antd.css';
import './App.scss';
import 'react-quill/dist/quill.core.css'
import 'highlight.js/styles/monokai.css'
import Header from './components/header/header.cmp';
import Footer from './components/footer/footer.cmp';
import HomePage from './pages/home-page/home-page.cmp';
// import CommentPage from './pages/comments-page/comments-page.cpm';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import SignIn from './pages/sign-in/sign-in.cmp';
import SignUp from './pages/sign-up/sign-up.cmp';
import SinglePost from './pages/single-post/single-post.cmp';
import ProtectedRouts from './components/protected-routs/protected-routs.cmp';
import { observer } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';
import { RootInstance } from './mobX/root-store';
import { autoSignInUser, getAllPosts } from './database/connect';


const App: React.FC = observer(() => {
  const { addAllPosts, setCurrentUser, currentUser, removeCurrentUser }: RootInstance = useMst();
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
      setCurrentUser(user);
      console.log('Loged');

    })();

    return () => {

    }
  }, [setCurrentUser]);

  useEffect(() => {
    (async function posts() {
      const posts = await getAllPosts();
      addAllPosts(posts);
      console.log('posts');

    })();

  }, [addAllPosts]);

  const signOutHandler = () => {
    if (currentUser) {
      removeCurrentUser(currentUser)
      localStorage.removeItem('token');

    }
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
});

export default App;
