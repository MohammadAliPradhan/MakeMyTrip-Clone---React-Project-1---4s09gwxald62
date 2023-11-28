import React, { useContext } from 'react'
import "./NavBar.css"
import { Outlet, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import bag from "../../assets/images/bag.png"
import discount from "../../assets/images/discount.jpeg"
import { Link } from 'react-router-dom'
import { AuthContext, LoginButtonContext, ButtonContext } from '../App'
import Login from '../Authenticaltion/Login/Login'
import SignUp from '../Authenticaltion/SignUp/SignUp'


function NavBar() {
    const { setIsLoggedIn, isLoggedin } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log(isLoggedin);

    const { loginButton, setLoginButton } = useContext(LoginButtonContext)
    const { buttonState, setButtonState } = useContext(ButtonContext)
    const userName = JSON.parse(sessionStorage.getItem("userName"))

    console.log(loginButton, "this is");
    function handleLoginButton() {
        setLoginButton(true)
    }

    function handleLogOut() {
        sessionStorage.removeItem("userToken")
        sessionStorage.removeItem("user")
        setIsLoggedIn(false)
    }

    function handleOnClick() {
        setButtonState(!buttonState)
    }
    return (
        <>
            <nav className='navParent'>
                <div className='navpadding'>
                    <div className='logoleft'>
                        <Link to="/" ><img className="logoleft" src={logo} alt="log" /></Link>
                        <img className='discount-bag-a' src={discount} alt="discount" />
                    </div>
                    <div className='navmiddle'>
                        <img src={bag} alt="bag" />
                    </div>

                    <div className='navright'>
                        {!isLoggedin && <div id='authenticate-au' onClick={handleOnClick}><span>Login or</span>
                            <span>Create Account</span></div>}
                        {isLoggedin && <div id='authenticate-au' data-bs-toggle="modal" data-bs-target="#loginModal2"><p onClick={handleLogOut}>Logout</p></div>}
                        {isLoggedin && <div id="authenticate-auser"><li className='userName-css'>{userName}</li></div>}
                    </div>


                    <SignUp />
                    <Login />
                </div>

            </nav>
            <Outlet />
        </>

    )
}

export default NavBar
