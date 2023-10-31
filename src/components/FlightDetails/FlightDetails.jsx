import React, { useEffect, useState } from 'react'
import "../../components/AllDetails.css"
import { Outlet } from 'react-router-dom'
import "./FlightDetails.css"
import icon from "../../assets/images/fontAwesom/circle-check-solid.svg"

function FlightDetails() {

    const [flightDetails, setFlightDetails] = useState({
        from: "Delhi",
        to: "Bangalore"
    })


    function handleOnClick(e, field) {
        const { value } = e.target;
        setFlightDetails((oldState) => ({
            ...oldState,
            [field]: value
        }))

    }

    return (
        <>
            <div className="DetailsParent">
                <div className='Details'>
                    <form className='ticket-type'>
                        <span><input type="radio" />ONEWAY </span>
                        <span><input type="radio" /> ROUND TRIP </span>
                        <span><input type="radio" /> MULTI CITY</span>
                    </form>
                    <div className="flight-search">
                        <div className="flight">
                            <span>
                                FROM
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'from')}
                                value={flightDetails.from}
                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                To
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'to')}
                                value={flightDetails.to}
                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                Departure
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                placeholder='Delhi'

                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                FROM
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                placeholder='Delhi'

                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>
                    </div>

                    <div className='searchParent'>

                        <div className='searchBtn'>
                            SEARCH
                        </div>
                    </div>



                </div>

            </div>

            <Outlet />
        </>


    )
}

export default FlightDetails
