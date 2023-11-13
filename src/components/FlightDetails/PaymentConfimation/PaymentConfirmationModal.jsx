import React, { useContext, useState } from 'react'
import "./PaymentConfirmatin.css"
import { createPortal } from 'react-dom'
import { ModalForFlightBooking } from '../../App'


function PaymentConfirmationModal() {
    const { test, setTest } = useContext(ModalForFlightBooking)
    function handleOverLayClick(event) {
        if (event.target === event.currentTarget) {
            setTest(false)
        }
    }
    return createPortal(
        test &&
        <div >
            <div id="myModal" className="modal" onClick={handleOverLayClick}>
                <div className="modal-content">
                    <h2>Booking Successful!</h2>
                    <p>Your flight from New York to London has been booked.</p>
                    <p>Flight Details:</p>
                    <p>Departure Date: DD/MM/YYYY</p>
                    <p>Departure Time: HH:mm</p>
                    <p>Arrival Date: DD/MM/YYYY</p>
                    <p>Arrival Time: HH:mm</p>
                    <p>Class: Economy</p>
                    <p>Price: $500</p>
                </div>
            </div>

        </div>,
        document.querySelector(".mymodalfour")
    )
}

export default PaymentConfirmationModal

