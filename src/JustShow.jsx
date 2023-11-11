import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom';
import "./JustShow.css"

function JustShow() {


    const [hotels, SetHotels] = useState([]);
    const [inputVal, setInputVal] = useState({
        val: 'proxy',
    });
    const [submitedValue, setSubmitedValue] = useState()
    const location = useLocation()


    //These all are api related variables
    console.log("finally reached", location);
    const checkInDate = location.state.item.checkInClear;
    const checkOutDate = location.state.item.checkOutClear;
    const hotelId = location.state.item.singleId;
    const token = JSON.parse(sessionStorage.getItem("userToken"))
    console.log(token);

    async function getMusicList(hotelId) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                projectID: "9sa80czkq1na",

            }
        }

        console.log();
        const response = await axios.post(`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
            {
                bookingType: "hotel",
                bookingDetails: {
                    hotelId: hotelId,
                    startDate: checkInDate,
                    endDate: checkOutDate
                }
            },
            config,

        )

        // setShow(response.data)
        console.log(response);
    };

    function handleOnSubmit(e) {
        e.preventDefault()
        setSubmitedValue(inputVal.val)
    }

    useEffect(() => {
        getMusicList(hotelId);
    }, [])


    return (
        <>
            <div className='parent-justShow'>
                <div className='child-justShow'>

                    <div className="marginPurpose">
                        <h1 className='name-heading'>Radison Blue</h1>
                        <span className='rating-stars'>couples Friendly</span>

                        <div className='checkIn-checkOut'>
                            <div className='checkin'>wed 20 dec checked in</div>
                            <div className='checkout'>Thrusday checkOut</div>
                        </div>
                        <div className='feature-with-heading'>
                            <h2 className='name-heading-two'>Radion Blue</h2>
                            <span className='rating-two'>Rating</span>
                            <ul>
                                <li>feature1</li>
                                <li>feature2</li>
                                <li>feature3</li>
                                <li>feature4</li>
                            </ul>
                        </div>
                    </div>


                    {/* Payment Method */}
                    <div class="payment-method">
                        <form action="">
                            <h2>Payment Method</h2>

                            <div class="form-group">
                                <label for="fullName">Full Name</label>
                                <input type="text" id="fullName" placeholder="Name On Card" required />
                            </div>

                            <div class="form-group">
                                <label for="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" placeholder="Card Number" required />
                            </div>

                            <div class="expiry-cvv">
                                <div class="form-group">
                                    <label for="expiry">Expiry</label>
                                    <input type="text" id="expiry" placeholder="MM/YY" required />
                                </div>

                                <div class="form-group">
                                    <label for="cvv">CVV</label>
                                    <input type="text" id="cvv" placeholder="CVV" required />
                                </div>
                            </div>

                            <button type="submit">Submit Payment</button>
                        </form>
                    </div>

                    {/* payment div ends here */}
                </div>


            </div >
        </>
    );
}

export default JustShow