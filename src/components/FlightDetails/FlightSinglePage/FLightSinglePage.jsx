import React, { useEffect, useState } from 'react'
import "./flightsingle.css"
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar'
import axios from 'axios'
import { getHeaderWithProjectId } from '../../Authenticaltion/utils/service'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../Footer/Footer'
import NavBar from '../../NavBar/NavBar'



function FLightSinglePage() {
    //Api Information Starts here 
    const [FlightAPiDetails, setFlightApiDetails] = useState();
    const location = useLocation()
    const [loading, setLoading] = useState(false);
    console.log("sdjfskdfjskdlfjsd", location);





    //extracting day
    const originalDate = location.state.TravelDate;
    const dateObject = new Date(originalDate);

    const dayOfWeekOptions = { weekday: 'short' };
    const dayOfWeek = dateObject.toLocaleDateString(undefined, dayOfWeekOptions);

    // extracting date

    const dateString = location.state.TravelDate;
    const datedate = new Date(dateString);

    const dayOfMonth = datedate.getDate();
    console.log(dayOfMonth);

    //end

    console.log("specificllocation", FlightAPiDetails);





    async function getFlightDetails() {

        try {
            console.log(location.state.flightDetails.from);
            const config = getHeaderWithProjectId();
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${dayOfWeek}&search={"source":"${location.state.flightDetails.from}","destination":"${location.state.flightDetails.to}"}`, config)
            console.log(response, "see this");
            setFlightApiDetails(response.data.data.flights)
            setLoading(true);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getFlightDetails();
    }, [])




    const navigate = useNavigate();



    //Api Information ends here 
    function handleNavigate(infos) {
        navigate(`${infos}`, { state: { location } })
    }
    const ListPriceofhighest = [];

    function HandleSortByHighest() {
        const sortedFlights = [...FlightAPiDetails];
        sortedFlights.sort((a, b) => {
            return b.ticketPrice - a.ticketPrice;
        })
        setFlightApiDetails(sortedFlights)
    }

    function HandleSortByCheapest() {
        const sortedFlights = [...FlightAPiDetails];
        sortedFlights.sort((a, b) => {
            return a.ticketPrice - b.ticketPrice;
        })
        setFlightApiDetails(sortedFlights)
    }

    return (
        <>
            <ScrollNavBar />
            {

                loading === false ? "Loading..." :


                    <div className='container-flight-single'>
                        <div className="bluecolorcontainer">
                            <div className='bluecolorcontainerChild'>
                                <p onClick={HandleSortByHighest} className='highestSort'>Sort By Highest</p>
                                <p onClick={HandleSortByCheapest} className='highestSort'>Sort By Cheapest</p>
                            </div>
                        </div>
                        <div className="marginTopFlight">
                            {FlightAPiDetails?.map((details) => (

                                <div className="flight-container">
                                    <div className="flight-details">


                                        <div className="airways-detail">
                                            <img className="air-logo" src="https://plus.unsplash.com/premium_photo-1679830513990-82a4280f41b4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                        </div>
                                        <div className="timings">
                                            <span className="departure">{details.departureTime}</span>
                                            <span className="departureDate">{dayOfWeek}-{dayOfMonth} </span>
                                        </div>




                                        <div className="time-travel">
                                            <span className="totaltime">{details.duration} hours</span>
                                            {/* <hr/> */}
                                            <span className="isdirect">{details.stops === 0 ? "Direct" : "Connected"}</span>
                                        </div>
                                        <div className="arrival">
                                            <span className="arrival-time">{details.arrivalTime}</span>
                                            <span className="arrivalDate">{dayOfWeek} -{dayOfMonth} </span>
                                        </div>
                                    </div>

                                    <div className="price-section">
                                        <div className='locationNamePrice'>
                                            <span className="cityName1">{details.source}</span>
                                            <span className="cityName2">{details.destination}</span>
                                        </div>
                                        <FontAwesomeIcon icon={faCartFlatbedSuitcase} className="luggage-icon" />

                                        <span className="luggage-detail">Included-cabin bag</span>
                                        <span className="price">INR {details.ticketPrice === ListPriceofhighest[0] ? "aloo" : details.ticketPrice}</span>
                                        <span className="price-details">Total price for all travellers</span>

                                        <button onClick={() => handleNavigate(details._id)} className="see-flight">See flight</button>

                                    </div>

                                </div>
                            ))}
                        </div>




                    </div>
            }
            <Footer />









        </>

    )
}

export default FLightSinglePage
