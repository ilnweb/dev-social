import React from 'react';
import './header.scss';

interface Props {
  user: {
    displayName?:string
  } | null
}

const Header: React.FC<Props> = ({ user }) => (
    <div className='header-main'>Hello, {user&&user.displayName}!</div>
);

export default Header;