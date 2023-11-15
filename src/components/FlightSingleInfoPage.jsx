import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getHeaderWithProjectId } from './Authenticaltion/utils/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./FlightSingleInfoPage.css"
import ScrollNavBar from '../ScrollNavBar/ScrollNavBar';
import { AuthContext, ButtonContext } from './App';

function FlightSingleInfoPage() {
    const [singleInfoPageOfFlight, setSingleInfoPageOfFlight] = useState()
    const { flightId } = useParams();
    const testFlightId = flightId;
    const { buttonState, setButtonState } = useContext(ButtonContext);
    console.log(testFlightId);

    async function getFlightDetailsOfSingle() {
        try {
            const config = getHeaderWithProjectId();
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/flight/${testFlightId}`, config)
            console.log(response);
            setSingleInfoPageOfFlight(response.data.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFlightDetailsOfSingle()
    }, [])
    const navigate = useNavigate();
    const token = sessionStorage.getItem("userToken");

    function handleonClick() {
        if (token) {
            navigate(`/payment`, { state: { singleInfoPageOfFlight } })
        } else {
            setButtonState(true)
        }
    }
    return (
        <div>
            <ScrollNavBar />
            <section className='sectionsingle'>
                <h2>Flight Details</h2>
                <div className="flight-details-single">
                    <div className='depa'>
                        <h3>Departure</h3>
                        <span>City: {singleInfoPageOfFlight?.source} </span>
                        <span>Time: {singleInfoPageOfFlight?.departureTime}</span>
                    </div>
                    <div>
                        <h3>Arrival</h3>
                        <span>City: {singleInfoPageOfFlight?.destination} </span>
                        <span>Time: {singleInfoPageOfFlight?.arrivalTime}</span>
                    </div>
                </div>

                <h2>Booking Information</h2>
                <div className="booking-info">
                    <div>
                        <h3>Economy Class</h3>
                        <p>INR {singleInfoPageOfFlight?.ticketPrice}</p>
                    </div>
                    <div>
                        <h3>Seat Number</h3>
                        <p>{singleInfoPageOfFlight?.availableSeats}</p>
                    </div>
                </div>

                <div className="amenities">
                    <h2>Amenities</h2>
                    <ul>
                        {singleInfoPageOfFlight?.amenities.map((details) => (
                            <li>{details}</li>
                        ))}
                    </ul>
                </div>

                <div className="amenities">
                    <h2>Free Cancellation</h2>
                    <p>Cancel for free up to 24 hours before departure.</p>
                </div>

                <div className="amenities">
                    <h2>Special Offers</h2>
                    <p>Enjoy 10% off on your first booking! Use code: FIRSTFLIGHT</p>
                </div>

                <button onClick={handleonClick}>Reserve Or Book Now</button>
            </section>
        </div>
    )
}

export default FlightSingleInfoPage



//starts here 
