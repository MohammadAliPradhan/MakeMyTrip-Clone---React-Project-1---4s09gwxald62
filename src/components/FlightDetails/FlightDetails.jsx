import React, { useEffect, useState } from 'react'
import "../../components/AllDetails.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./FlightDetails.css"
import icon from "../../assets/images/fontAwesom/circle-check-solid.svg"
import Footer from '../Footer/Footer'
import Calendar from 'react-calendar'
import FindMembers from '../FindMembers/FindMembers'

function FlightDetails() {

    const [TravelDate, setTravelDate] = useState("12 Nov");
    const [trthly, setTrthly] = useState(true);
    const [MemberValue, setMemberValue] = useState({
        adult: 0,
        kids: 0
    })
    const [findMemberModal, setFindMemberModal] = useState();






    const [flightDetails, setFlightDetails] = useState({
        from: "DEL",
        to: "BAN"
    })


    function handleOnClick(e, field) {
        const { value } = e.target;
        console.log(value);
        setFlightDetails((oldState) => ({
            ...oldState,
            [field]: value
        }))

    }


    const handleDateChange = (date) => {
        setTravelDate(date);
    };
    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }

    const navigate = useNavigate()
    function handleOnSubmit() {
        navigate(`/flightsingle`, { state: { flightDetails, TravelDate, MemberValue } })
    }

    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 0, 10);



    //let create 

    return (
        <>
            <div className="DetailsParent">
                <div className='Details'>
                    <form className='ticket-type' onSubmit={handleOnSubmit}>
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
                        <div className='searchParent'>
                            <button className="searchBtn" type="submit">Search</button>
                        </div>
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
                                value={flightDetails.from.toUpperCase()}
                            /></h1>
                            <span>{flightDetails.from}, {flightDetails.from} India</span>
                        </div>

                        <div className="flight">
                            <span>
                                To
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'to')}
                                value={flightDetails.to.toUpperCase()}
                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div>

                        {trthly ? <div className="flight">
                            <span>
                                Departure
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                value={TravelDate}
                                onClick={() => setTrthly(!trthly)}
                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div> : <div >
                            <span onClick={() => setTrthly(!trthly)} className='calendarCrossOfTwoFlight'>Done</span>
                            <Calendar className="calendarOnOfFlight" onChange={handleDateChange} onClickDay={handleDayClick} value={TravelDate} />
                        </div>}

                        <div className="flight" >
                            <div onClick={() => setFindMemberModal(!findMemberModal)}>
                                <span>
                                    Members
                                </span>
                                <h3 className='inputHeremains'>Members: {totalMembers} </h3>
                            </div>

                            {findMemberModal && <div className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>}


                            <span>{MemberValue?.adult} Adults, {MemberValue?.kids} Kids ({totalMembers} Members)</span>
                        </div>
                    </div>

                    <div className='searchParent'>


                    </div>



                </div>

            </div>
            <div className='footerfix'><Footer /></div>

            <Outlet />
            <Footer />

        </>


    )
}

export default FlightDetails
