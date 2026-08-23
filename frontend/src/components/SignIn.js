import React from "react";
import { useNavigate} from 'react-router-dom';
import { useState } from "react";

function SignInForm() {
    const [details, setDetails] = useState({
        email : "", 
        password : ""
    })
    //const [isLogin, setisLogin] = useState(false);
    var msg;
    const navigate = useNavigate();
    const submitHandler = async(e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method:'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json();

        if(!response.ok){
            msg = json.error;
            alert(msg);
        }
        else{
            setDetails({
                email : "", 
                password : ""
            })
            msg = json;
            if(msg instanceof Object){
                msg = "Loginned Successfully"
                localStorage.setItem("user", json.name);
                localStorage.setItem('user_id', json.user_id);
                alert(msg);
                navigate('/', { replace: true });
            }
            else{
                alert(msg);
            }
        }  
    }

    const handleemail = (e) => {
        setDetails((prevState) =>  ({...prevState, email:e.target.value}))
    }

    const handlepassword = (e) => {
        setDetails((prevState) =>  ({...prevState, password:e.target.value}))
    }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={submitHandler}>
        <h1>Sign in</h1>
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
        {/* <span>or use your account</span> */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={details.email}
          onChange={handleemail}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={details.password}
          onChange={handlepassword}
        />
        {/* <a href="#">Forgot your password?</a> */}
        <button id="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;