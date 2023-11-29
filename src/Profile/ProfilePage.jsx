import React, { useState } from 'react';
import './ProfilePage.css';
import { AuthContext } from '../components/App';
import ScrollNavBar from '../ScrollNavBar/ScrollNavBar';

const ProfilePage = () => {


    const fullName = JSON.parse(sessionStorage.getItem("userName"));




    return (
        <>
            <ScrollNavBar />
            <div className='parent-profile-container'>
                <div className="profile-container">
                    <div className="profile-name">{fullName}</div>
                    <div className="friendly-message">Your presence brightens my day!</div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
