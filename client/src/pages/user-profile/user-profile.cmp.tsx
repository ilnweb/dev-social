import React, { useState } from 'react';
import { useMst } from "../../mobX/root-store";
import './user-profile.scss';
import { Row, Col, Typography, Input, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import UploadAvatar from '../../components/upload-avatar/upload-avatar.cmp';
import UserAvatar from '../../components/avatar/avatar.cmp';
// import { currentUserInstance } from '../../mobX/user.context';
import { updateUserInfo } from '../../database/connect';


const UserProfile: React.FC = observer(() => {
  const { setCurrentUser, currentUser } = useMst();
  const user = currentUser;
  const [state, setState] = useState({
    location: user?.location,
    jobTitle: user?.jobTitle,
    workStatus: user?.workStatus,
    skills: user?.skills
  });

  const [edit, toggleEdit] = useState(true);

  const handleSave = async () => {
    const updatedUser = await updateUserInfo(state, user?.id);
    setCurrentUser(updatedUser)
    toggleEdit(true);
  }

  const handleEdit = () => {
    toggleEdit(false);
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  console.log(user);

  return (
    <div className='user-profile'>
      <Row>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
        <Col span={6} xs={22} sm={20} md={20} lg={12} xl={12}>
          <Typography.Title level={1}>{user && `Hello, ${user.displayName}`}</Typography.Title>
          <div className="user-profile-data">
            <div className="user-profile-image">
              <div className={`user-profile-upload-icon ${edit && "opacity0"}`}>
                <UploadAvatar id={user?.id} />
              </div>
              <UserAvatar displayName={user?.displayName} photoURL={user?.photoURL} size={100} />
            </div>
            <div className="user-profile-info">
              <Typography.Title level={3} style={{ color: 'white' }}>@{user && user.displayName}</Typography.Title>
              <label>Email:</label>
              <Input
                name="email"
                value={user?.email}
                style={{ paddingLeft: '0' }}
                className="input-style "
                type="email"
                size="large"
                placeholder="Email"
                autoComplete="true"
                onChange={handleChange}
                disabled={true}
              />
              <label>Location:</label>
              <Input
                name="location"
                value={state.location ? state.location : ''}
                className={`input-style user-profile-input ${!edit && 'edit-border'}`}
                type="text"
                size="large"
                placeholder=" ..."
                autoComplete="true"
                onChange={handleChange}
                disabled={edit}
              />

              <label>Job Title:</label>
              <Input
                name="jobTitle"
                value={state.jobTitle ? state.jobTitle : ''}
                className={`input-style user-profile-input ${!edit && 'edit-border'}`}
                type="text"
                size="large"
                placeholder=" ..."
                autoComplete="true"
                onChange={handleChange}
                disabled={edit}
              />

              <label>Skills:</label>
              <Input
                name="skills"
                value={state?.skills ? state.skills : ''}
                className={`input-style user-profile-input ${!edit && 'edit-border'}`}
                type="text"
                size="large"
                placeholder=" ..."
                autoComplete="true"
                onChange={handleChange}
                disabled={edit}
              />
              <label>Work status:</label>
              <Input
                name="workStatus"
                value={state?.workStatus ? state.workStatus : ''}
                className={`input-style user-profile-input ${!edit && 'edit-border'}`}
                type="text"
                size="large"
                placeholder=" ..."
                autoComplete="true"
                onChange={handleChange}
                disabled={edit}
              />
            </div>
            <Button className="button button-dev block" size="large" style={{ marginTop: '1rem' }} onClick={!edit ? handleSave : handleEdit}>
              {!edit ? 'Save' : 'Edit Profile'}
            </Button>
          </div>
        </Col>
        <Col span={6} sm={2} xs={1} lg={6}></Col>
      </Row>
    </div>
  )
});

export default UserProfile;