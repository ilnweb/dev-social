import React, { useState } from 'react';
import { useMst } from "../../mobX/root-store";
import { Upload, message } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { avatarUpload } from '../../database/connect';
import { IUser } from '../../interfaces/interfaces';
import { currentUserInstance } from '../../mobX/user.context';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 3000 / 3000 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

interface Props {
  id:string | undefined
}

const UploadAvatar: React.FC<Props> = ({ id } ) => {
  const [state, setState] = useState({ loading: false, imageUrl: '' })
  const { setCurrentUser } = useMst();
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setState({ ...state, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, async(imageUrl: any) => {
        setState({
          imageUrl,
          loading: false,
        })
        console.log(info.file.originFileObj);
        const updatedUser: currentUserInstance = await avatarUpload(imageUrl, id)
        setCurrentUser(updatedUser)
      }
      );

    }
  };


  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined style={{ color: '#01FF70', fontSize: '3rem' }} /> : <UploadOutlined style={{ color: '#01FF70', fontSize: '3rem' }} />}
    </div>
  );
  const { imageUrl } = state;

  return (
    <Upload
        name="image"
        listType="picture-card"
        className={`avatar-uploader`}
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <div className='avatar-preview' style={{ backgroundImage: `url(${imageUrl})` }} /> : uploadButton}
      </Upload>
  );
}


export default UploadAvatar;

