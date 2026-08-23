import React from 'react';
import './BlogComment.css';
import BlogCommentReply from './BlogCommentReply';

const BlogComment = ({comment}) => {

    return(
        <>
            <li key={comment.id} className="blog-comment-item" Style="border: 1px solid #eee;border-radius: 5px; margin-bottom: 10px; padding: 10px;">
                <div className="blog-comment-message">{comment.message}</div>
                <br></br>
                <div className="blog-comment-user">by {comment.by}</div>
                {/* <div className="blog-reply-section">
                    <br></br>
                    <br></br>
                    <span className="blog-reply-label">Reply:</span>
                    <ul className="blog-reply-list">
                        {comment.reply.map((reply) => <BlogCommentReply key={reply.id} reply={reply}/>)}
                    </ul>
                </div> */}
            </li> 
            {/* <hr></hr>          */}
        </>
    )
}

export default BlogComment;

