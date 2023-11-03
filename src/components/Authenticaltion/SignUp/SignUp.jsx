import React, { useContext, useRef, useState } from 'react'
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

            if (token) {
                sessionStorage.setItem("userToken", token)
                sessionStorage.setItem("user", JSON.stringify(res.data.data.user))
                setButtonState(false)

            }

        } catch (err) {
            console.log(err);
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


    return createPortal(


        buttonState &&

        < div className='parentSignup' onClick={handleOverlayClick}>


            <form action="" className='formContainer' onSubmit={handleSubmit}>
                <div className="close-button" onClick={handleCloseModal}>
                    <span>X</span>
                </div>

                <div>
                    <label htmlFor="fullname">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        ref={nameRef}
                    />


                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        ref={emailRef}
                    />

                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        name="password"
                        id="password"
                        ref={passwordRef}
                    />
                </div>

                <input type="submit" value="signup" />

                {/* <LoginButton /> */}
                <br />
                <br />
                <button onClick={clickthis}>Click this</button>



            </form>

        </div >,

        document.querySelector(".myPortalDiv")

    )
}

export default SignUp
