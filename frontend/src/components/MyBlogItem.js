import React, { useState } from 'react';
import './MyBlogItem.css';
import { Link } from 'react-router-dom';

const MyQuestionItem = ({ blog }) => {
  const [blg, setBlog] = useState(blog);  
  const [isEditing, setEditing] = useState(false);
  const [editBlog, seteditBlog] = useState({
    blog:blg.blog,
    blog_title:blg.blog_title,
    blog_id : blg.blog_id
  })
  //const [editedTitle, setEditedTitle] = useState(question.question_title);
  //const [editedQuestion, setEditedQuestion] = useState(question.question);

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    seteditBlog((prevState) => ({...prevState, blog_title:e.target.value}));
  };

  const handleBlogChange = (e) => {
    seteditBlog((prevState) => ({...prevState, blog:e.target.value}));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Check if at least one field is filled
        const response = await fetch('/edit-viva-experience', {
            method:'POST',
            body: JSON.stringify(editBlog),
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
                msg = "Blog has been Updated Successfully"
            }
        }
        alert(msg);  
        const newData = await fetch('/specific-blog?blog_id=' + blg.blog_id);
        if (!newData.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await newData.json();
        setBlog(data);
  };

  return (
    <li>
      <div className="question-item" value={blg.blog_id}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <label>
              Blog Title:
              <input type="text" value={editBlog.blog_title} onChange={handleTitleChange} />
            </label>
            <label>
              Blog:
              <textarea value={editBlog.blog} onChange={handleBlogChange} />
            </label>
            <button Style="margin-left:0px"type="submit">Save</button>
          </form>
        ) : (
          <>
            <h3 className="question-title">{blg.blog_title}</h3>
            <p className="question-content">{blg.blog}</p>
          </>
        )}
        <button Style="width: 100px;margin-left: 1100px;" onClick={handleToggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
      </div>
    </li>
  );
};

export default MyQuestionItem;
