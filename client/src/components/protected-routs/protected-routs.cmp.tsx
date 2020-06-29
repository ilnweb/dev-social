import React from 'react';
import { Route } from 'react-router-dom';
import UserProfile from '../../pages/user-profile/user-profile.cmp';
import WritePost from '../../pages/write-post/write-post.cmp';

const ProtectedRouts: React.FC = () => {
  return (
    <>
      <Route path="/write-post" component={() => <WritePost />} />
      <Route path="/user-profile" component={() => <UserProfile />} />
    </>
  )
}

export default ProtectedRouts;