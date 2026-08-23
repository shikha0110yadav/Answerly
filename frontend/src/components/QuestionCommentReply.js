import React from 'react';
import './QuestionCommentReply.css';

const QuestionCommentReply = ({reply}) => {
    
    return(
        <>
            <li key={reply.id}  className="reply-item">
                <div className="reply-message">{reply.message}</div>
                <div className="reply-user">{reply.by}</div>
            </li>
        </>
    )
}

export default QuestionCommentReply;

