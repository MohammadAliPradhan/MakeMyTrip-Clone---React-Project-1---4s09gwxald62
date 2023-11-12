import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import "./ModalYes.css"
import { ModalForBooking } from './App';

function ModalYes() {
    const { modalA, SetmodalA } = useContext(ModalForBooking);


    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            SetmodalA(false);
        }
    }

    return createPortal(
        modalA &&
        <div className='booking-confirmed-modal-Parent ' onClick={handleOverlayClick}>
            <div className='booking-confirmed-modal'>
                Congratulation For Booking
            </div>
        </div>
        ,
        document.querySelector(".myThirdDiv")
    )
}

export default ModalYes

