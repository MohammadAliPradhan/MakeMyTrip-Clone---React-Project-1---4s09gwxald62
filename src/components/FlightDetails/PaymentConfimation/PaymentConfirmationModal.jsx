import React, { useContext, useState } from 'react'
import "./PaymentConfirmatin.css"
import { createPortal } from 'react-dom'
import { ModalForFlightBooking } from '../../App'


function PaymentConfirmationModal(props) {
    const { test, setTest } = useContext(ModalForFlightBooking)
    function handleOverLayClick(event) {
        if (event.target === event.currentTarget) {
            setTest(false)
        }
    }
    console.log(props);

    console.log(props.BookingInfo.state.n);
    const n = props.BookingInfo.state.n;

    const memberValuea = props.BookingInfo.state.location.state.location.state.MemberValue;


    console.log("sdfkjdlskfj", memberValuea);






    console.log(props, "This is some of the oner");

    const { BookingInfo } = props;
    console.log("this is booking", BookingInfo);
    return createPortal(
        test &&
        <div >
            <div id="myModal" className="modal" onClick={handleOverLayClick}>
                <div className="modal-content">
                    <h2>Booking Successful!</h2>
                    <p>Your flight from {BookingInfo?.state.singleInfoPageOfFlight.source} to {BookingInfo?.state.singleInfoPageOfFlight.destination} has been booked.</p>
                    <p>Flight ID Carry It: {BookingInfo?.state.singleInfoPageOfFlight.flightID} </p>
                    <p>Members Adult: {memberValuea.adult},Kids: {memberValuea.kids}</p>
                    <p>Departure Time: {BookingInfo?.state.singleInfoPageOfFlight.departureTime}</p>
                    <p>Arrival Time: {BookingInfo?.state.singleInfoPageOfFlight.arrivalTime}</p>
                    <p>Amenities: {BookingInfo?.state.singleInfoPageOfFlight.amenities.map((details) => details).join(' ')} </p>
                    <p>Price: INR {BookingInfo?.state.singleInfoPageOfFlight.ticketPrice * n}</p>
                </div>
            </div>

        </div>,
        document.querySelector(".mymodalfour")
    )
}

export default PaymentConfirmationModal

