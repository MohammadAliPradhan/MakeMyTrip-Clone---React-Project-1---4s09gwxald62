import React, { useContext, useState } from 'react';
import './ProfilePage.css';
import { AuthContext } from '../components/App';
import ScrollNavBar from '../ScrollNavBar/ScrollNavBar';

const ProfilePage = () => {

    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext);


    const fullName = JSON.parse(sessionStorage.getItem("userName"));




    return (
        <>
            <ScrollNavBar />
            <div className='parent-profile-container'>
                <div className="profile-container">
                    <div className="profile-name">{isLoggedin ? fullName : "You are not logged In"}</div>
                    <div className="friendly-message">{isLoggedin ? "Your presence brightens my day!" : null}</div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
