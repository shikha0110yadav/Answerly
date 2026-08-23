import React, { useState } from 'react';
//import './AddBlog.css'; // Import the external CSS file for styling
import './AddBlog.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddBlog = () => {
  // State to store the form data
  const [formData, setFormData] = useState({
    blog_title: '',
    blog: '',
    posted_by : localStorage.getItem('user'),
    posted_by_id : localStorage.getItem('user_id')
  });
  var msg;

  // Handle form input changes
  const handleblogtitle = (e) => {
    setFormData((prevState) =>  ({...prevState, blog_title:e.target.value}))
  }

  const handleblog = (e) => {
      setFormData((prevState) =>  ({...prevState, blog:e.target.value}))
  }
  // Handle form submission
  const handleSubmit = async(event) => {
    event.preventDefault();
    const response = await fetch('/share-viva-experience', {
        method:'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const json = await response.json();
    if(!response.ok){
        msg = json.error;
    }
    else{
        setFormData({
            blog_title: '',
            blog: '',
            posted_by : localStorage.getItem('user'),
            posted_by_id : localStorage.getItem('user_id')
        });
        msg = json;
        if(msg !== ''){
            msg = "Blog has been Added Successfully"
        }
    }
    alert(msg);  
    // console.log('Submitted Data:', formData);
  };

  return (
    <>
    <Navbar />
    <div className="add-blog-page">
      <div className="container blog-form">
        <h2>Add a Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.blog_title}
              onChange={handleblogtitle}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.blog}
              onChange={handleblog}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Submit Blog
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AddBlog;