import { Button } from '@mui/material'
import React, { Children, useState } from 'react'
import { createContext } from 'react'
import SignUp from '../Authenticaltion/SignUp/SignUp';
import "./NavBar.css"
import Login from '../Authenticaltion/Login/Login';


export const LoginButtonContext = createContext();
function LoginButton() {
    const [buttonStateLogin, setButtonStateLogin] = useState()
    function handleOneClick() {
        setButtonStateLogin(!buttonStateLogin)
    }
    // console.log(buttonState);
    return (
        <LoginButtonContext.Provider value={{ buttonStateLogin, setButtonStateLogin }}>
            <div>
                <button onClick={handleOneClick} className='buttonSignupParent'>LogIn</button>
                <Login />
            </div>
        </LoginButtonContext.Provider>
    )
}
export default LoginButton
