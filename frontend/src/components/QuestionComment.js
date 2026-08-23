import React from 'react';
import './QuestionComment.css';
import QuestionCommentReply from './QuestionCommentReply';

const QuestionComment = ({comment}) => {

    return(
        <>
            <li key={comment.id} className="comment-item" Style="border: 1px solid #eee;border-radius: 5px;    margin-bottom: 10px; padding: 10px;">
                <div className="comment-message">{comment.message}</div>
                <div className="comment-user">by {comment.by}</div>
                {/* <div className="reply-section">
                    <br></br>
                    <br></br>
                    <span className="reply-label">Reply:</span>
                    <ul className="reply-list">
                        {comment.reply.map((reply) => <QuestionCommentReply key={reply.id} reply={reply}/>)}
                    </ul>
                </div> */}
            </li> 
            {/* <hr></hr>          */}
        </>
    )
}

export default QuestionComment;

