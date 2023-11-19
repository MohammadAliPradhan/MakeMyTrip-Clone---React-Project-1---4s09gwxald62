import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import "./AllOtherRoutesParent.css"

function AllOtherRoute() {
    return (
        <div>
            <div>
                <div className="DetailsParent">
                    <div className='Details'>

                        <div className='AllOtherParent'>

                            <div className="flight-search">

                                <h2>This Feature is not implemented yet</h2>

                            </div>
                        </div>

                        {/* <div className='searchParent'>

<div className='searchBtn'>
    SEARCH
</div>
</div> */}



                    </div>

                </div >
                <Outlet />
                <Footer />


            </div>
        </div >
    )
}

export default AllOtherRoute





