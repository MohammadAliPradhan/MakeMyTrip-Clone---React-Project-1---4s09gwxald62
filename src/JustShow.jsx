import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, json, useLocation, useNavigate } from 'react-router-dom';
import "./JustShow.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ModalYes from './components/ModalYes';
import ScrollNavBar from './ScrollNavBar/ScrollNavBar';
import { AuthContext, ModalForBooking } from './components/App';
import Footer from './components/Footer/Footer';


function JustShow() {
    const { modalA, SetmodalA } = useContext(ModalForBooking);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('')
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)
    const [isValid, setIsValid] = useState(false);
    const [hotels, SetHotels] = useState([]);
    const [inputVal, setInputVal] = useState({
        val: 'proxy',
    });
    const [submitedValue, setSubmitedValue] = useState()
    const location = useLocation()
    console.log("This location", location);


    useEffect(() => {
        SetHotels(location)
    }, [])



    console.log("Yes this is ", location.state.showThis);
    //These all are api related variables
    console.log("finally reached", location);
    const checkInDate = location.state.location.state.item.checkInClear;
    const checkOutDate = location.state.location.state.item.checkOutClear;
    const hotelId = location.state.location.state.item.singleId;
    const token = JSON.parse(sessionStorage.getItem("userToken"))
    console.log(token);


    console.log(hotelId);
    console.log(checkInDate);
    console.log(checkOutDate);


    const proxy = sessionStorage.getItem("proxy")
    const [infoApi, setInfoApi] = useState(proxy)
    console.log("infor Api", infoApi);

    //    human readable format
    function isoToHumanReadable(isoTimestamp) {
        const date = new Date(isoTimestamp);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const humanReadableFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        return humanReadableFormat;
    }

    const checkIn = checkInDate;
    const checkout = checkOutDate;
    const checkInUI = isoToHumanReadable(checkIn);
    const checkOutUi = isoToHumanReadable(checkout);

    const [entranceInfo, setEntranceInfo] = useState(checkInUI)
    const [endInfo, setEndInfo] = useState(checkOutUi)


    //This one is for formatting card details

    const formatCreditCardNumber = (input) => {
        // Remove non-digit characters
        const digitsOnly = input.replace(/[^\d]/g, '');

        // Insert hyphens after every 4 digits
        const formattedNumber = (digitsOnly.match(/.{1,4}/g) || [])
            .join('-')
            .substr(0, 19);

        return formattedNumber;
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value;
        const formattedNumber = formatCreditCardNumber(input);
        setCreditCardNumber(formattedNumber);

        const pattern = /\b\d{4}[-,]\d{4}[-,]\d{4}[-,]\d{4}\b/;
        setIsValid(pattern.test(formattedNumber));
    };
    //ends here 

    //This one is formatting expiry
    function formatExpiryDate(input) {
        const digitsOnly = input.replace(/[^\d]/g, '');

        // Insert a "/" after the first 2 digits
        const formattedDate = digitsOnly
            .replace(/(\d{2})(?=\d)/, '$1/')
            .substr(0, 5);

        return formattedDate;
    }

    function handleExpiryDateChange(event) {
        const input = event.target.value;
        const formattedDate = formatExpiryDate(input);
        setExpiryDate(formattedDate)
    }
    //Ends here 
    const [CVV, setCVV] = useState('');

    //cvv change starts here 
    function formatCV(input) {
        const digitsOnly = input.replace(/[^\d]/g, '');

        // Limit the CVV to 3 digits
        const formattedCVV = digitsOnly.substr(0, 3);

        return formattedCVV;
    }

    function handleCvvChange(event) {
        const input = event.target.value;
        const formattedCVV = formatCV(input)
        setCVV(formattedCVV);
    }



    // human readable format ends here 

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
        console.log("lelores", response);
    };
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        if (isLoggedin) {
            SetmodalA(true);
        }
        getMusicList(hotelId);
        console.log("hello this is ali form ");
    }



    function handleOnSubmit(e) {
        e.preventDefault()
        setSubmitedValue(inputVal.val)
    }

    // useEffect(() => {
    //     getMusicList(hotelId);
    // }, [])




    return (
        <>
            <ScrollNavBar />
            <div className='colorPurpose'><div className='parent-justShow'>
                <div className='child-justShow'>

                    <div className="marginPurpose">
                        <h1 className='name-heading'>{location.state.location.state.item.singleData?.name}</h1>
                        <span className='rating-stars'>Rating: {location.state.location.state.item.singleData?.rating}<FontAwesomeIcon icon={faStar} style={{ color: "#6c9b35", }} /></span>

                        <div className='checkIn-checkOut'>
                            <div className='checkin'>Check In: {entranceInfo}</div>
                            <div className='checkout'>Check Out: {endInfo}</div>
                            <div className='timing'>Time: 12:00 </div>

                        </div>
                        <div className='feature-with-heading'>
                            <h4 className='name-heading-two'>{location.state.location.state.item.singleData?.rooms[0].cancellationPolicy}</h4>
                            <span className='rating-two'>Some of the Amenities</span>
                            <ul>
                                {location.state.location.state.item.singleData?.amenities.map((ima) => {
                                    return <li>{ima}</li>
                                })}
                            </ul>
                        </div>
                    </div>


                    {/* Payment Method */}
                    <div class="payment-method">
                        <form className='form-parent-just' onSubmit={handleSubmit}>
                            <h2 className='payment-method-h2'>Payment Method</h2>

                            <div class="form-group">
                                <label for="fullName">Full Name</label>
                                <input className="hotelInput" type="text" id="fullName" placeholder="Name On Card" required />
                            </div>

                            <div class="form-group">
                                <label for="cardNumber">Email</label>
                                <input className="hotelInput" type="email" id="cardNumber" placeholder="email" required />
                            </div>

                            <div class="form-group">
                                <label for="cardNumber">Card Number</label>
                                <input
                                    className="hotelInput"
                                    type="text"
                                    id="cardNumber"
                                    placeholder="Card Number"
                                    onChange={handleCardNumberChange}
                                    value={creditCardNumber}
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label for="cvv">Phone Number</label>
                                <input
                                    className="hotelInput"
                                    type="text"
                                    id="phoneNumber"
                                    placeholder="+91 XXXXX-XXXXX-XXXXX"
                                    required
                                />
                            </div>


                            <div class="expiry-cvv">
                                <div class="form-group">
                                    <label for="expiry">Expiry</label>
                                    <input className="hotelInput"
                                        type="text" id="expiry"
                                        placeholder="MM/YY"
                                        onChange={handleExpiryDateChange}
                                        value={expiryDate}
                                        required />
                                </div>

                                <div class="form-group">
                                    <label for="cvv">CVV</label>
                                    <input className="hotelInput"
                                        type="text"
                                        id="cvv"
                                        onChange={handleCvvChange}
                                        value={CVV}
                                        placeholder="CVV"
                                        required />
                                </div>


                            </div>


                            <button className='hote-book-btn' type="submit">Submit Payment</button>
                            {!isLoggedin && <p className='isnotRedPayment'>You have to login to complete this authentication</p>}                      </form>
                    </div>
                    <ModalYes hoteldData={location} />


                    {/* payment div ends here */}
                </div>


            </div ></div>

            <div id='footerchange'><Footer /></div>


        </>
    );
}

export default JustShow