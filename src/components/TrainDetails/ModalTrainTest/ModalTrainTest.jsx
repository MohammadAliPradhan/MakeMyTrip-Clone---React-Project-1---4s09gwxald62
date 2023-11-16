import React, { useContext } from 'react'
import "./ModalTrainTest"
import { createPortal } from 'react-dom'
import { trainModalTestContext } from '../../App';

function ModalTrainTest() {

    const { modalTrain, setModalTrain } = useContext(trainModalTestContext);

    function handleOverlay(event) {
        if (event.target === event.currentTarget) {
            setModalTrain(false);
        }
    }
    return createPortal(
        modalTrain &&
        <div className='booking-confirmed-modal-Parent' onClick={handleOverlay}>
            <div className="modal-content" >
                <h2>Booking Successful!</h2>
                <p>Your Train from from to To has been booked.</p>
                <p>Flight ID Carry It: 1244324234234 </p>
                <p>Departure Time: 348923783724</p>
                <p>Arrival Time: 8234782374</p>
                <p>Amenities: something</p>
                <p>Price: INR something</p>
            </div>
        </div>,
        document.querySelector(".modalTrainTest")
    )
}

export default ModalTrainTest
