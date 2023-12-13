
import React, { useContext, useRef, useState } from 'react'
import "./Login.css"
import { Navigate, Route, Routes, json, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext, LoginButtonContext, TraceHistory } from '../../App';
import axios from 'axios';
import { getHeaderWithProjectId } from '../utils/service';




function Login() {
    const navigate = useNavigate();

    const { loginButton, setLoginButton } = useContext(LoginButtonContext)
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)
    const [message, setMessage] = useState(false);
    const { historyy, setHistoryy } = useContext(TraceHistory);




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
        setLoginButton(!loginButton)
        setLoginButton(true)
    }


    return createPortal(

        loginButton &&

        < div className='parentSignup' onClick={handleOverlayClick}>


            {/* <Outlet /> */}

            <form action="" className='formContainer' onSubmit={handleSubmit}>
                <div className="close-button" onClick={handleCloseModal}>
                    <span>X</span>
                </div>
                <div className="image-surface-none"><img src="https://imgak.mmtcdn.com/pwa_v3/pwa_header_assets/loginPersuassionValley.webp" alt="" className='authImg' /></div>

                <div className='form-container-everythimg'>
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

                    <input type="submit" value="Login" id='AlreadyaUser' />

                    {message && <div className='incorrectUserName' >
                        <span className='incorrect-userName-sp'>Incorrect UserName or Password</span>
                    </div>}



                    {/* <LoginButton /> */}

                </div>




            </form>

        </div >,

        document.querySelector(".myPortalDivTwo")

    )
}

export default Login

