import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/images/logo.png'
import discount from '../assets/images/discount.jpeg'
import bag from '../assets/images/bag.png'
import { Link, useNavigate } from 'react-router-dom';
import SignUp from '../components/Authenticaltion/SignUp/SignUp';
import Login from '../components/Authenticaltion/Login/Login';
import "./scrollbar.css"
import { AuthContext, ButtonContext } from '../components/App';



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
        <div className={`navbar ${isScrolling ? 'hidden' : ''}`}>
            <nav id='parentContainerNav'>
                <div className='navpadding'>
                    <div className='logoleft'>
                        <Link to="/" ><img className="logoleft" src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/logo@2x.png" alt="log" /></Link>
                        <img className='discount-bag-a' src={discount} alt="discount" />
                    </div>
                    <div className='navmiddle'>
                        <img src={bag} alt="bag" />
                    </div>

                    <div className='auth-scroll-nav'>
                        {!isLoggedin && < li className='login-scrollnav' onClick={handleToggle}>Login Or SignUp</li>}
                        {isLoggedin && <li className='login-scrollnav' onClick={handleLogout}>Log Out</li>}
                        {isLoggedin && <li className='name-scroll-nav' onClick={handleNavigateProfile}>{userName}</li>}
                    </div>

                    {modalProfile && <div className='profileMytripsB'>
                        <p className='profilepageAA' onClick={() => navigate("../profilePageA")}>Profile</p>
                        <p className='profilepageAA' onClick={() => navigate("../mytrips")}>My Trips</p>
                    </div>}







                    <SignUp />
                    <Login />
                </div>

            </nav >

        </div >
    );
}

export default ScrollNavBar;
