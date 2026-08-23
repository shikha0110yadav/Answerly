import React from 'react'
import './Profile.css';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileHeader from '../components/ProfileHeader';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

const Profile = () => {

    const info = useLoaderData();

    useEffect(() => {
        // Prevent scrolling when the component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []); 

    return (
        <>
             <Navbar />
            <div className='profile-container' style={{ marginTop:'0vh', zIndex: 1, backgroundColor: 'white' }}>
                <ProfileSidebar />
                <div className="header_and_content" style={{ width: '100%' }}>
                    <ProfileHeader />
                    <div className="content-section" style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h2>Your Details</h2>
                        <p><strong>Email ID:</strong> {info[0].email}</p>
                        <p><strong>Rating:</strong> {info[0].rating}</p>
                    </div>
                </div>
            </div>
        </>
        
    )
}

const fetchpersonalinfo = async() => {
    const id = localStorage.getItem("user_id");
    const response = await fetch('/profile/info?user_id=' + id);
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
    Profile,
    fetchpersonalinfo
}