import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

function TrainDetails() {
    return (
        <>
            <div className="DetailsParent">
                <div className="Details">

                </div>
            </div>
            <Outlet />
            <Footer />

        </>


    )
}

export default TrainDetails
