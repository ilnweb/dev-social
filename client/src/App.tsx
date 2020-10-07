import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoSignInStart, signOutUser } from './redux/user/user-actions';
import { setAllPosts } from './redux/posts/posts-actions';
import { selectCurrentUser } from './redux/user/user-selectors';
import { selectUserError } from './redux/user/user-selectors';
import { useLocation } from "react-router-dom";
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import Footer from './components/footer/footer.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import ReadingList from './pages/reading-list/reading-list.cmp';
import UserPosts from './pages/user-posts/user-posts.cmp';
import { Route, Switch,Redirect } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in.cmp';
import SignUp from './pages/sign-up/sign-up.cmp';
import SinglePost from './pages/single-post/single-post.cmp';
import ProtectedRouts from './components/protected-routs/protected-routs.cmp';
import { getAllPosts } from './database/connect';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userError = useSelector(selectUserError);

  // const [state, setState] = useState({ isAuth: false });
  // let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    
    // this.setState({ state: true, token: token, userId: userId });
    (async function signInUser() {
      // const user = await autoSignInUser(token)
      dispatch(autoSignInStart());
      console.log('Loged');

    })();
    return () => {

    }
  }, [dispatch]);

  useEffect(() => {
    (async function posts() {
      const posts = await getAllPosts();
      dispatch(setAllPosts(posts));
    })();

  }, [dispatch]);

  const signOutHandler = () => {
    if (currentUser) {
      dispatch(signOutUser());
      localStorage.removeItem('token');
    }
  };


  return (
    <div className="App">
      <Header signOutHandler={signOutHandler} user={currentUser} />
      <Switch>
        <Route strict exact path="/" component={HomePage} />
        <Route path="/my-posts" component={UserPosts} />
        <Route path="/reading-list" component={ReadingList} />
        <Route path="/post/:postId" component={SinglePost} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        {userError === 'no-user' ? <Redirect to='/' /> : <ProtectedRouts />}
      </Switch>
      {location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && <Footer />}
    </div>
  );
};

export default App;
