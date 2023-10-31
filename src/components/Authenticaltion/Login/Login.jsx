import React, { useContext, useState } from 'react'
import Data from './Data'
import { Outlet, useNavigate } from 'react-router-dom';
import "./Login.css"
import { AuthContext } from '../../App';
import { createPortal } from 'react-dom';


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
    const { setIsLoggedIn } = useContext(AuthContext)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleInputChange(e) {
        const { value, name } = e.target;
        setState({ ...state, [name]: value })
    }

    // function handleSubmit(e){
    //     e.preventDefault()
    //     const Data = JSON.parse(localStorage.getItem("userList"))
    //     if(!Data){
    //         return;
    //     }
    //     const user = Data.find((usr)=> usr.email === state.email)
    //     if(user){
    //         if(user.password === state.password){
    //             //navigate the user to home
    //             navigate("/")
    //             sessionStorage.setItem("loggedInuser", JSON.stringify(user))
    //             setIsLoggedIn(true)
    //         }else{
    //             console.log("Password is incorrect");
    //             setError("password is incorrect")

    //         }
    //     }else{
    //         console.log("no user found")
    //         setError("no user found")
    //     }
    //     // const user = userId.find((usr)=>{
    //     //     return usr.email === state.email
    //     // })
    // }

    function handleSubmit(e) {
        e.preventDefault();
        const token = sessionStorage.getItem("userToken")
        const config = {
            method: "POST",
            body: JSON.stringify({ ...state, appType: "bookingportals" }),
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                "projectID": "4s09gwxald62",
            }
        }

        fetch("https://academics.newtonschool.co/api/v1/bookingportals/login", config)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                if (data.token) {
                    sessionStorage.setItem("userToken", data.token)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return createPortal(
        <div className='parentLogin'>

            <div className='loginParent'>
                <form action="" id='LoginContainer' onSubmit={handleSubmit}>
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



                    <p>Not a user already?:</p>
                    <button onClick={() => navigate("/signup")}>SignUp</button>

                    {error && <p>{error}</p>}



                </form>

            </div>
        </div>



        ,
        document.querySelector(".myPortalDivTwo")
    )
}

export default Login
