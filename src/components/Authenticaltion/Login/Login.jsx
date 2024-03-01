
import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Login.css"
import { Navigate, Route, Routes, json, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext, ButtonContext, LoginButtonContext, TraceHistory } from '../../App';
import axios from 'axios';
import { getHeaderWithProjectId } from '../utils/service';




function Login() {
    const navigate = useNavigate();



    const { loginButton, setLoginButton } = useContext(LoginButtonContext);
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext);
    const [message, setMessage] = useState(false);
    const { historyy, setHistoryy } = useContext(TraceHistory);
    const { buttonState, setButtonState } = useContext(ButtonContext);



    //Here we are maintaining refs
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    console.log(historyy);

    //creation of an api
    async function LoginUser(user) {
        const config = getHeaderWithProjectId()
        try {
            const res = await axios.post("https://academics.newtonschool.co/api/v1/bookingportals/login",
                { ...user, appType: "bookingportals" },
                config)
            console.log("res", res);
            const token = res.data.token;

            if (token) {
                sessionStorage.setItem("userToken", JSON.stringify(token))
                sessionStorage.setItem("userName", JSON.stringify(res.data.data.name))
                //This one is loginState coming from auth so carefull ali
                setIsLoggedIn(true)
                setLoginButton(false);
            }

        } catch (err) {
            console.log(err);
            err.response.data.message === "Incorrect EmailId or Password" ? setMessage(true) : setMessage(false);
        }
    }
    console.log(historyy)


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);






    // This part we are getting it from the user through form
    function handleSubmit(e) {
        e.preventDefault();
        const userDetails = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        LoginUser(userDetails)
    }
    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            setLoginButton(false);
            setMessage(false);

        }
    }

    function handleCloseModal() {
        setLoginButton(false);
        setMessage(false)
    }

    function clickthis() {
        setLoginButton(false)
        setButtonState(true)
    }


    return createPortal(

        loginButton &&

        <div className='parentSignup' onClick={handleOverlayClick}>
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

                        {message && <span style={{ color: "red", fontSize: "10px", fontWeight: "500" }}>Incorrect Email Or Password</span>}

                        <input onClick={handleSubmit} className='loginBtn' type="submit" value='Continue' />

                        <p>
                            Not a user?
                            <span style={{ color: "#3c3cf6", cursor: "pointer" }} onClick={clickthis}> Click here to sign up</span>
                        </p>
                    </form>
                </div>
            </div>
        </div >,

        document.querySelector(".myPortalDivTwo")

    )
}

export default Login

