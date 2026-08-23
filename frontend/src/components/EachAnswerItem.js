import React, { useState } from 'react';
import './EachAnswerItem.css';
import { Link } from 'react-router-dom';

const EachAnswerItem = ({ question, answer }) => {
  const [answ, setAns] = useState(answer);
  const [isEditing, setEditing] = useState(false);
  const [editAnswer, seteditAnswer] = useState({
    ans:answ.ans,
    question_id : question.question_id,
    answer_id:answ.answer_id
  })

  const valid = answ.posted_by_id == localStorage.getItem('user_id');

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleAnswerChange = (e) => {
    seteditAnswer((prevState) => ({...prevState, ans:e.target.value}));
  };

  const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('/edit-answer', {
            method:'POST',
            body: JSON.stringify(editAnswer),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        console.log("Shru");
        var msg;
        const json = await response.json();
        
        if(!response.ok){
            msg = json.error;
        }
        else{
            msg = json;
            if(msg !== ''){
                msg = "Answer has been Updated Successfully"
            }
        }
        alert(msg);  
        const newData = await fetch('/specific-answer?answer_id=' + answ.answer_id + '&question_id=' + question.question_id);
        if (!newData.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await newData.json();
        for(var a of data){
          if(a.answer_id == answ.answer_id){
              console.log(a);
              setAns(a);
              break;
          }
      }
  };

  return (
    <li>
    {valid &&
      <div className="question-item" value={question.question_id}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <label>
              New Answer:
              <textarea value={editAnswer.ans} onChange={handleAnswerChange} />
            </label>
            <button Style="margin-left:0px" type="submit">Save</button>
          </form>
        ) : (
          <>
            <h3 className="question-title">{question.question_title}</h3>
            <p className="question-content">{question.question}</p>
            <b>Your Answer :</b> 
            <p className='myanswer-item'>{answ.ans}</p>
          </>
        )}
        <button Style="width: 100px;margin-left: 1100px;" onClick={handleToggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
      </div>
    }
    </li>
  );
};

export default EachAnswerItem;
