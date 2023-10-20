import React from 'react'
import { Outlet } from 'react-router-dom'

function TrainDetails() {
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

export default TrainDetails
