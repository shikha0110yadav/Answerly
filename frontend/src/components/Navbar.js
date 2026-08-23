// import { Link } from "react-router-dom";

// function Appbar(){
//     return (
//         <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/question">Question</Link>
//           </li>
//           <li>
//             <Link to="/ask-a-question">Ask a Question</Link>
//           </li>
//           <li>
//             <Link to="/viva">Viva</Link>
//           </li>
//           <li>
//             <Link to="/signup">Signup</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         </ul>
//       </nav>
//     );
// }

// export default Appbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  const user = localStorage.getItem('user');
  var isset = false;
  if(user != null){
    isset = true;
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    navigate('/auth', {replace:true});
  }

  const checkLogin = () => {
    if(localStorage.getItem('user') != null){
      navigate('/ask-a-question');
    }
    else{
      alert("Please Login First");
      navigate('/auth', {replace:true});
    }
  }

  const checkLogin2 = () => {
    if(localStorage.getItem('user') != null){
      navigate('/share-viva-experience');
    }
    else{
      alert("Please Login First");
      navigate('/auth', {replace:true});
    }
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/question">Question</Link>
        </li>
        <li>
          <Link onClick={checkLogin}>Ask a Question</Link>
        </li>
        <li>
          <Link to="/viva">Viva</Link>
        </li>
        <li>
          <Link onClick={checkLogin2}>Add Viva Experience</Link>
        </li>
        <li>
          <Link to="/users">User</Link>
        </li>
      </ul>
      {!isset &&
      <ul> 
        {/* <li>
          <Link to="/signup">Signup</Link>
        </li> */}
        <li>
          <Link to="/auth" id='login'>Login/Signup</Link>
        </li>
      </ul>
      }
      {isset &&
      <ul> 
        <li>
          <Link to="/profile" id='profile'>👋 {user},</Link>
        </li>
        <li>
          <Link onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
      }
    </nav>
    
  );
}

export default Navbar;

