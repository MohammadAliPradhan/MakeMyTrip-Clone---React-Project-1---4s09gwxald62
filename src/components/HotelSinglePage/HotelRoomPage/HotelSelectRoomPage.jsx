import React, { useEffect, useState } from 'react'
import "./HotelSelectRoomPage.css"
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar';
import Footer from '../../Footer/Footer';


function HotelSelectRoomPage() {
    const [sroomNumber, setSRoomNumber] = useState(1);
    const [apiDetails, SetapiDetails] = useState();
    const [showThis, setShowThis] = useState();




    function handleOnChangeA(event) {
        event.preventDefault();
        const { value } = event.target;
        setSRoomNumber(value);
    }
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        SetapiDetails(location.state.item.singleData)
        console.log(apiDetails);
    }, [])

    useEffect(() => {
        setSRoomNumber(sroomNumber)
    }, [sroomNumber])

    function handleSubmit(event) {
        event.preventDefault();
        setSRoomNumber(sroomNumber)
        console.log(sroomNumber);
        console.log(apiDetails);

        if (sroomNumber !== undefined) {
            const a = 1;
            apiDetails?.rooms?.map((compare) => {
                if (compare.roomNumber == sroomNumber) {
                    setShowThis(compare);
                    console.log(showThis);
                }
            })
        }

    }
    const navigate = useNavigate();

    function handleReserve() {
        navigate("../justshow", { state: { location, showThis } })
    }







    return (
        <>
            <ScrollNavBar />
            <div className='room-page-parent-container'>

                <div className='room-child-container1'>
                    <div className='checkRoomNumber'>
                        <form action="" className='parentFormofRoom' onSubmit={handleSubmit}>
                            <label htmlFor="">Select Room</label>
                            <input className='inputofRoomNumber' type="number" value={sroomNumber} onChange={handleOnChangeA} />
                            <button className='buttonSubmit' type='submit'> Get This Room</button >
                        </form>
                    </div>
                    <div className='checkRoomNumberB'>
                        <span>{apiDetails?.name}</span>
                        <span>Room Number Selected: {showThis?.roomNumber}</span>
                        <span>Bed Detail: {showThis?.bedDetail} </span>
                        <span>Room Type: {showThis?.roomType}</span>
                        <h4>Cost: {showThis?.price}</h4>
                        {showThis && <button onClick={handleReserve} className='ReserveNow'>Reserve Now</button>}

                    </div>


                </div>



                <div className='room-child-container2'>
                    {
                        apiDetails?.rooms.map((details, i) => (
                            <div className='checkRoomNumber2'>
                                <div className='aldetailsroom'>
                                    <span>Room Number: {i + 1}</span>
                                    <span>Bed Type: {details.bedDetail}</span>
                                    <span>Room Type: {details.roomType}</span>

                                    <h4>Cost: ₹ {details.price}</h4>
                                </div>
                            </div>
                        ))
                    }
                </div>




            </div>
            <div className='footerHotelSelectroom'>
                <Footer />
            </div>
        </>
    )
}

export default HotelSelectRoomPage
