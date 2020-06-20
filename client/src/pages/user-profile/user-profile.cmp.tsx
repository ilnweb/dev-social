import React from 'react';
import './user-profile.scss';
import { Row, Col, Avatar, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../interfaces/interfaces';
import UploadAvatar from '../../components/upload-avatar/upload-avatar.cmp';
import UserAvatar from '../../components/avatar/avatar.cmp';


const UserProfile: React.FC<IUser> = observer(({ user }) => {
  return (
    <div className='user-profile'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
        <Col span={6} xs={22} sm={20} md={20} lg={12} xl={12}>
          <Typography.Title level={1} style={{ color: '#01FF70' }}>Your Profile</Typography.Title>
          <div className="user-profile-data">
            <div className="user-profile-image">
              <div className={`user-profile-upload-icon ${user?.photoURL && "opacity0"}`}>
                <UploadAvatar user={user} /></div>
              <UserAvatar user={user} size={100}/>
            </div>
            <div className="user-profile-info">
              <Typography.Title level={3} style={{ color: 'white' }}>@{user && user.displayName}</Typography.Title>
              Email:
              <p> {user && user.email}</p>
              Location:
              <p>Warsaw</p>
              Job:
              <p>Front-end developer</p>
              Skills:
              <p>REACT REDUX TypeScript</p>
              Work status:
              <p>I'm looking for work</p>
            </div>
          </div>
        </Col>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
      </Row>
    </div>
  )
});

export default UserProfile;