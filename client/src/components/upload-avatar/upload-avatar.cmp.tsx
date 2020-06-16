import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadAvatar: React.FC = () => {
  const [state, setState] = useState({ loading: false, imageUrl: '' })

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setState({ ...state, loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined style={{ color: '#e16162', fontSize: '3rem' }} /> : <UploadOutlined style={{ color: '#e16162', fontSize: '3rem' }} />}
    </div>
  );
  const { imageUrl } = state;
  console.log(imageUrl);
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <div className='avatar-preview' style={{ backgroundImage: `url(${imageUrl})` }}  /> : uploadButton}
    </Upload>
  );
}


export default UploadAvatar;

