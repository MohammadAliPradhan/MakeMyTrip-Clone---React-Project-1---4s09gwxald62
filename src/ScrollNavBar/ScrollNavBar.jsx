import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png'
import discount from '../assets/images/discount.jpeg'
import bag from '../assets/images/bag.png'
import { Link } from 'react-router-dom';
import SignUp from '../components/Authenticaltion/SignUp/SignUp';
import Login from '../components/Authenticaltion/Login/Login';
import "./scrollbar.css"


function ScrollNavBar() {
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        // Add scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollTop = window.scrollY;

        // Determine if the user is scrolling down or up
        if (currentScrollTop > lastScrollTop) {
            setIsScrolling(true); // Scrolling down
        } else {
            setIsScrolling(false); // Scrolling up
        }

        setLastScrollTop(currentScrollTop);
    };

    return (
        <div className={`navbar ${isScrolling ? 'hidden' : ''}`}>
            <nav id='parentContainerNav'>
                <div className='navpadding'>
                    <div className='logoleft'>
                        <Link to="/" ><img className="logoleft" src={logo} alt="log" /></Link>
                        <img src={discount} alt="discount" />
                    </div>
                    <div className='navmiddle'>
                        <img src={bag} alt="bag" />
                    </div>
                    {/* {!isLoggedin && <div id='authenticate-au' onClick={handleOnClick}><p>Signup</p></div>}
                    {isLoggedin && <div id='authenticate-au'><p onClick={handleLogOut}>Logout</p></div>}
                    {isLoggedin && <div id="authenticate-auser"><li className='userName-css'>{userName}</li></div>} */}
                    {/* <div className='navright'>
                        {/*  */}



                    <SignUp />
                    <Login />
                </div>

            </nav >

        </div >
    );
}

export default ScrollNavBar;
