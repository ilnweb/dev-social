import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { useDispatch } from 'react-redux';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { updateUserAvatarStart } from '../../redux/user/user-actions';

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
  return isJpgOrPng&&isLt2M;
}

const dummyRequest = ({ file, onSuccess }:any):any => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const UploadAvatar: React.FC = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ loading: false, imageUrl: '' })
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
        dispatch(updateUserAvatarStart(imageUrl))
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
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <div className='avatar-preview' style={{ backgroundImage: `url(${imageUrl})` }} /> : uploadButton}
      </Upload>
  );
}


export default UploadAvatar;

