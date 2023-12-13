import React, { useContext, useEffect, useState } from 'react'
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar'
import "./HotelSingleNavbar.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleArrowLeft, faCircleRight, faCircleXmark, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext, ButtonContext, LoginButtonContext, TraceHistory } from '../App'
import Footer from '../Footer/Footer'
import FindMembers from '../FindMembers/FindMembers'



function HoleSinglePage() {
    const location = useLocation();
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)
    const { historyy, setHistoryy } = useContext(TraceHistory);


    console.log(location);
    console.log("final call", location);
    // Here I am getting two important dates
    const checkInDate = location.state.shareData.state.selectedDate;
    const checkOutDate = location.state.shareData.state.selectedDateCheckOut;

    const checkInClear = new Date(checkInDate).toISOString();
    const checkOutClear = new Date(checkOutDate).toISOString();



    const navigate = useNavigate();
    const [singleData, setSingleData] = useState();
    const { buttonState, setButtonState } = useContext(ButtonContext)
    const { loginButton, setLoginButton } = useContext(LoginButtonContext)
    const { singleId } = useParams()
    const token = sessionStorage.getItem("userToken")

    // I am sending data to some other place for the purpose of using it in booking page and payment page


    const getSingleDetails = async () => {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${singleId}`, config)
        console.log("this is ", response.data.data);
        setSingleData(response.data.data)
    }
    useEffect(() => {
        getSingleDetails()
    }, [])







    const [item, setItem] = useState({
        checkInClear,
        checkOutClear,
        singleId,
    })


    console.log(item.singleId);


    console.log(singleId);

    console.log("this is state", singleData);
    const [slideIndex, setSlideIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)


    function handleOpenSingle(i) {
        setSlideIndex(i);
        setOpenModal(true)
    }

    function handlleMove(directions) {
        let newSlideNumber;
        if (directions === "left") {
            newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1;

        } else {
            newSlideNumber = slideIndex === 5 ? 0 : slideIndex + 1;
        }

        setSlideIndex(newSlideNumber)
    }

    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 8) + 1)


    console.log(token);

    function handleReservedOrNote() {
        if (isLoggedin) {
            if (singleData) {
                // If both token and singleData are present, navigate with the updated state
                navigate("../hotelroomselect", { state: { item: { ...item, singleData } } });

            } else {
                // If singleData is not available, you might want to handle this case
                console.error("Single data is not available");
            }
        } else {
            console.log(buttonState);
            if (buttonState === undefined || buttonState === false) {
                setButtonState(true);
            }
        }
    }





    return (
        <div>
            <ScrollNavBar />

            <div className="hotelSingleContainer">
                {openModal && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpenModal(false)} />
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handlleMove("left")} />
                    <div className="sliderWrapper">
                        <img src={singleData?.images[slideIndex]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleRight} className='arrow' onClick={() => handlleMove("right")} />
                </div>}





                <div className="hotelSingleWrapper">
                    <button className="bookNow" onClick={handleReservedOrNote}>
                        Book Now
                    </button>
                    <h1 className="hotelTitle">{singleData?.name}</h1>
                    <div className="hotelSingleAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{singleData?.location}</span>
                    </div>
                    <span className='hotelDistance'>Excellent Location</span>
                    <span className="hotePriceHighlight">
                        Book 2 days stay and a get a {singleData?.rooms[0].bedDetail}
                    </span>

                    <div className="hotelSingleImages">
                        {singleData?.images.map((photo, i) => (
                            <div className="hoteImgWrapper">
                                <img onClick={() => handleOpenSingle(i)} src={photo} alt="" className="hoteImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hoteDetailsText">
                            <h1 className="hotelTitle">
                                {singleData?.amenities.map((amenity, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && ' '}
                                        {amenity}
                                    </React.Fragment>
                                ))}

                            </h1>
                            <p className='hoteDescription'>
                                <li><strong>Free Wi-Fi throughout the property:</strong> Stay connected with high-speed internet at no extra cost.</li>
                                <li><strong>Complimentary breakfast included:</strong> Start your day right with a delicious breakfast on us.</li>
                                <li><strong>Exclusive discounts for direct bookings:</strong> Enjoy special rates when you book directly through our website.</li>
                                <li><strong>Flexible cancellation policies:</strong> Life is unpredictable; our flexible cancellation options cater to your changing plans.</li>
                                <li><strong>Late check-out options:</strong> Take your time and relax with the convenience of late check-out availability.</li>
                            </p>
                            <span className="hotePriceHighlight">
                                {singleData?.rooms[0].cancellationPolicy}
                            </span>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {randomNumber}-night stayy!</h1>
                            <span>
                                Located in the real heart of {singleData?.location}, this propery has an excellent location and rating of {singleData?.rating} out of 5!
                            </span>
                            <h2>
                                <b>₹ {singleData?.rooms[0].costPerNight}</b> (1 Night)
                            </h2>
                            <button onClick={handleReservedOrNote}>Reserve or Book Now!</button>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />

        </div >

    )
}

export default HoleSinglePage
