import React, { useState } from 'react'
import "./SignUp.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();



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
        //step1 : check if user list is present
        //Json --->js --->parse
        //js --->json ---> stringify
        const userListJson = localStorage.getItem("userList")
        // logcalStorage.setItem("userList",userList)
        const userList = JSON.parse(userListJson);
        console.log("username", userDetails)
        if(userList){
            //push the data
            userList.push(userDetails)
            localStorage.setItem("userList,", JSON.stringify(userList))
        }else{
            //create the data
            const newUserList  = [userDetails]
            localStorage.setItem("userList", JSON.stringify(newUserList))
        }

        navigate("/login")
        

        
    }


    return (
        <>
        <form action="" className='formContainer' onSubmit={handleSubmit}>

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



        </form>
        </>
    )
}

export default SignUp
