import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./HotelDetails.css"
import axios from 'axios';
import { ApiDetails } from '../App';


function HotelDetails() {


    const { ApiInfo, setApiInfo } = useContext(ApiDetails)
    const [hotelName, setHotelName] = useState({
        destination: "Bangalore",
        checkIn: 6
    })
    const navigate = useNavigate()

    const [submittedHotelDetails, setSubmittedHotelDetails] = useState("");
    const [flag, setFlag] = useState(false);

    async function getHotelDetails(location = "") {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }




        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location === "" ? undefined : location}"}`, config)
        if (response.data.results === 0) {
            setFlag(false)
        } else {
            JSON.stringify(sessionStorage.setItem('proxy', JSON.stringify(response.data.data)))
            navigate("/list")
        }
        console.log("response", response)


    };


    function handleOnCick(e, field) {
        const { value } = e.target;
        setHotelName((oldState) => ({
            ...oldState,
            [field]: value
        }))
    }

    useEffect(() => {
        getHotelDetails(submittedHotelDetails)
    }, [submittedHotelDetails]);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedHotelDetails(hotelName.destination)
    }



    return (
        <>
            <div className="DetailsParent">
                <div className='Details'>
                    <form className='ticket-type' onSubmit={handleSubmit}>
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
                        <button type="submit">Submit</button>
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
