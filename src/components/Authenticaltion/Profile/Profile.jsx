import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./profile.css";
import { AuthContext } from '../../App';

function Profile() {
    const storedUser = JSON.parse(sessionStorage.getItem("loggedInuser"));
    const navigate = useNavigate();
    const {setIsLoggedIn,isLoggedIn} = useContext(AuthContext)

    function logout() {
        sessionStorage.removeItem("loggedInuser");
        navigate("/login");
        setIsLoggedIn(false)
    }
    
    if(!isLoggedIn){
        navigate("/login")
    }

    if (storedUser) {
        const { email, name, role } = storedUser;
        return (
            <section>
                <h3>Profile Info</h3>
                <p>Email: {email}</p>
                <p>Full Name: {name}</p>
                <p>Role: {role}</p>
                <button onClick={logout}>Logout</button>
            </section>
        );
    } else {
        return <p>Not a user</p>;
    }
}

export default Profile;
