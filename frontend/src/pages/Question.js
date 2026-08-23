import React from 'react';
//import './QuestionPage.css'; // Import the external CSS file for styling
import './Question.css';
import AllQuestion from '../components/AllQuestion';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

var data;

const Question = () => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
      const fetchdata = async() => {
        const response = await fetch('/show-all-question');
        console.log(response);
        const json = await response.json();
        data = json;
        console.log(data);
        setTimeout(async function(){
          setisLoading(false);
        }, 1000)
      }
      fetchdata();
    }, []);  
  if(isLoading){
    return (
      <>
      <Navbar />
      <div className="question-page">
          <section className="question-list">
            <h2>All Questions</h2>
            <ul>
                <p>Loading....</p>
            </ul>
          </section>
      </div>
      <Footer />
      </>
    );
  }
  else{
    return (
      <>
      <Navbar />
      <div className="question-page">
        <section className="question-list">
          <h2>All Questions</h2>
          <div className="horizontal-scroll-container">
            {data.map((question) => (
              <AllQuestion question={question} key={question.question_id} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
      </>
    );
  }
};

export default Question;


