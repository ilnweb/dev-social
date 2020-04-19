import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import Header from './components/header/header.cmp';
import HomePage from './pages/home-page/home-page.cmp';
import { Route, Switch } from 'react-router-dom';


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
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
