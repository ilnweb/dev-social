import React from 'react';
import './header.scss';



const Header = ({ name }) => (
  
    <div className='header-main'>Hello, {name.displayName}!</div>

);

export default Header;