import React, { useEffect, useState } from 'react'
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar'
import "./HotelSingleNavbar.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleArrowLeft, faCircleRight, faCircleXmark, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'



function HoleSinglePage() {
    const [singleData, setSingleData] = useState();

    const { singleId } = useParams()
    console.log(singleId);


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
                    <button className="bookNow">
                        Reserve Or Book Now
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
                            <button>Reserve or Book Now!</button>
                        </div>


                    </div>
                </div>
            </div>
        </div >
    )
}

export default HoleSinglePage
