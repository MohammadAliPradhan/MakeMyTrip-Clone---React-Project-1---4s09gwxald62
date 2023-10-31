import React, { useContext } from 'react'
import "./NavBar.css"
import { Outlet, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import bag from "../../assets/images/bag.png"
import discount from "../../assets/images/discount.jpeg"
import Mui from "./Mui"
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import SignupButton from './SignupButton'
import LoginButton from "./LoginButton"
import Login from '../Authenticaltion/Login/Login'


function NavBar() {
    const { isLoggedin } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log(isLoggedin);
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
                    </div>
                    <div>
                        <LoginButton />
                    </div>
                </div>

            </nav>
            <Outlet />
        </>

    )
}

export default NavBar
