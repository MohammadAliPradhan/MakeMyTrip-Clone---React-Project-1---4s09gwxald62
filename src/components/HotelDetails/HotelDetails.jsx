import React from 'react'
import { Outlet } from 'react-router-dom'

function HotelDetails() {
    return (
        <>
        <div className="DetailsParent">
             <div className="Details">
                
            </div>
         </div>
         <Outlet />
         </>

       
    )
}

export default HotelDetails
