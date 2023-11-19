import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/images/logo.png'
import discount from '../assets/images/discount.jpeg'
import bag from '../assets/images/bag.png'
import { Link } from 'react-router-dom';
import SignUp from '../components/Authenticaltion/SignUp/SignUp';
import Login from '../components/Authenticaltion/Login/Login';
import "./scrollbar.css"
import { AuthContext, ButtonContext } from '../components/App';



function ScrollNavBar() {

    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)
    const { setButtonState } = useContext(ButtonContext)
    console.log(isLoggedin);
    const userName = JSON.parse(sessionStorage.getItem("userName"))



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

        if (currentScrollTop > lastScrollTop) {
            setIsScrolling(true); // Scrolling down
        } else {
            setIsScrolling(false); // Scrolling up
        }

        setLastScrollTop(currentScrollTop);
    };

    function handleToggle() {
        setButtonState(true)


    }

    function handleLogout() {
        setIsLoggedIn(false)
    }




    return (
        <div className={`navbar ${isScrolling ? 'hidden' : ''}`}>
            <nav id='parentContainerNav'>
                <div className='navpadding'>
                    <div className='logoleft'>
                        <Link to="/" ><img className="logoleft" src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="log" /></Link>
                        <img src={discount} alt="discount" />
                    </div>
                    <div className='navmiddle'>
                        <img src={bag} alt="bag" />
                    </div>

                    <div className='auth-scroll-nav'>
                        {!isLoggedin && < li className='login-scrollnav' onClick={handleToggle}>Login Or SignUp</li>}
                        {isLoggedin && <li className='login-scrollnav' onClick={handleLogout}>Log Out</li>}
                        {isLoggedin && <li className='name-scroll-nav'>{userName}</li>}
                    </div>







                    <SignUp />
                    <Login />
                </div>

            </nav >

        </div >
    );
}

export default ScrollNavBar;
