import React from 'react';
import hljs from "highlight.js";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'highlight.js/styles/monokai.css';
import './quill.style.scss';
import ReactQuill from 'react-quill';

interface SyntheticEvent<T> {
  currentTarget: EventTarget & T;
}

hljs.configure({
  languages: ["javascript", "ruby", "python", 'html']
});

const modules = {
  syntax: {
    highlight: (text: any) => hljs.highlightAuto(text).value,
  }
}

interface Props {
  postBody: string
}

const QuillComponent: React.FC<Props> = ({ postBody }) => {
  console.log('quill');
  return (
  <ReactQuill
    readOnly={true}
    className="single_post-quill"
    theme="snow"
    value={postBody}
    modules={modules}
    style={{ width: '100%', marginBottom: '2rem' }}
  />
)}

export default React.memo(QuillComponent);

