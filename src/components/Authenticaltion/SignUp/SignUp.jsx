import React, { useContext, useState } from 'react'
import "./SignUp.css"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ButtonContext } from '../../NavBar/SignupButton';
import { NavLink } from 'react-router-dom';
import Login from '../Login/Login';
// import { LoginButtonContext } from '../../NavBar/LoginButton.jsx';



function SignUp() {
    const navigate = useNavigate();
    // const { buttonStateLogin, setButtonStateLogin } = useContext(LoginButtonContext)
    const { buttonState, setButtonState } = useContext(ButtonContext)

    const initialUserDate = {
        name: "",
        email: "",
        role: "",
        password: "",
    }



    const [userDetails, setUserDetails] = useState(initialUserDate);
    function handleInputChange(e) {
        const { value, name } = e.target;
        setUserDetails({ ...userDetails, [name]: value })
    }

    function handleSubmit(e) {

        e.preventDefault();
        // //step1 : check if user list is present
        // //Json --->js --->parse
        // //js --->json ---> stringify
        // const userListJson = localStorage.getItem("userList")
        // // logcalStorage.setItem("userList",userList)
        // const userList = JSON.parse(userListJson);
        // console.log("username", userDetails)
        // if(userList){
        //     //push the data
        //     userList.push(userDetails)
        //     localStorage.setItem("userList,", JSON.stringify(userList))
        // }else{
        //     //create the data
        //     const newUserList  = [userDetails]
        //     localStorage.setItem("userList", JSON.stringify(newUserList))
        // }

        // navigate("/login")

        const config = {
            method: "POST",
            body: JSON.stringify({ ...userDetails, appType: "bookingportals" }),
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzQyOGE5YjQxYzZhOTNiYzc4ZTY3OSIsImlhdCI6MTY5ODUzMzI5MiwiZXhwIjoxNzMwMDY5MjkyfQ.rdiGMSks7CufvhO7FRoN8EcYP-P1ajJwl5zbxUFvmGk",
                "Content-Type": "application/json",
                "projectID": "4s09gwxald62"
            }
        }

        fetch("https://academics.newtonschool.co/api/v1/bookingportals/signup", config)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            setButtonState(false);
        }
    }

    function handleCloseModal() {
        setButtonState(false);
    }

    function clickthis() {
        setButtonState(!buttonState)
    }


    return createPortal(


        buttonState &&

        < div className='parentSignup' onClick={handleOverlayClick}>

            {/* <Outlet /> */}

            <form action="" className='formContainer' onSubmit={handleSubmit}>
                <div className="close-button" onClick={handleCloseModal}>
                    <span>X</span>
                </div>

                <div>
                    <label htmlFor="fullname">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        value={userDetails.name.toUpperCase()} />

                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInputChange}
                        value={userDetails.email} />

                </div>

                <div>
                    <label htmlFor="role">Role:</label>
                    <input
                        type="text"
                        name="role"
                        id="role"
                        onChange={handleInputChange}
                        value={userDetails.role} />

                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                        value={userDetails.password} />
                </div>

                <input type="submit" value="signup" />

                {/* <LoginButton /> */}
                <br />
                <br />
                <button onClick={clickthis}>Click this</button>



            </form>

        </div >,

        document.querySelector(".myPortalDiv")

    )
}

export default SignUp
