import React, { useState } from 'react';
import './MyQuestionItem.css';

const MyQuestionItem = ({ question }) => {
  const [ques, setQuestion] = useState(question);
  const [isEditing, setEditing] = useState(false);
  const [editQuestion, seteditQuestion] = useState({
    question:ques.question,
    question_title:ques.question_title,
    question_id : ques.question_id
  })
  //const [editedTitle, setEditedTitle] = useState(question.question_title);
  //const [editedQuestion, setEditedQuestion] = useState(question.question);

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    seteditQuestion((prevState) => ({...prevState, question_title:e.target.value}));
  };

  const handleQuestionChange = (e) => {
    seteditQuestion((prevState) => ({...prevState, question:e.target.value}));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Check if at least one field is filled
        const response = await fetch('/edit-question', {
            method:'POST',
            body: JSON.stringify(editQuestion),
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
            msg = json;
            if(msg !== ''){
                msg = "Question has been Updated Successfully"
            }
        }
        alert(msg);  
        const newData = await fetch('/specific-question?question_id=' + ques.question_id);
        if (!newData.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await newData.json();
        setQuestion(data);
  };

  return (
    <li>
      <div className="question-item" value={ques.question_id}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <label>
              Question Title:
              <input type="text" value={editQuestion.question_title} onChange={handleTitleChange} />
            </label>
            <label>
              Question:
              <textarea value={editQuestion.question} onChange={handleQuestionChange} />
            </label>
            <button Style="margin-left:0px"type="submit">Save</button>
          </form>
        ) : (
          <>
            <h3 className="question-title">{ques.question_title}</h3>
            <p className="question-content">{ques.question}</p>
          </>
        )}
        <button Style="width: 100px;margin-left: 1100px;" onClick={handleToggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
      </div>
    </li>
  );
};

export default MyQuestionItem;
