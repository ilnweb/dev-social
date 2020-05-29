import React from 'react';
import './user-profile.scss';
import { Row, Col, Avatar, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../interfaces/interfaces';

const UserProfile: React.FC<IUser> = observer(({ user }) => {

  return (
    <div className='user-profile'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
        <Col span={6} xs={22} sm={20} md={20} lg={12} xl={12}>
          <Typography.Title level={1} style={{ color: 'white' }}>Your Profile</Typography.Title>
          <div className="user-data">
            <div><Avatar size={70} src={user ? user.photoURL : ''} /> </div>
            <div className="user-info">
              <Typography.Title level={2} style={{ color: 'white' }}>{user && user.displayName}</Typography.Title>
              <Typography.Title level={4} style={{ color: 'white' }}>{user && user.email}</Typography.Title>
            </div>
          </div>
        </Col>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
      </Row>
    </div>
  )
});

export default UserProfile;