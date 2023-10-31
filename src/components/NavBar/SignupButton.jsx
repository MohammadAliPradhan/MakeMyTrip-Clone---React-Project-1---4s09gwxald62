import { Button } from '@mui/material'
import React, { Children, useState } from 'react'
import { createContext } from 'react'
import SignUp from '../Authenticaltion/SignUp/SignUp';
import "./NavBar.css"


export const ButtonContext = createContext();
function SignupButton() {
    const [buttonState, setButtonState] = useState(false)
    function handleOnClick() {
        setButtonState(!buttonState)
    }
    console.log(buttonState);
    return (
        <ButtonContext.Provider value={{ buttonState, setButtonState }}>
            <div>
                <button onClick={handleOnClick} className='buttonSignupParent'>SignUp</button>
                <SignUp />
            </div>
        </ButtonContext.Provider>
    )
}

export default SignupButton
