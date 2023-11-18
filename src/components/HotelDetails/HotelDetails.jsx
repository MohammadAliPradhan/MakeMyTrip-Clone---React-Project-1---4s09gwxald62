import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./HotelDetails.css"
import axios from 'axios';
import { ApiDetails } from '../App';
import Footer from '../Footer/Footer';
import Calendar from 'react-calendar';
import { CropSquareSharp } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import FindMembers from '../FindMembers/FindMembers'


function HotelDetails() {

    const { ApiInfo, setApiInfo } = useContext(ApiDetails)
    const [hotelName, setHotelName] = useState({
        destination: "Delhi",
        checkIn: 6
    })
    const [findMemberModal, setFindMemberModal] = useState();

    const [MemberValue, setMemberValue] = useState()


    const [calendarState, setCalendarState] = useState({
        checkInState: false,
        checkOut: false,
    })
    const [selectedDate, setSelectedDate] = useState('12 Nov')
    const [selectedDateCheckOut, setSelectedDateCheckOut] = useState("13 Nov")
    const navigate = useNavigate()

    const [submittedHotelDetails, setSubmittedHotelDetails] = useState("");
    const [flag, setFlag] = useState(false);

    //This one is the first one change of the input
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(selectedDate);
    };
    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    // This is the second second change of value

    const handleDateChangeCheckOut = (date) => {
        setSelectedDateCheckOut(date)
        console.log("This is ", selectedDateCheckOut);
    }

    const handleDayClickCheckOut = (value, eventc) => {
        console.log(value);
    }

    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }



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
            JSON.stringify(sessionStorage.setItem('proxy', JSON.stringify(response.data.data.hotels)))
            localStorage.setItem("locationApi", response.data.data.hotels[0].location)
            localStorage.setItem("listItem", response.data.data.hotels[0].location)
            navigate("/list", { state: { selectedDate, selectedDateCheckOut, MemberValue } })
            // navigate("/justshow", { state: { item } })

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

    function handleInputClick() {
        setCalendarState((oldState) => ({
            ...oldState,
            checkInState: !oldState.checkInState
        }));
    }

    function handleInputClickTwo() {
        setCalendarState((oldState) => ({
            ...oldState,
            checkOut: !oldState.checkOut
        }));
    }




    console.log(calendarState.checkInState);



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

                        <div className='searchParent'>
                            <button className="searchBtn" type="submit">Search</button>
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

                            {/* //do the work */}
                            {calendarState.checkInState ? < div >
                                <span onClick={() => setCalendarState(!calendarState.checkInState)} className='calendarCross'>Close</span>
                                <Calendar className="calendarOn" onChange={handleDateChange} onClickDay={handleDayClick} value={selectedDate} />
                            </div> : <h1><input
                                type="text"
                                className='something'
                                value={selectedDate}
                                onClick={handleInputClick}

                            /></h1>}


                            <span onClick={handleInputClick}><FontAwesomeIcon icon={faCalendar} /></span>
                        </div>

                        <div className="flight">
                            <span>
                                Check Out
                            </span>

                            {/* do the work two */}
                            {calendarState.checkOut ? <div >
                                <span onClick={() => setCalendarState(!calendarState.checkOut)} className='calendarCrossTwo'>Close</span>
                                <Calendar className="calendarOn" onChange={handleDateChangeCheckOut} onClickDay={handleDayClickCheckOut} value={selectedDateCheckOut} />
                            </div> : <h1><input

                                type="text"
                                className='something'
                                value={selectedDateCheckOut}
                                onClick={handleInputClickTwo}

                            /></h1>}
                            <span><FontAwesomeIcon icon={faCalendar} /></span>
                        </div>

                        <div className="flight" >
                            <div onClick={() => setFindMemberModal(!findMemberModal)}>
                                <span>
                                    Members
                                </span>
                                <h3 className='inputHeremains'>Members: </h3>
                            </div>

                            {findMemberModal && <div className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>}


                            <span>7 Adult,6 Kids (9 Members)</span>
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


        </>


    )
}

export default HotelDetails
