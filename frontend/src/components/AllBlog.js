import React from 'react';
import './AllBlog.css';
import { Link } from 'react-router-dom';

const AllBlog = ({blog}) => {

    return (
        <li>
            <Link to={`/viva/${blog.blog_id}`} key={blog.blog_id} style={{textDecoration:'none'}}>
                <div className="question-item" value={blog.blog_id}>
                    <h3 className="question-title">{blog.blog_title}</h3>
                    {/* <p className="question-content">{blog.blog}</p> */}
                    <div className="meta">
                    <span className="user">Posted by: {blog.posted_by}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default AllBlog;


