import React, { useState } from 'react'
import Data from './Data'
import { useNavigate } from 'react-router-dom';

function Login() {

    
    // const  userId =[
    //     {
    //         id: "1001",
    //         name: "Akash",
    //         pass: "123456",
    //         role: "student"
    //     },
    // ]

    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()

    function handleInputChange(e){
        const {value, name} = e.target;
        setState({...state, [name]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        const user = Data.find((usr)=> usr.email === state.email)
        if(user){
            if(user.pass === state.password){
                //navigate the user to home
                navigate("/")
            }else{
                console.log("Password is incorrect");
            }
        }else{
            console.log("no user found")
        }
        // const user = userId.find((usr)=>{
        //     return usr.email === state.email
        // })
    }

    return (
        <form action="" className='login-form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="text"
                name="email"
                id="email"
                onChange={handleInputChange}
                value={state.email.toLowerCase()} />
                
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
                value={state.password} />
            </div>

            <input type="submit" value="Login" />


        </form>

    )
}

export default Login
