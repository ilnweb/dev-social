import React from 'react';
import { Avatar } from 'antd';
import { IUser } from '../../interfaces/interfaces';

interface Props {
  size: number | 'large';
  displayName?: string;
  photoURL?:string
}

const UserAvatar: React.FC<Props> = ({ photoURL, displayName, size }) => {
  return (
    <Avatar
      size={size}
      style={{ backgroundColor: `${photoURL ? '' : '#00eb66'}`, fontSize: '1.4rem', fontWeight: 500, cursor: "pointer" }}
      src={photoURL ? photoURL : ''} >
      {displayName?.split('')[0].toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar;