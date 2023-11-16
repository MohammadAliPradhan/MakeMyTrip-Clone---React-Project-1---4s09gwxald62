import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import "./ModalYes.css"
import { ModalForBooking } from './App';

function ModalYes(props) {
    const { modalA, SetmodalA } = useContext(ModalForBooking);


    function convertDate(info) {
        const isoDate = info;
        const date = new Date(isoDate);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate;
    }

    const checkdata = convertDate(props.hoteldData.state.item.checkInClear)
    console.log(checkdata);
    const checkodata = convertDate(props.hoteldData.state.item.checkOutClear)
    console.log(props.hoteldData.state.item.checkOutClear);



    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            SetmodalA(false);
        }
    }

    console.log(props);





    return createPortal(

        modalA &&
        <div id="myModal" className="modal" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Booking Successful!</h2>
                <p>Your hotel reservation at {props.hoteldData.state.item.singleData.name} has been confirmed.</p>
                <p>Reservation ID Carry This: {props.hoteldData.state.item.singleData._id}</p>
                <p>Check-in Date: {checkdata}</p>
                <p>Check-out Date: {checkodata}</p>
                <p>Room Type: {props.hoteldData.state.item.singleData.rooms[0].roomType}</p>
                <p>Number of Guests: </p>
                <p>Price: {props.hoteldData.state.item.singleData.rooms[0].costPerNight} INR</p>
            </div>
        </div>
        ,
        document.querySelector(".myThirdDiv")
    )
}

export default ModalYes

