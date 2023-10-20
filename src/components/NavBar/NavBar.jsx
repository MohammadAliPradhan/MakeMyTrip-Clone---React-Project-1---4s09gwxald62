import React from 'react'
import "./NavBar.css"
import { Outlet, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import bag from "../../assets/images/bag.png"
import discount from "../../assets/images/discount.jpeg"
import Mui from "./Mui"
import { Link } from 'react-router-dom'



function NavBar() {

    const navigate = useNavigate();
    return (
        <>
            <nav className='navParent'>
                <div className='logoleft'>
                    <Link to="/" ><img className="logoleft" src={logo} alt="log" /></Link>
                    <img src={discount} alt="discount" />
                </div>
                <div className='navmiddle'>
                    <img src={bag} alt="bag" />
                </div>
                <div className='navright'>
                    <Mui />
                </div>
            </nav>
            <Outlet />
        </>

    )
}

export default NavBar
