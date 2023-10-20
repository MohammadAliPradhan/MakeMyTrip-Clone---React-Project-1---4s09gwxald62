import React from 'react'
import "../../components/AllDetails.css"
import { Outlet } from 'react-router-dom'

function FlightDetails() {
    return (
        <>
        <div className="DetailsParent">
        <div className='Details'>
        </div>
        </div>
        <Outlet />
        </>
        
     
    )
}

export default FlightDetails
