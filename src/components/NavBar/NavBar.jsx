import React, { useContext } from 'react'
import "./NavBar.css"
import { Outlet, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import bag from "../../assets/images/bag.png"
import discount from "../../assets/images/discount.jpeg"
import Mui from "./Mui"
import { Link } from 'react-router-dom'
import { AuthContext, LoginButtonContext } from '../App'
import SignupButton from './SignupButton'
import Login from '../Authenticaltion/Login/Login'


function NavBar() {
    const { setIsLoggedIn, isLoggedin } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log(isLoggedin);

    const { loginButton, setLoginButton } = useContext(LoginButtonContext)
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
    return (
        <>
            <nav className='navParent'>
                <div className='navpadding'>
                    <div className='logoleft'>
                        <Link to="/" ><img className="logoleft" src={logo} alt="log" /></Link>
                        <img src={discount} alt="discount" />
                    </div>
                    <div className='navmiddle'>
                        <img src={bag} alt="bag" />
                    </div>
                    {/* <div className='navright'>
                        {!isLoggedin && (
                            <Mui />)}
                    </div> */}
                    <div className='navright'>
                        {!isLoggedin && (
                            <SignupButton />)}
                        {isLoggedin && <li>{userName}</li>}
                        {isLoggedin && <button onClick={handleLogOut}>Logout</button>}
                    </div>



                    <Login />
                </div>

            </nav>
            <Outlet />
        </>

    )
}

export default NavBar
