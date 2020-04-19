import React from 'react';
import './header.scss';

interface Props {
  name:string
}

const Header  = ({name} :Props) => (
  <div className='header-main'>Hello, my name is {name}!</div>
);

export default Header;