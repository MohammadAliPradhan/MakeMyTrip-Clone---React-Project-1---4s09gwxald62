import React, { useContext } from 'react'
import { AuthContext, LoginButtonContext, TraceHistory } from '../App'
import { Navigate, useLocation } from 'react-router-dom'
import Login from '../Authenticaltion/Login/Login';

function AuthNavigator({ children }) {
    const { isLoggedin } = useContext(AuthContext)
    const location = useLocation();
    console.log(location);
    const { loginButton, setLoginButton } = useContext(LoginButtonContext);
    const { historyy, setHistoryy } = useContext(TraceHistory);

    let componentToRendere;

    if (isLoggedin) {
        componentToRendere = children;
        setHistoryy(location);

    } else {
        componentToRendere = setLoginButton(true);
        setHistoryy(location);
    }
    console.log(historyy);

    return componentToRendere;

}

export default AuthNavigator
