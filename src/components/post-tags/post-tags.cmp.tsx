import React, { useState, useRef } from 'react';
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';

interface Props {
  
}

const EditableTagGroup: React.FC<Props> = observer(() => {

  const [tagsData, setTags] = useState({ tags: ['Tag 1', 'Tag 2', 'Tag 3'], inputVisible: false, inputValue: '' });
  const saveInputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  
  const handleClose = (removedTag: string): void => {
    setTags({
      ...tagsData, tags: tagsData.tags.filter((tag: string) => tag !== removedTag)
    });
  };

  const showInput = () => {
    const node = saveInputRef.current!
    setTags({
      ...tagsData, inputVisible: true
    })
    node.focus()
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target) {
      setTags({
        ...tagsData, inputValue: e.target.value
      });
    }
  };

  const handleInputConfirm = () => {
    const { inputValue } = tagsData;
    let { tags } = tagsData;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    setTags({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
            handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const { tags, inputVisible, inputValue } = tagsData;
  const tagChild = tags.map(forMap);
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
            // onComplete: (e: React.ChangeEvent<HTMLElement>) => {
            //   e.target.style = '';
            // },
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </div>
  );
})

export default EditableTagGroup;