import React, { useContext, useState } from 'react'
import "./NavBar.css"
import { Outlet, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import bag from "../../assets/images/bag.png"
import discount from "../../assets/images/discount.jpeg"
import { Link } from 'react-router-dom'
import { AuthContext, LoginButtonContext, ButtonContext } from '../App'
import Login from '../Authenticaltion/Login/Login'
import SignUp from '../Authenticaltion/SignUp/SignUp'
import { useScrollTrigger } from '@mui/material'
import mmtnavbar from "../../assets/images/mmtnavbar.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'




function NavBar() {
    const { setIsLoggedIn, isLoggedin } = useContext(AuthContext);
    const [modalProfile, setmodalProfile] = useState(false);
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
        setmodalProfile(false);
    }

    function handleOnClick() {
        setButtonState(!buttonState)
    }


    function handleNavigateProfile() {
        // navigate("./profilePageA")
        setmodalProfile(!modalProfile);
    }
    return (
        <>
            <div className='parent-div'>


                <div className='child-1'>

                    {/* child nested 1 */}
                    <div className='for-logo' onClick={() => navigate('/')}>
                        <img className='mmt-logo' src={mmtnavbar} alt="" />
                        {/* <p>Image will be here</p> */}
                    </div>

                    {/* child nested 2 */}
                    <div className='for-other-remainining-items'>
                        <ul className='navbar-ul-lists'>
                            <li className='super-offers-div'>
                                <span className='navbar-span-parent'>
                                    <span className='navbar-span-child1'>%</span>
                                    <span className='navbar-span-child2 chImage'></span>
                                </span>
                                <div>
                                    <p className='super-offer-p'>Super Offer</p>
                                    <p className='great-deals-p'>Explore great deals & offers </p>
                                </div>
                            </li>
                            <li className='introducing-mybiz'>
                                <span className='myBizIcon landingSprite'></span>
                                <div className='intro-mybiz-childone'>
                                    <p className='intro-mybiz-text'>Introducing myBiz</p>
                                    <p className='intro-mybiz-texttwo'>Business Travel Solution</p>
                                </div>
                            </li>
                            <li className='mytrips-parent' onClick={() => { }}>
                                <span className='my-trip-icon'></span>
                                <div onClick={() => { navigate(`./mytrips`) }} className="intro-mytrip-childone">
                                    <p className='my-trips-child1'>My Trips</p>
                                    <p className='my-trips-child2'>Manage your bookings</p>
                                </div>
                            </li>
                            <li className='button-container-parent'>

                                {
                                    isLoggedin === false ?
                                        <div onClick={handleOnClick} className='button-parent'>
                                            <span className='myIconLogin'></span>
                                            <span style={{ fontSize: "10px", fontWeight: "600" }}>Login or Create Account</span>
                                            <span style={{ marginLeft: "41px" }}><FontAwesomeIcon icon={faCaretDown} size="sm" style={{ color: "#63E6BE", }} />
                                            </span>
                                        </div> :
                                        <div onClick={() => setmodalProfile(!modalProfile)} className='button-parent-loggedin'>
                                            <span className='right-side-span-home'>
                                                <span>{userName.trim().slice(0, 1)}</span>
                                            </span>
                                            <span style={{ fontSize: "10px", fontWeight: "600" }}>Hi  {userName}</span>
                                            <span><FontAwesomeIcon icon={faCaretDown} size="sm" style={{ color: "#63E6BE", }} />
                                            </span>

                                            {modalProfile &&
                                                <div className='open-modal-a'>

                                                    <p className='paragraph-css-menu-home'>you are viewing your personal profile {isLoggedin ? userName.toLowerCase() : null}</p>
                                                    <div className='child-class-basket'>
                                                        <div onClick={() => { navigate(`./profilePageA`) }} className='faker-a'>
                                                            <span className='icon-menu-a userItemMyProfile'>
                                                            </span>
                                                            <p >Profile</p>
                                                        </div>


                                                        <div onClick={handleLogOut} className='faker-b'>
                                                            <span style={{ color: "red" }}><FontAwesomeIcon icon={faRightFromBracket} /></span>

                                                            <p >Log Out</p>
                                                        </div>
                                                    </div>


                                                </div>
                                            }
                                        </div>
                                }
                            </li>
                        </ul>
                    </div>

                    <div className='authNavBar'>
                        {
                            isLoggedin === false ?
                                <div onClick={handleOnClick}>
                                    <span >Login/Signup</span>
                                </div>
                                :
                                <>
                                    <span onClick={(e) => {
                                        setmodalProfile(!modalProfile);
                                        e.stopPropagation();
                                    }}>{userName}</span>
                                    {modalProfile &&
                                        <div className='open-modal-a'>
                                            <p onClick={() => { navigate(`./profilePageA`) }}>Profile</p>
                                            <p onClick={() => { navigate(`./mytrips`) }}>My Trips</p>
                                            <p onClick={handleLogOut}>Log Out</p>

                                        </div>
                                    }
                                </>
                        }
                    </div>

                </div>
            </div>
            <Login />
            <SignUp />

            <Outlet />

        </>

    )
}

export default NavBar
