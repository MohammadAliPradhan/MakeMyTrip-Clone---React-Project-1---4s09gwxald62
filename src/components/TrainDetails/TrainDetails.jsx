import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Calendar from 'react-calendar'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./TrainDetails.css"
import axios from 'axios'
import { getHeaderWithProjectId } from '../Authenticaltion/utils/service'

function TrainDetails() {
    const [TrainPlace, setTrainPlace] = useState({
        from: "Bangalore",
        to: "Delhi"
    })

    function handleTrainChange(e, field) {
        const { value } = e.target;
        console.log("This is", value);
        setTrainPlace((oldState) => ({
            ...oldState,
            [field]: value

        }))
        console.log("Hi This is the chagne", TrainPlace.from);
        TrainSection({ ...TrainPlace, [field]: value });

    }

    async function TrainSection(updatedState) {
        try {
            console.log("This is from", updatedState.from);
            console.log("This is to", updatedState.to);
            const config = getHeaderWithProjectId()
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${updatedState.from}","destination":"${updatedState.to}"}&day=Fri`, config);
            console.log("this is response", response);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        TrainSection(TrainPlace)
    }, [TrainPlace])





    return (
        <>

            <div className="DetailsParent">
                <div className='Details'>
                    <form className='ticket-type' >
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
                                From
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                value={TrainPlace.from}
                                onChange={(e) => handleTrainChange(e, 'from')}


                            /></h1>
                            <span>GOA, Delhi Airport India</span>
                        </div>

                        <div className="flight">
                            <span>
                                To
                            </span>

                            {/* //do the work */}
                            {false ? < div >
                                <span onClick={() => setCalendarState(!calendarState.checkInState)} className='calendarCross'>Close</span>
                                <Calendar className="calendarOfTrain" />
                            </div> : <h1><input
                                type="text"
                                className='something'
                                value={TrainPlace.to}
                                onChange={(e) => handleTrainChange(e, 'to')}
                            /></h1>}


                        </div>

                        <div className="flight">
                            <span>
                                Check Out
                            </span>

                            {/* do the work two */}
                            {true ? <div >
                                <span onClick={() => setCalendarState(!calendarState.checkOut)} className='calendarCrossOfTwo'>Close</span>
                                <Calendar className="calendarOfTrainTwo" />
                            </div> : <h1><input

                                type="text"
                                className='something'



                            /></h1>}
                            <span><FontAwesomeIcon icon={faCalendar} /></span>
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

export default TrainDetails
