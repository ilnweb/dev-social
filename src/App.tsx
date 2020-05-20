import React, { useEffect } from 'react';
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
import Button from 'antd/es/button';
import { PlusOutlined } from '@ant-design/icons';
import 'mobx-react-lite/batchingForReactDom';
import UserProfile from './pages/user-profile/user-profile.cmp';
import WritePost from './pages/write-post/write-post.cmp';
import { RootInstance } from './mobX/root-store';


const App: React.FC = observer(() => {
  const { addAllPosts, setCurrentUser,currentUser }: RootInstance = useMst();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          if (snapShot.data()) {
            let user:any = {
              id: snapShot.id,
              ...snapShot.data()
            };
            console.log(user);
            setCurrentUser(user)
          }

        });
      }
    });
    return () => {
      unsubscribeFromAuth();
    }
  }, [setCurrentUser]);

  useEffect(() => {
    getPosts(addAllPosts);

  }, [addAllPosts]);

  return (

    <div className="App">
      <Header user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/write-post" component={() => <WritePost user={currentUser} />} />
        <Route path="/user-profile" component={() => <UserProfile user={currentUser} />} />
        <Route path="/:comments" component={CommentPage} />
      </Switch>
      <Link to='/write-post'>
        <Button className='button-post' type="primary" shape="circle" icon={<PlusOutlined />} size="large" />
      </Link>
    </div>
  );
});

export default App;
