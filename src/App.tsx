import React, { useEffect, useContext } from 'react';
import { useMst } from "./mobX/root-store";
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import CommentPage from './pages/comments-page/comments-page.cpm';
import { Route, Switch, Link } from 'react-router-dom';
import { auth, createUserProfileDocument, getPosts } from './firebase/firebase.config';
import SignIn from './sign-in/sign-in.cmp';
import { observer } from 'mobx-react-lite';
import { UserContext } from './mobX/user.context';
// import { PostContext } from './mobX/post-feed.context';
import Button from 'antd/es/button';
import { PlusOutlined } from '@ant-design/icons';
import 'mobx-react-lite/batchingForReactDom';
import UserProfile from './pages/user-profile/user-profile.cmp';
import WritePost from './pages/write-post/write-post.cmp';
import { RootInstance } from './mobX/root-store';


const App: React.FC = observer(() => {
  const userContext = useContext(UserContext);
  const { posts }: RootInstance = useMst();
  // const postContext = useContext(PostContext);
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          userContext.user = {
            id: snapShot.id,
            photoURL: userAuth.photoURL,
            ...snapShot.data()
          };
        });
      }
    });
    return () => {
      unsubscribeFromAuth();
    }
  }, []);

  useEffect(() => {
    getPosts(posts.addAllPosts);

  }, [posts.addAllPosts]);
  
  return (
    
    <div className="App">
      <Header user={userContext.user} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/:comments" component={CommentPage} />
        <Route path="/write-post" component={() => <WritePost user={userContext.user} />} />
        <Route path="/user-profile" component={() => <UserProfile user={userContext.user} />} />
      </Switch>
      <Link to='/write-post'>
        <Button className='button-post' type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
      </Link>
    </div>
  );
});

export default App;
