import React from 'react';
import './ProfileSidebar.css';
import { NavLink } from 'react-router-dom'

export default function ProfileSidebar() {
    return (
        <div className='profile_sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option" Style="margin-bottom:5px;">
                        <NavLink className="sideLink" to="/profile/myblogs">Blog</NavLink>
                    </div>
                    <div className="sidebar-option" Style="margin-bottom:5px;">
                        <NavLink className="sideLink" to="/profile/myquestions">Questions</NavLink>
                    </div>
                    <div className="sidebar-option">
                        <NavLink className="sideLink" to="/profile/myanswers">Answers</NavLink>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
