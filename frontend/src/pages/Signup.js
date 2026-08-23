import { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [details, setDetails] = useState({
        user_name : "",
        Name : "",
        email : "", 
        password : ""
    })
    var msg;
    const navigate = useNavigate();
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
            msg = json.error;
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
            navigate('/login', { replace: true });
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
        <div className='signup'>
            <h1>SignUp Form</h1>
            <form onSubmit={submitHandler}>
                Enter Your Username : 
                <input type="text" value={details.user_name} onChange={handleusername} />
                <br />
                Enter Your Name : 
                <input type="text" onChange={handlename} value={details.Name} />
                <br />
                Enter Your Email-ID : 
                <input type="email" onChange={handleemail} value={details.email} />
                <br />
                Enter Your Password : 
                <input type="password" onChange={handlepassword} value={details.password} />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Signup;