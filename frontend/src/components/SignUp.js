import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
    const [details, setDetails] = useState({
        user_name : "",
        Name : "",
        email : "", 
        password : ""
    })
    var msg;
    //const navigate = useNavigate();
    const submitHandler = async(e) => {
        e.preventDefault();
        const response = await fetch('/signup', {
            method:'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
            msg = "Please Enter all Details";
            alert(msg);
        }
        else{
            setDetails({
                user_name : "",
                Name : "",
                email : "", 
                password : ""
            })
            msg = json;
            // if(msg !== '' && !(msg instanceof Object)){
            //     msg = "User Registered Successfully"
            // }
            alert(msg);
            //navigate('/login', { replace: true });
        }
    }

    const handleusername = (e) => {
        setDetails((prevState) =>  ({...prevState, user_name:e.target.value}))
    }
    
    const handlename = (e) => {
        setDetails((prevState) =>  ({...prevState, Name:e.target.value}))
    }

    const handleemail = (e) => {
        setDetails((prevState) =>  ({...prevState, email:e.target.value}))
    }

    const handlepassword = (e) => {
        setDetails((prevState) =>  ({...prevState, password:e.target.value}))
    }

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={submitHandler}>
        <h1>Create Account</h1>
        {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        {/* <span>or use your email for registration</span> */}
        <input
          type="text"
          name="username"
          value={details.user_name}
          onChange={handleusername}
          placeholder="User Name"
        />
        <input
          type="text"
          name="name"
          value={details.Name}
          onChange={handlename}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={details.email}
          onChange={handleemail}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={details.password}
          onChange={handlepassword}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;