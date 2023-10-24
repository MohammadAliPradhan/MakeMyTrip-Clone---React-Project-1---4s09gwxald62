import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='FooterParent'>
           <p><Link to="/profile">Profile</Link></p> 
        </div>
    )
}

export default Footer
