import React from 'react';
import './BlogCommentReply.css';

const BlogCommentReply = ({reply}) => {
    
    return(
        <>
            <li key={reply.id}  className="blog-reply-item">
                <div className="blog-reply-message">{reply.message}</div>
                <div className="blog-reply-user">{reply.by}</div>
            </li>
        </>
    )
}

export default BlogCommentReply;

