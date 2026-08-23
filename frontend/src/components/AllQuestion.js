import React from 'react';
import './AllQuestion.css';
import { Link } from 'react-router-dom';

const AllQuestion = ({question}) => {

    return (
        <li>
            <Link to={`/question/${question.question_id}`} key={question.question_id} style={{textDecoration:'none'}}>
                <div className="question-item" value={question.question_id}>
                    <h3 className="question-title">{question.question_title}</h3>
                    <p className="question-content"><pre>{question.question}</pre></p>
                    <div className="meta">
                    <span className="user">Posted by: {question.posted_by}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default AllQuestion;


