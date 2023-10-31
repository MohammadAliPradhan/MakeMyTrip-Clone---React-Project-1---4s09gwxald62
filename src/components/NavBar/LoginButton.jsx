import React, { Children, useState } from 'react'
import { createContext } from 'react'
import SignUp from '../Authenticaltion/SignUp/SignUp';
import "./NavBar.css"
import Login from '../Authenticaltion/Login/Login';


export const LoginButtonContext = createContext();
export default function SignupButton() {
    const [LoginState, SetLoginState] = useState()
    function handleOnClick() {
        SetLoginState(!buttonState)
    }
    console.log(LoginState);
    return (
        <LoginButtonContext.Provider value={{ LoginState, SetLoginState }}>
            <div>
                <button onClick={handleOnClick} className='buttonSignupParent'>SignUp</button>
                <Login />
            </div>
        </LoginButtonContext.Provider>
    )
}
