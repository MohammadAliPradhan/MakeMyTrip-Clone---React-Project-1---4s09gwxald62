import React from 'react'
import "./NavBar.css"
import { Outlet } from 'react-router-dom'

function NavBar() {
    return (
        <>
        <nav className='navParent'>
            logo
            somet
        </nav>
        <Outlet />
        </>

    )
}

export default NavBar
