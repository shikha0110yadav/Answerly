import React from 'react';
import './AskQuestion.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {

    const [details, setDetails] = useState({
        question_title : "", 
        question : "",
        posted_by : localStorage.getItem('user'),
        posted_by_id : localStorage.getItem('user_id')
    })

    
    //var isset = false;
    const navigate = useNavigate();
   

   
    var msg;
    const HandeleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('/question', {
            method:'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
            msg = json.error;
        }
        else{
            setDetails({
                question_title : "", 
                question : ""
            })
            msg = json;
            if(msg !== ''){
                msg = "Question has been Added Successfully"
            }
        }
        alert(msg);
    }

    const handlequestiontitle = (e) => {
        setDetails((prevState) =>  ({...prevState, question_title:e.target.value}))
    }

    const handlequestion = (e) => {
        setDetails((prevState) =>  ({...prevState, question:e.target.value}))
    }

   // if(isset){
        return (
            <>
            <Navbar />
            <section className="ask-form">
              <h2>Ask a Question</h2>
              <form onSubmit={HandeleSubmit}>
                <div className="form-group">
                  <label htmlFor="question-title">Question Title</label>
                  <input type="text" id="question-title" required onChange={handlequestiontitle} value={details.question_title}/>
                </div>
                <div className="form-group">
                  <label htmlFor="question-body">Question Body</label>
                  <textarea id="question-body" onChange={handlequestion} value={details.question} required></textarea>
                </div>
                <button type="submit">Submit Question</button>
              </form>
            </section>
            <Footer />
            </>
        )
    // }
    // else{
    //     redirect('/login');
    //     alert("Please Login First");
    // }
}

export default AskQuestion;