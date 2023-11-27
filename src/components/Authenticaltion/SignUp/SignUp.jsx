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

    console.log("erroro", message);


    return createPortal(


        buttonState &&

        < div className='parentSignup' onClick={handleOverlayClick}>


            <form action="" className='formContainer' onSubmit={handleSubmit}>

                <div className="close-button" onClick={handleCloseModal}>
                    <span>X</span>
                </div>

                <div className='image-surface-none'><img src="https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionValley.webp" alt="" className='authImg' /></div>
                <div className='form-container-everythimg'>
                    <div className='input-data-signup'>
                        <label htmlFor="fullname">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            ref={nameRef}
                        />


                    </div>

                    <div className='input-data-signup'>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                        />

                    </div>

                    <div className='input-data-signup'>
                        <label htmlFor="password">Password:</label>
                        <input type="password"
                            name="password"
                            id="password"

                            ref={passwordRef}
                        />
                    </div>
                    <input type="submit" value="signup" id='AlreadyaUser' />
                    {message === "success" ? <span className='user-already-exists'>Hurray Signed In</span> : null}
                    {message === "User already exists" ? <span className='user-already-exists'>User Already Exist</span> : null}
                    {message === "Invalid input data. Please provide a valid email" ? <span className='user-already-exists'>Invalid Input Data</span> : null}

                    {message === undefined ? <span className='user-already-exists'>Enter Credentials</span> : null}
                    {/* <LoginButton /> */}

                    <div className='buttonRelatedStuff'>
                        <h6>Already a user</h6>
                        <button onClick={clickthis} id='AlreadyaUser'><span>Login</span> </button>
                    </div>

                </div>




            </form>

        </div >,

        document.querySelector(".myPortalDiv")

    )
}

export default SignUp
