import React from "react";
import './User.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

var users;

const User = () => {

    const [isLoading, setisLoading] = useState(true);
    
    useEffect(() => {
      const fetchdata = async() => {
        const response = await fetch('/top-user');
        console.log(response);
        const json = await response.json();
        users = json;
        console.log(users);
        setTimeout(async function(){
          setisLoading(false);
        }, 1000)
      }
      fetchdata();
    }, []);  
  if(isLoading){
    return (
      <>
      <Navbar />
      <div className="user-table-container">
          <section className="">
            <h2>Top Users</h2>
            <ul>
                <p>Loading....</p>
            </ul>
          </section>
      </div>
      <Footer />
      </>
    );
  }
  else{
    return (
      <>
      <Navbar />
      <div className="user-table-container">
        <h1>Top Users</h1>
          <table className="user-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      <Footer />
      </>
    );
  }

        // return (
        // <div className="user-table-container">
        //   <table className="user-table">
        //     <thead>
        //       <tr>
        //         <th>Sr.No</th>
        //         <th>Name</th>
        //         <th>Rating</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {users.map((user, index) => (
        //         <tr key={user.id}>
        //           <td>{index + 1}</td>
        //           <td>{user.name}</td>
        //           <td>{user.rating}</td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        // )
}

export default User;