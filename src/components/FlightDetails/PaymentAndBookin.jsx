import React, { useContext, useState } from 'react'
import "./Payment.css"
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar'
import { useLocation } from 'react-router-dom'
import PaymentConfirmationModal from './PaymentConfimation/PaymentConfirmationModal';
import { AuthContext, ModalForFlightBooking } from '../App';


function PaymentAndBookin() {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('')
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)

    const [isValid, setIsValid] = useState(false);

    const location = useLocation();
    console.log(location);
    const { test, setTest } = useContext(ModalForFlightBooking)
    function handleSubmit(e) {
        e.preventDefault();
        if (isValid && isLoggedin) {
            setTest(true)
        }
    }


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


    return (
        <>

            <ScrollNavBar />

            <div className='payment-container'>
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
                            <label for="cvv">Phone Number</label>
                            <input
                                className="hotelInput"
                                type="text"
                                id="phoneNumber"
                                placeholder="+91 XXXXX-XXXXX"
                                required
                            />
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
            </div>
            <PaymentConfirmationModal BookingInfo={location} />
        </>
    )
}

export default PaymentAndBookin
