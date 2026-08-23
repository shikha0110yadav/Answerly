import { useState, createContext } from 'react';
import './Login.css';
import { useNavigate} from 'react-router-dom';

// export const Context = createContext();

const Login = () => {
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
                // alert(msg);
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
        <div className='login'>
            <h1>Login Form</h1> 
            <form onSubmit={submitHandler}>
                Enter Your Email-ID : 
                <input type="email" name="email" onChange={handleemail} value={details.email} />
                <br />
                Enter Your Password : 
                <input type="password" name="password" onChange={handlepassword} value={details.password} />
                <br />
                <button type="submit" id='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;