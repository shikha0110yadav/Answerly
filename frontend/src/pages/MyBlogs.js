import React from "react";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useLoaderData } from "react-router-dom";
import MyBlogItem from "../components/MyBlogItem";

const MyBlogs = () => {

    const blogs = useLoaderData();

    return(
        <>
            <Navbar />
            <div className='profile-container' style={{ marginTop:'0vh', zIndex: 1, backgroundColor: 'white' }}>
                <ProfileSidebar />
                <div className="header_and_content" Style="width:100%;">
                    <ProfileHeader />
                    {blogs && blogs.length > 0 &&
                    <>
                    <h2>Your Blogs</h2>
                    <br></br>
                    <ul>
                        {blogs.map((blog) => (<MyBlogItem blog={blog}/>))}
                    </ul>
                    </>}
                    {blogs && blogs.length == 0 && <h3>No Viva Experience Shared</h3>}
                </div>
            </div>
        </>
    )
}

const fetchmyblogs = async() => {
    const id = localStorage.getItem("user_id");
    const response = await fetch('/profile/myblog?user_id=' + id);
    console.log("Hi");
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export {
    MyBlogs,
    fetchmyblogs
} 