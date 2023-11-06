import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import "./HotelDetails.css"




function HotelDetails() {

    const [hotelName, setHotelName] = useState({
        destination: "Goa",
        checkIn: 6
    })

    function handleOnCick(e, field) {
        const { value } = e.target;
        console.log(value);
        setHotelName((oldState) => ({
            ...oldState,
            [field]: value
        }))

    }
    return (
        <>
            <div className="DetailsParent">
                <div className='Details'>
                    <form className='ticket-type'>
                        <div className="radioFlight">
                            <div className="form-check me-4">
                                <input
                                    type="radio"
                                    id="one-way"
                                    value="one-way"
                                    name="trip"
                                    className="form-check-input"
                                    defaultChecked
                                ></input>
                                <label className="form-check-label" htmlFor="one-way">
                                    One Way
                                </label>
                            </div>
                            <div className="form-check me-4">
                                <input
                                    type="radio"
                                    id="round-trip"
                                    value="round-trip"
                                    name="trip"
                                    className="form-check-input"
                                ></input>
                                <label
                                    className="form-check-label"
                                    htmlFor="round-trip"
                                >
                                    Round Trip
                                </label>
                            </div>
                            <div className="form-check me-4">
                                <input
                                    type="radio"
                                    id="multi-city"
                                    value="multi-city"
                                    name="trip"
                                    className="form-check-input"
                                ></input>
                                <label
                                    className="form-check-label"
                                    htmlFor="multi-city"
                                >
                                    Multi City
                                </label>
                            </div>
                        </div>
                    </form>
                    <div className="flight-search">
                        <div className="flight">
                            <span>
                                City Property Name or Location
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnCick(e, 'destination')}
                                value={hotelName.destination}
                            /></h1>
                            <span>GOA, Delhi Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                Check In
                            </span>
                            <h1><input
                                type="number"
                                className='something'
                                onChange={(e) => handleOnCick(e, 'checkIn')}
                                value={hotelName.checkIn}




                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                Check Out
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

export default HotelDetails
