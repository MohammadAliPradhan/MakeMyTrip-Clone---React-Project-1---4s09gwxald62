import React, { useContext } from 'react'
import { AuthContext } from '../components/App'
import { Navigate } from 'react-router-dom'

function AuthNavigator({children}) {
    const {isLoggedin} = useContext(AuthContext)
    if(!isLoggedin){
        return <Navigate to="/login"/>
    }else{
        return children
    }
}

export default AuthNavigator
