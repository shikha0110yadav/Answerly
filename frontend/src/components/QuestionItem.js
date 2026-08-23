import React from 'react';
import './QuestionItem.css';
import QuestionComment from './QuestionComment';
import AnswerItem from './AnswerItem';
import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const QuestionItem = () => {
    const {question_id} = useParams();
    const [question, setQuestion] = useState(useLoaderData());
    // console.log("Hello");
    const [showComments, setShowComments] = useState(false);
    const toggleComments = () => {
        setShowComments(!showComments);
    };
    // const [tempComment, setTempComment] = useState(0);

    const user_id = localStorage.getItem('user_id');
    const [isLogin, setisLogin] = useState(true);
    useEffect(() => {
        // const question = useLoaderData();
        if(user_id === null){
            setisLogin(false);
        }
        else{
            var value;
            var isvoted = false;
            for(var i of question.likes_by){
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
    },[])
    const [voteCount, setvoteCount] = useState(question.likes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [details, setDetails] = useState({
        ans : "",
        question_id : question_id,
        posted_by : localStorage.getItem("user"),
        posted_by_id : localStorage.getItem('user_id')
    });
   

    const [commentdetails, setcommentDetails] = useState({
        message : "",
        question_id : question_id,
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
            const response = await fetch('/comment-on-question', {
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
            const newData = await fetch('/specific-question?question_id=' + question_id);
            // console.log(response);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            // console.log(data);           // setTempComment(tempComment + 1);
            setQuestion(data);
        }    
    }

    const handelAnswerChange = (e) => {
        setDetails((prevState) => ({ ...prevState, ans:e.target.value}));
        console.log(details);
    }

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        if (details.ans.trim() === '') {
            alert('Please enter your answer before submitting.'); // Show an error message
        }
        else{
            const response = await fetch('/upload-answer', {
                method:'POST',
                body: JSON.stringify(details),
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
                setDetails({
                    ans : "",
                    question_id : question_id,
                    posted_by : localStorage.getItem("user"),
                    posted_by_id : localStorage.getItem('user_id')
                });
                msg = json;
                if(msg !== ''){
                    msg = "Answer has been Added Successfully"
                }
            }
            alert(msg);  
            const newData = await fetch('/specific-question?question_id=' + question_id);
            // console.log(response);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            // console.log(data);           // setTempComment(tempComment + 1);
            setQuestion(data); 
        }
    }

    const navigate = useNavigate();
    const pleaselogin = () => {
        alert("Please Login first");
        navigate("/auth", {replace : true});
    }

    const upvote = async() => {
        const formData = {
            question_id : question_id,
            liked_by_id : user_id
        };
        if(isUpvoted === false && isDownvoted === false){
            setIsUpvoted(true);
            const response = await fetch('/like-question', {
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
            const response = await fetch('/remove-like-question', {
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
            const response = await fetch('/convert-dislike-to-like-question', {
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
            question_id : question_id,
            liked_by_id : user_id
        };
        if(isDownvoted === false && isUpvoted === false){
            setIsDownvoted(true);
            const response = await fetch('/dislike-question', {
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
            const response = await fetch('/remove-dislike-question', {
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
            const response = await fetch('/convert-like-to-dislike-question', {
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

    if(isLogin){
        return (
            <>
            <Navbar />
            <div className="single-question-item" value={question_id} Style="border: 1px solid #f5eeee;">
                <h3 className="single-question-title">{question.question_title}</h3>
                <p className="single-question-content">{question.question}</p>
                <div className="single-meta">
                  <span className="single-user">Posted by: {question.posted_by}</span>
                    {/* <span className="single-votes">Likes: {question.likes}</span> */}
                    <span className={isUpvoted ? "vote_up_on" : "vote_up_off"}onClick={upvote}></span>
                    <div>{voteCount}</div>
                    <span className={isDownvoted ? "vote_down_on" : "vote_down_off"}onClick={downvote}></span>
                </div>
            
                <button onClick={toggleComments} className='comment-button-question'>View Comments</button>
                {showComments && (
                    <div className="comments-section">
                        <h4>Comments:</h4>
                        <ul className="comments-list">
                            {question.comments.map((comment) => (
                                <QuestionComment key={comment.comment_id} comment={comment} />
                            ))}
                        </ul>
                        <br></br>
                        <form className="comment-form">
                            <input className="comment-input" placeholder="Your Comment" value={commentdetails.message} onChange={handelCommentChange} required />
                            <button className="comment-button" type="submit" onClick={handelCommentSubmit}>Add Comment</button>
                        </form>
                    </div>
                )}
                <div className="answers-section">
                    <h2><b>Answers:</b></h2>
                    <ul className="answers-list">
                        {question.answer.map((answer) => <AnswerItem key={answer.answer_id} answer={answer} question_id={question.question_id}/>)}
                    </ul>
                    {/* <h2 className="addanswer">Add Your Answer</h2> */}
                    <form className="answer-form">
                        <input className="answer-input" placeholder="Your answer" value={details.ans} onChange={handelAnswerChange} required/>
                        <button className="submit-button" Style="width: 200px;" type="submit" onClick={handleSubmit}>Submit Answer</button>
                    </form>
                </div>
            </div>
            </>
        );
    }
    else{
        return (
            <>
                <Navbar />
                <div className="single-question-item" value={question_id}>
                    <h3 className="single-question-title">{question.question_title}</h3>
                    <p className="single-question-content">{question.question}</p>
                    <div className="single-meta">
                    <span className="single-user">Posted by: {question.posted_by}</span>
                        {/* <span className="single-votes">Likes: {question.likes}</span> */}
                        <span className="vote_up_off" onClick={pleaselogin}></span>
                        <div>{voteCount}</div>
                        <span className="vote_down_off" onClick={pleaselogin}></span>
                    </div>
                
                    <button onClick={toggleComments} className='comment-button-question'>View Comments</button>
                    {showComments && (
                        <div className="comments-section">
                            <h4>Comments:</h4>
                            <ul className="comments-list">
                                {question.comments.map((comment) => (
                                    <QuestionComment key={comment.comment_id} comment={comment} />
                                ))}
                            </ul>
                            <h4>Please Login to Add Comment</h4>
                        </div>
                    )}
                    <div className="answers-section">
                        <h2><b>Answers:</b></h2>
                        <ul className="answers-list">
                            {question.answer.map((answer) => <AnswerItem key={answer.answer_id} answer={answer}/>)}
                        </ul>
                        {/* <h2 className="addanswer">Add Your Answer</h2> */}
                        <form className="answer-form">
                            <input className="answer-input" placeholder="Your answer" value={details.ans} onChange={handelAnswerChange} required/>
                            <button className="submit-button" type="submit" onClick={pleaselogin} Style="width: 200px;">Submit Answer</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
    
}

const fetchquestion = async({ params }) => {
    const {question_id} = params;
    const response = await fetch('/specific-question?question_id=' + question_id);
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export  {
    QuestionItem,
    fetchquestion
}


