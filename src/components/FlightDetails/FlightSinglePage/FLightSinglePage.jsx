import React, { useEffect, useState } from 'react'
import "./flightsingle.css"
import { faCartFlatbedSuitcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar'
import axios from 'axios'
import { getHeaderWithProjectId } from '../../Authenticaltion/utils/service'



function FLightSinglePage() {
    //Api Information Starts here 
    const [FlightAPiDetails, setFlightApiDetails] = useState();



    async function getFlightDetails() {

        try {
            const config = getHeaderWithProjectId();
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight?day=Sun&search={"source":"BOM","destination":"HYD"}`, config)
            console.log(response, "see this");
            setFlightApiDetails(response.data.data.flights)
        } catch (error) {

        }
    }
    useEffect(() => {
        getFlightDetails()
    }, [])

    console.log(FlightAPiDetails);

    //Api Information ends here 
    return (
        <>
            <ScrollNavBar />

            <div className='container-flight-single'>
                <div className="bluecolorcontainer"></div>

                {FlightAPiDetails?.map((details) => (

                    <div className="flight-container">
                        <div className="flight-details">
                            <div className="airways-detail">
                                <img className="air-logo" src="https://plus.unsplash.com/premium_photo-1679830513990-82a4280f41b4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                <span className="flight-name">Ethihad Airways</span>
                            </div>
                            <div className="timings">
                                <span className="departure">09:10</span>
                                <span className="departureDate">{ }-19 Aug</span>
                            </div>
                            <div className="time-travel">
                                <span className="totaltime">{details.duration} hours</span>
                                {/* <hr/> */}
                                <span className="isdirect">{details.stops === 0 ? "Direct" : "Connected"}</span>
                            </div>
                            <div className="arrival">
                                <span className="arrival-time">11:15</span>
                                <span className="arrivalDate">AUH -19 Aug</span>
                            </div>
                        </div>

                        <div className="price-section">
                            <FontAwesomeIcon icon={faCartFlatbedSuitcase} className="luggage-icon" />

                            <span className="luggage-detail">Included-cabin bag</span>
                            <span className="price">INR {details.ticketPrice}</span>
                            <span className="price-details">Total price for all travellers</span>
                            <button className="see-flight">See flight</button>
                        </div>

                    </div>
                ))}


            </div>




        </>

    )
}

export default FLightSinglePage
