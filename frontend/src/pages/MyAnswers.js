import React from "react";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useLoaderData } from "react-router-dom";
import MyAnswerItem from "../components/MyAnswerItem";

const MyAnswers = () => {

    const questions = useLoaderData();

    return(
        <>
            <Navbar />
            <div className='profile-container' style={{ marginTop:'0vh', zIndex: 1, backgroundColor: 'white' }}>
                <ProfileSidebar />
                <div className="header_and_content" Style="width:100%;">
                    <ProfileHeader />
                    {questions && questions.length > 0 && <><h2>Your Answers</h2>
                    <br></br>
                    <ul>
                        {questions.map((question) => (<MyAnswerItem question={question} key={question.question_id}/>))}
                    </ul>
                    </>
                    }
                    {questions && questions.length == 0 && <h3>No Answer Uploaded</h3>}
                </div>
            </div>
        </>
    )
}

const fetchmyanswers = async() => {
    const id = localStorage.getItem("user_id");
    const response = await fetch('/profile/myanswers?user_id=' + id);
    // console.log("Hi");
    // console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data;
}

export {
    MyAnswers,
    fetchmyanswers
} 