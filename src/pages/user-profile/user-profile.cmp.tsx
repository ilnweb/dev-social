import React from 'react';
import './user-profile.scss';
import { Row, Col, Avatar, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../interfaces/interfaces';

const UserProfile: React.FC<IUser> = observer(({ user }) => {

  return (
    <div className='user-profile'>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Avatar size={200} src={user ? user.photoURL : ''} />
          <Typography.Title level={1} style={{ color: 'white' }}>Your Profile</Typography.Title>
          <Typography.Title level={2} style={{ color: 'white' }}>{user && user.displayName}</Typography.Title>
          <Typography.Title level={4} style={{ color: 'white' }}>{user && user.email}</Typography.Title>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  )
});

export default UserProfile;