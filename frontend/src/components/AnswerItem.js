import React, { useState, useEffect } from 'react';
import './AnswerItem.css';
import AnswerComment from './AnswerComment';

const AnswerItem = ({ answer , question_id}) => {
    const [ans, setAnswer] = useState(answer);
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const user_id = localStorage.getItem('user_id');
    const [isLogin, setisLogin] = useState(true);
    useEffect(() => {
        if(user_id === null){
            setisLogin(false);
        }
    }, [])

    const [commentdetails, setcommentDetails] = useState({
        message : "",
        answer_id : ans.answer_id,
        question_id : question_id,
        by : localStorage.getItem("user"),
        by_id : localStorage.getItem('user_id')
    });

    const handelCommentChange = (e) => {
        setcommentDetails((prevState) => ({ ...prevState, message:e.target.value}));
    }

    const handelCommentSubmit = async(e) => {
        e.preventDefault(); 
        if (commentdetails.message.trim() === '') {
            alert('Please enter your Comment before submitting.'); // Show an error message
        }
        else{
            const response = await fetch('/comment-on-answer', {
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
                    answer_id : ans.answer_id,
                    question_id : question_id,
                    by : localStorage.getItem("user"),
                    by_id : localStorage.getItem('user_id')
                });
                msg = json;
                if(msg !== ''){
                    msg = "Comment has been Added Successfully"
                }
            }
            alert(msg);
            const newData = await fetch('/specific-answer?answer_id=' + ans.answer_id + '&question_id=' + question_id);
            // console.log(response);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            for(var a of data){
                if(a.answer_id == ans.answer_id){
                    console.log(a);
                    setAnswer(a);
                    break;
                }
            }
            // console.log(data);           // setTempComment(tempComment + 1);
        }    
    }

    if(isLogin){
        return (
            <li key={ans.id} className="answer-item">
                <div className="answer-content">{ans.ans}</div>
                <div className="answer-user">by: {ans.posted_by}</div>
                <div className="button-container">
                    <button onClick={toggleComments} className="toggle-button">
                        View Comments
                    </button>
                </div>
                {showComments && (
                    <>
                        <h4 className="answer-comments-label">Comments:</h4>
                        <ul className="comments-list">
                            {ans.comments.map((comment) => (
                                <AnswerComment key={comment.comment_id} comment={comment}/>
                            ))}
                        </ul>
                        <form className="comment-form">
                            <input className="comment-input" placeholder="Your Comment" value={commentdetails.message} onChange={handelCommentChange} required Style=" width:97%"/>
                            <button className="comment-button" type="submit" onClick={handelCommentSubmit}>Add Comment</button>
                        </form>
                    </>
                )}
            </li>
        );
    }
    else{
        return (
            <li key={ans.id} className="answer-item">
                <div className="answer-content">{ans.ans}</div>
                <div className="answer-user">by: {ans.posted_by}</div>
                <div className="button-container">
                    <button onClick={toggleComments} className="toggle-button">
                        View Comments
                    </button>
                </div>
                {showComments && (
                    <>
                        <h4 className="answer-comments-label">Comments:</h4>
                        <ul className="comments-list">
                            {ans.comments.map((comment) => (
                                <AnswerComment key={comment.comment_id} comment={comment}/>
                            ))}
                        </ul>
                        <h4>Please Login to Add Comment</h4>
                    </>
                )}
            </li>
        );
    }
};

export default AnswerItem;


