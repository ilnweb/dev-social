import React, { forwardRef } from 'react';
import { Avatar } from 'antd';
import { IUser } from '../../interfaces/interfaces';

interface Props extends IUser {
  size: number | 'large';
}

const UserAvatar: React.FC<Props> = ({ user, size }) => {
  return (
    <Avatar
      size={size}
      style={{ backgroundColor: `${user?.photoURL ? '' : '#00eb66'}`, fontSize: '1.4rem', fontWeight: 500, cursor: "pointer" }}
      src={user ? user.photoURL : ''} >
      {user?.displayName?.split('')[0].toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar;