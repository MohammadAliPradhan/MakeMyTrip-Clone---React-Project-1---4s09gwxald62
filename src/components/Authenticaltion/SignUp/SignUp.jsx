import React, { useContext, useEffect, useRef, useState } from 'react'
import "./SignUp.css"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import Login from '../Login/Login';
import { AuthContext, LoginButtonContext, ButtonContext } from '../../App';
import axios from 'axios';
import { getHeaderWithProjectId } from '../utils/service';

function SignUp() {
    const navigate = useNavigate();
    const { buttonState, setButtonState } = useContext(ButtonContext)
    const { loginButton, setLoginButton } = useContext(LoginButtonContext)
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)
    const [message, setMessage] = useState()

    //Here we are maintaining refs
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    //creation of an api
    async function createUser(user) {
        const config = getHeaderWithProjectId()
        try {
            const res = await axios.post("https://academics.newtonschool.co/api/v1/bookingportals/signup",
                { ...user, appType: "bookingportals" },
                config)
            console.log("res", res);
            const token = res.data.token;
            setMessage(res.data.data.status)

            if (token) {
                setButtonState(false)
                setLoginButton(true)
            }

        } catch (err) {
            console.log("err", err);
            setMessage(err.response.data.message)

        }
    }

    // This part we are getting it from the user through form
    function handleSubmit(e) {
        e.preventDefault();
        const userDetails = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        createUser(userDetails)
    }
    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            setButtonState(false);
        }
    }

    function handleCloseModal() {
        setButtonState(false);
    }

    function clickthis() {
        setButtonState(!buttonState)
        setLoginButton(true)
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(false)
            }, 5000)
        }
        return () => clearTimeout(message);   // This is a cleanup function 
    }, [message])

    console.log("erroro", message);


    return createPortal(


        buttonState &&

        < div className='parentSignup' onClick={handleOverlayClick}>


            <div className='login-modal'>
                <div className="carousel-image-container">
                    <picture className='carouser-picture'>
                        <img src="https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionRoad.webp" alt="" className='carouser-image' />
                        <div className='carouser-text'>Made By Mohammad Ali</div>
                    </picture>
                </div>
                <div className="login-form-container">
                    <div className="login-account-type">
                        <span className='span-text-personal'>PERSONAL ACCOUNT</span>
                        <span className='span-text-business' title='currently disabled'>
                            MYBIZ ACCOUNT
                        </span>
                    </div>
                    <form className='login-account-form' action="">

                        <label style={{ color: "#676565", fontWeight: "500" }} htmlFor="">Email</label>
                        <input
                            className='user-details-login'
                            ref={nameRef}
                            type="text"
                            name='fullName'
                            id='fullName'
                            placeholder='Enter Name' />

                        <label style={{ color: "#676565", fontWeight: "500" }} htmlFor="">Email</label>
                        <input
                            className='user-details-login'
                            ref={emailRef}
                            type="email"
                            name='email'
                            id='email'
                            placeholder='Enter email' />

                        <label style={{ color: "#676565", fontWeight: "500" }} htmlFor="">Password</label>
                        <input
                            className='user-details-login'
                            ref={passwordRef}
                            type="password"
                            name='password'
                            id='password'
                            placeholder='Password' />

                        {message && <span style={{ color: "red", fontSize: "10px", fontWeight: "500" }}>{message}</span>}

                        <input onClick={handleSubmit} className='loginBtn' type="submit" value='Continue' />

                        <p>
                            Already a user?
                            <span style={{ color: "#3c3cf6", cursor: "pointer" }} onClick={clickthis}> Click here to log in</span>
                        </p>
                    </form>
                </div>
            </div>

        </div >,

        document.querySelector(".myPortalDiv")

    )
}

export default SignUp
