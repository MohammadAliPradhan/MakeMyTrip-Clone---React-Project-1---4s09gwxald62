import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import "./ModalYes.css"

function ModalYes() {
    const [modalA, SetmodalA] = useState(true);


    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            SetmodalA(false);
        }
    }

    return createPortal(
        true &&
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

