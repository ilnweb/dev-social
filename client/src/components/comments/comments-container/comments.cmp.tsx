import React from 'react';
import './comments.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPostCommentStart } from '../../../redux/posts/posts-actions';
import { selectCurrentUser } from '../../../redux/user/user-selectors';
import SingleComment from '../single-comment/single-comment.cmp';
import { FiCornerDownRight } from 'react-icons/fi';

const Comments = ({ comments, postId }: any) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const submitComment = (commentText: string, commentId: string) => {
    if (!commentText) {
      return;
    }
    if (user) {
      console.log({commentText, commentId, postId, user:user.id});
    }
    
  }

  return (
    <div style={{ padding: '1rem' }}>
      {comments && comments.map((comment: any) => {
        return (
          <div key={comment._id}>
            <SingleComment
              comment={comment}
              commentUserName={comment.postedBy.displayName}
              submitComment={submitComment}
              commentId={comment._id}
            />
            {comment.replys.length !== 0 &&
              <div className="d-flex reply-container">
                <FiCornerDownRight className="icon-standart"  />
                <div style={{ width: '100%' }}>
                  {comment.replys && comment.replys.map((reply: any) => (
                    <SingleComment
                      key={reply._id}
                      comment={reply}
                      commentUserName={comment.postedBy.displayName}
                      submitComment={submitComment}
                      commentId={comment._id}
                    />
                  ))}
                </div>
              </div>
            }
          </div>
        )
      })}
    </div>

  );
}

export default Comments;