import React, { useState } from 'react';
import './MyAnswerItem.css';
import EachAnswerItem from './EachAnswerItem';
const MyQuestionItem = ({ question }) => {
  return (
    <>{question.answer.map((answer) => <EachAnswerItem answer={answer} question={question} key={answer.answer_id} />)}</>
  );
};
export default MyQuestionItem;