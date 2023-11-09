import React, { useEffect, useState } from 'react'
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar'
import "./HotelSingleNavbar.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleArrowLeft, faCircleRight, faCircleXmark, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'



function HoleSinglePage() {
    const photos = [
        "https://via.placeholder.com/800x400.png/FF5733/FFFFFF",
        "https://via.placeholder.com/800x400.png/33FF57/FFFFFF",
        "https://via.placeholder.com/800x400.png/5733FF/FFFFFF",
        "https://via.placeholder.com/800x400.png/FF33A6/FFFFFF",
        "https://via.placeholder.com/800x400.png/FF5733/FFFFFF",
        "https://via.placeholder.com/800x400.png/33A6FF/FFFFFF",
    ];
    const { singleId } = useParams()
    console.log(singleId);


    const getSingleDetails = async () => {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${singleId}`, config)
        console.log("this is ", response);
    }
    useEffect(() => {
        getSingleDetails()
    }, [])
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

    return (
        <div>
            <ScrollNavBar />

            <div className="hotelSingleContainer">
                {openModal && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpenModal(false)} />
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handlleMove("left")} />
                    <div className="sliderWrapper">
                        <img src={photos[slideIndex]} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleRight} className='arrow' onClick={() => handlleMove("right")} />

                </div>}


                <div className="hotelSingleWrapper">
                    <button className="bookNow">
                        Reserve Or Book Now
                    </button>
                    <h1 className="hotelTitle">Grand Title</h1>
                    <div className="hotelSingleAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Pandri LohiPara</span>
                    </div>
                    <span className='hotelDistance'>Excellent Location</span>
                    <span className="hotePriceHighlight">
                        Book a stay over night for 600 Rs and a get a free airport Taxi
                    </span>

                    <div className="hotelSingleImages">
                        {photos.map((photo, i) => (
                            <div className="hoteImgWrapper">
                                <img onClick={() => handleOpenSingle(i)} src={photo} alt="" className="hoteImg" />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hoteDetailsText">
                            <h1 className="hotelTitle">
                                Stay in the Heart
                            </h1>
                            <p className='hoteDescription'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore possimus doloribus facilis, ipsum accusantium beatae deleniti reprehenderit saepe rerum tempora vitae praesentium, consequatur doloremque aspernatur labore sint ab natus cum?
                                Eos possimus dolorum rerum quibusdam mollitia quae quam amet recusandae non quidem! Nobis pariatur facilis autem mollitia vitae quod eius quae molestiae eligendi assumenda. Id in ratione error quis aut?
                                Doloribus animi tenetur pariatur voluptas repellat esse velit praesentium quibusdam aliquid quas, voluptatibus modi dolor quasi totam quaerat obcaecati eum ducimus voluptates. Maxime laudantium non sit dolores ut odit similique.
                                Qui natus, nihil beatae impedit vitae eaque dolores labore, molestias vel ratione, numquam aliquid fuga! Veritatis cum nihil rem labore. Corporis doloremque molestiae laborum quasi iusto quibusdam labore ut corrupti.
                                Illum reiciendis soluta dolor, amet sint aspernatur ad accusamus quos deleniti quam quod mollitia velit totam, delectus numquam consequatur molestias. Possimus id voluptate dolore consequatur, veritatis commodi illo error blanditiis.
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a 9-night stayy!</h1>
                            <span>
                                Located in the real heart of Krakow, this propery has an excellent location of 9.8!
                            </span>
                            <h2>
                                <b>$945</b> (9 Nights)
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
