// BlogItem.jsx
import React, { useEffect } from 'react';
import './BlogItem.css';
import { useState } from 'react';
import BlogComment from './BlogComment';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const BlogItem = () => {
    const {blog_id} = useParams();
    const [blog, setBlog] = useState(useLoaderData());
    const [showComments, setShowComments] = useState(false);
    const user_id = localStorage.getItem('user_id');
    const [isLogin, setisLogin] = useState(true);
    useEffect(() => {
        if(user_id === null){
            setisLogin(false);
        }
        else{
            var value;
            var isvoted = false;
            for(var i of blog.likes_by){
                if(i.liked_by_id == user_id){
                    value = i.value;
                    isvoted = true;
                }
            }
            console.log(isvoted);
            if(isvoted){
                if(value === 1){
                    setIsUpvoted(true);
                }
                else{
                    setIsDownvoted(true);
                }
            }
        }
    }, [])
    const [voteCount, setvoteCount] = useState(blog.likes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const [commentdetails, setcommentDetails] = useState({
        message : "",
        blog_id : blog_id,
        by : localStorage.getItem("user"),
        by_id : localStorage.getItem('user_id')
    });

    const handelCommentChange = (e) => {
        setcommentDetails((prevState) => ({ ...prevState, message:e.target.value}));
        //console.log(details);
    }

    const handelCommentSubmit = async(e) => {
        e.preventDefault(); 
        if (commentdetails.message.trim() === '') {
            alert('Please enter your Comment before submitting.'); // Show an error message
        }
        else{
            const response = await fetch('/comment-on-blog', {
                method:'POST',
                body: JSON.stringify(commentdetails),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            var msg;
            const json = await response.json();
            if(!response.ok){
                msg = json.error;
            }
            else{
                setcommentDetails({
                    message : "",
                    blog_id : blog_id,
                    by : localStorage.getItem("user"),
                    by_id : localStorage.getItem('user_id')
                });
                msg = json;
                if(msg !== ''){
                    msg = "Comment has been Added Successfully"
                }
            }
            alert(msg);
            const newData = await fetch('/specific-blog?blog_id=' + blog_id);
            // console.log(response);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            // console.log(data);           // setTempComment(tempComment + 1);
            setBlog(data);
        }    
    }

    const upvote = async() => {
        const formData = {
            blog_id : blog_id,
            liked_by_id : user_id
        };
        if(isUpvoted === false && isDownvoted === false){
            setIsUpvoted(true);
            const response = await fetch('/like-blog', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if(isUpvoted === true && isDownvoted === false){
            setIsUpvoted(false);
            const response = await fetch('/remove-like-blog', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if(isUpvoted === false && isDownvoted === true){
            setIsUpvoted(true);
            setIsDownvoted(false);
            const response = await fetch('/convert-dislike-to-like-blog', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 2);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
    }

    const downvote = async() => {
        const formData = {
            blog_id : blog_id,
            liked_by_id : user_id
        };
        if(isDownvoted === false && isUpvoted === false){
            setIsDownvoted(true);
            const response = await fetch('/dislike-blog', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if(isDownvoted === true && isUpvoted === false){
            setIsDownvoted(false);
            const response = await fetch('/remove-dislike-blog', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if(isDownvoted === false && isUpvoted === true){
            setIsDownvoted(true);
            setIsUpvoted(false);
            const response = await fetch('/convert-like-to-dislike-blog', {
                method:'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 2);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
    }

    const navigate = useNavigate();
    const pleaselogin = () => {
        alert("Please Login first");
        navigate("/auth", {replace : true});
    }
    
    if(isLogin){
        return (
            <>
            <Navbar />
            <div className="blog-item">
                <h3 className='blog-title'>{blog.blog_title}</h3>
                <p className="blog-content">{blog.blog}</p>
                <div className="meta">
                    <span className="user">Posted by: {blog.posted_by}</span>
                    {/* <span class="sprite vote" onClick={upvote}> </span>
                    <span> {blog.likes}</span> */}
                    {/* <span className="votes">Likes:{blog.likes}</span> */}
                    <span className={isUpvoted ? "vote_up_on" : "vote_up_off"}onClick={upvote}></span>
                    <div>{voteCount}</div>
                    <span className={isDownvoted ? "vote_down_on" : "vote_down_off"}onClick={downvote}></span>
                </div>
                <button className='comment-button-blog' onClick={toggleComments}>View Comments</button>
                    {showComments && (
                        <div className="comments-section">
                            <h4>Comments:</h4>
                            <ul className="comments-list">
                                {blog.comments.map((comment) => (
                                <BlogComment key={comment.comment_id} comment={comment} />
                            ))}
                            </ul>
                            <form className="comment-form">
                                <input className="comment-input" placeholder="Your Comment" value={commentdetails.message} onChange={handelCommentChange} required />
                                <button className="comment-button" type="submit" onClick={handelCommentSubmit}>Add Comment</button>
                            </form>
                        </div>
                    )}
            </div>
            {/* <Footer /> */}
            </>
        );
    }
    else{
        return (
            <>
                <Navbar />
                <div className="blog-item">
                    <h3 className='blog-title'>{blog.blog_title}</h3>
                    <p className="blog-content">{blog.blog}</p>
                    <div className="meta">
                        <span className="user">Posted by: {blog.posted_by}</span>
                        {/* <span class="sprite vote" onClick={upvote}> </span>
                        <span> {blog.likes}</span> */}
                        {/* <span className="votes">Likes:{blog.likes}</span> */}
                        <span className="vote_up_off" onClick={pleaselogin}></span>
                        <div>{voteCount}</div>
                        <span className="vote_down_off" onClick={pleaselogin}></span>
                    </div>
                    <button onClick={toggleComments} Style="width: 200px;margin-left: 650px;">View Comments</button>
                        {showComments && (
                            <div className="comments-section">
                                <h4>Comments:</h4>
                                <ul className="comments-list">
                                    {blog.comments.map((comment) => (
                                    <BlogComment key={comment.comment_id} comment={comment} />
                                ))}
                                </ul>
                                <h4>Please Login to Add Comment</h4>
                            </div>
                        )}
                </div>
            </>
        );
    }
}

const fetchblog = async({ params }) => {
    const {blog_id} = params;
    const response = await fetch('/specific-blog?blog_id=' + blog_id);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export {
    BlogItem,
    fetchblog
}
