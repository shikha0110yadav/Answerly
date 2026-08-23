import React from 'react';
import './AnswerComment.css';
import { useState } from 'react';
import AnswerCommentReply from './AnswerCommentReply';

const AnswerComment = ({ comment }) => {
    return (
        <li key={comment.id} className="comment-item">
            <div className="comment-message">{comment.message}</div>
            <div className="comment-user">by: {comment.by}</div>
           
            {/* <div className="reply-section">
                <span className="reply-label">Reply:</span>
                <ul className="reply-list">
                    {comment.reply.map((reply) => <AnswerCommentReply key={reply.id} reply={reply} />)}
                </ul>
            </div> */}
        </li>
    );
}

export default AnswerComment;


