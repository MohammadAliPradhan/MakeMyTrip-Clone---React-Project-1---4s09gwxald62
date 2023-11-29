import React from 'react'
import "./ComingSoon.css"
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar'

function ComingSoon() {
    return (
        <>
            <ScrollNavBar />
            <div className="coming-soon-container">
                <div className="content">
                    <h1>Coming Soon</h1>
                    <p>We are working on something awesome! Stay tuned for updates.</p>
                </div>
            </div>
        </>
    )
}

export default ComingSoon
