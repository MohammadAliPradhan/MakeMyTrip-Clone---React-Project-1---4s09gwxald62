import React, { useState, useEffect, useContext } from 'react';
import ScrollLogo from '../assets/images/logo@2x.png'
import discount from '../assets/images/discount.jpeg'
import bag from '../assets/images/bag.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SignUp from '../components/Authenticaltion/SignUp/SignUp';
import Login from '../components/Authenticaltion/Login/Login';
import "./scrollbar.css"
import { AuthContext, ButtonContext } from '../components/App';

import { MdArrowDropDown } from "react-icons/md";
import { Icon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';




function ScrollNavBar() {

    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)
    const { setButtonState } = useContext(ButtonContext)
    const [modalProfile, setmodalProfile] = useState(false);

    console.log(isLoggedin);
    const userName = JSON.parse(sessionStorage.getItem("userName"))
    const navigate = useNavigate();
    console.log(navigate);



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
        sessionStorage.removeItem("userToken")
        sessionStorage.removeItem("user")
        setIsLoggedIn(false)
        setmodalProfile(false);
    }

    function handleNavigateProfile() {
        // navigate("./profilePageA")
        setmodalProfile(!modalProfile);
    }




    return (
        <>
            <div className={`navbar ${isScrolling ? 'hidden' : ''}`}>
                <div className='parent-container-navbar'>

                    <div className='child1-container-navbar'>
                        <span className='logo-container'>

                            <NavLink to="/" className='logo-navlink'>
                                <img src={ScrollLogo} alt="navlogo" />
                            </NavLink>

                        </span>

                        <nav className='nav-flex-container'>
                            <ul className='unorder-nav-flex'>
                                <li className='nav-list-ai'>
                                    <span className='item-wrapper'>
                                        <NavLink to='/' className='nav-link-nav'>
                                            <span className='headerIconWrapper'></span>
                                            <span className='headerIconTextAllignment'>Flights</span>
                                        </NavLink>
                                    </span>
                                </li>
                                <li className='nav-list-ai'>
                                    <span className='item-wrapper'>
                                        <NavLink to='/hotel' className='nav-link-nav'>
                                            <span className='headerIconWrapper chHotels'></span>
                                            <span className='headerIconTextAllignment '>Hotels</span>
                                        </NavLink>
                                    </span>
                                </li>
                                <li className='nav-list-ai'>
                                    <span className='item-wrapper'>
                                        <NavLink to='/allotherroute' className='nav-link-nav'>
                                            <span className='headerIconWrapper chHomestays'></span>
                                            <span className='headerIconTextAllignment'>Home Stays</span>
                                        </NavLink>
                                    </span>
                                </li>
                                <li className='nav-list-ai'>
                                    <span className='item-wrapper'>
                                        <NavLink to='/allotherroute' className='nav-link-nav'>
                                            <span className='headerIconWrapper chHolidays'></span>
                                            <span className='headerIconTextAllignment'>Holiday Packages</span>
                                        </NavLink>
                                    </span>
                                </li>
                                <li className='nav-list-ai'>
                                    <span className='item-wrapper'>
                                        <NavLink to='/train' className='nav-link-nav'>
                                            <span className='headerIconWrapper chTrains'></span>
                                            <span className='headerIconTextAllignment'>Trains</span>
                                        </NavLink>
                                    </span>
                                </li>
                                <li className='nav-list-ai'>
                                    <span className='item-wrapper'>
                                        <NavLink to='/allotherroute' className='nav-link-nav'>
                                            <span className='headerIconWrapper chCabs'></span>
                                            <span className='headerIconTextAllignment'>Cabs</span>
                                        </NavLink>
                                    </span>
                                </li>
                            </ul>
                        </nav>

                        <ul className='right-side'>
                            {isLoggedin ? <li className='right-side-li'>
                                <div onClick={handleNavigateProfile} className='right-side-li-div'>
                                    <span className='right-side-span'>
                                        <span>T</span>
                                    </span>

                                    <div>
                                        <div className='div-nav-nav-open'>
                                            <span className='login-box-thesis'>Hi Travellers</span>
                                            <FontAwesomeIcon icon={faCaretDown} size="sm" style={{ color: "#63E6BE", }} />


                                        </div>
                                    </div>

                                </div>

                                {modalProfile && <div className='modalRightSide-menu'>
                                    <p className='paragraph-css-menu'>you are viewing your personal profile {isLoggedin ? userName.toLowerCase() : null}</p>
                                    <NavLink to='.././profilePageA' className='menu-child--scroll-1'>
                                        <span className='icon-menu-a userItemMyProfile'>
                                        </span>

                                        <div className='menu-content-nav'>
                                            <p className='latoBold'>My Profile</p>
                                            <p className='p-class-second-child-menu'>Manage your profile, traveller details, login details and password</p>
                                        </div>
                                    </NavLink>

                                    <NavLink to='.././mytrips' className='menu-child--scroll-1'>
                                        <span className='icon-menu-a userItemMyTrips'>
                                        </span>

                                        <div className='menu-content-nav'>
                                            <p className='latoBold'>My Trips</p>
                                            <p className='p-class-second-child-menu'>Manage your profile, traveller details, login details and password</p>
                                        </div>
                                    </NavLink>



                                    <div onClick={handleLogout} className='menu-child--scroll-1'>
                                        <span className='menu-child-3-span'>
                                            <FontAwesomeIcon icon={faRightFromBracket} />
                                        </span>

                                        <div className='menu-content-nav'>
                                            <p className='Logout'>Log Out</p>
                                        </div>
                                    </div>

                                </div>}
                            </li> :

                                <li onClick={() => setButtonState(true)} className='parent-login-scroll-container'>
                                    <div className='child1-div-login-scroll-container'>
                                        <span className='child2-img-scroll-container'>
                                            <span>my</span>
                                        </span>

                                        <div className='child3-div-scoll'>
                                            <div className='child4-div-scroll-a'>
                                                <span className='child4-div-scroll-b'>Login or</span>
                                                <span className='child4-div-scroll-b'> Create Account</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            </div>

            <SignUp />
            <Login />
        </>
    );
}

export default ScrollNavBar;