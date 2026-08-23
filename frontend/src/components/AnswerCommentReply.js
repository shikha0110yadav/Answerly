import React from 'react';
import './AnswerCommentReply.css';

const AnswerCommentReply = ({ reply }) => {
    return (
        <li key={reply.id} className="reply-item">
            <div className="reply-message">{reply.message}</div>
            <div className="reply-user">by: {reply.by}</div>
        </li>
    );
}

export default AnswerCommentReply;


