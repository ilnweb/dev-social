import React from 'react';
import './header.scss';

interface Props {
  user: {
    displayName?:string
  }
}

const Header: React.FC<Props> = ({ user }) => (
    <div className='header-main'>Hello, {user.displayName}!</div>
);

export default Header;