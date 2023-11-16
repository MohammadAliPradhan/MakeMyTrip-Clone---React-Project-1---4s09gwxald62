import React, { useContext } from 'react'
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar';
import Footer from '../../Footer/Footer';
import ModalTrainTest from '../ModalTrainTest/ModalTrainTest';
import { trainModalTestContext } from '../../App';

function PaymentTrain() {

    const { modalTrain, setModalTrain } = useContext(trainModalTestContext);


    function handleSubmit(e) {
        e.preventDefault()
        console.log("hello");
        setModalTrain(true)
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
                            <label for="cardNumber">Card Number</label>
                            <input className="hotelInput" type="text" id="cardNumber" placeholder="Card Number" required />
                        </div>

                        <div class="expiry-cvv">
                            <div class="form-group">
                                <label for="expiry">Expiry</label>
                                <input className="hotelInput" type="text" id="expiry" placeholder="MM/YY" required />
                            </div>

                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input className="hotelInput" type="text" id="cvv" placeholder="CVV" required />
                            </div>
                        </div>
                        <button className='hote-book-btn' type="submit">Submit Payment</button>                        </form>
                </div>
            </div>
            <ModalTrainTest />
            <Footer />
        </>
    )
}

export default PaymentTrain
