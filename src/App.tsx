import React from 'react';
import './App.css';
import Header from './components/header/header.cmp';
import PostFeed from './components/post-feed/post-feed.cmp';

const App = () => {
  const post = {
    postTitle: 'New post',
    postImg: 'https://res.cloudinary.com/ilnphotography/image/upload/v1584300108/HomePage/35450482_zftxnr.jpg',
    userName: '1',
    createdAt: '28/9/1966'
  }
  return (
    <div className="App">
      <Header name="Tosheto" />
      <PostFeed post={post}/>
    </div>
  );
}

export default App;
