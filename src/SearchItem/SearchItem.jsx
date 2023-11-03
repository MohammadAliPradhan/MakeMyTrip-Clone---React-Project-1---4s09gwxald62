import React from 'react'
import "./searchItem.css"
import Travel from '../assets/images/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg'


function SearchItem() {
    return (
        <>
            <div className="searchItem">
                <img src={Travel} alt="" className='siImg' />
                <div className="siDesc">
                    <h1 className="siTitle">Tower Of Hanoi</h1>
                    <span className="siDistance">500 m something</span>
                    <span className="siTaxiOp">Free airport Taxi</span>
                    <span className="siSubtitle">Studio Apartment with Air conditioning</span>
                    <span className="siFeatures">Entire Studio</span>
                    <span className="siCancelOp">Free Cancellation</span>
                    <span className="siCancelOpSubtitle">You can cancel later</span>
                </div>
                <div className="siDetails">
                    <div className="siRating">
                        <span>Excellent</span>
                        <button>8.9</button>
                    </div>

                    <div className="siDetailTexts">
                        <span className='siPrice'>$123</span>
                        <span className='siTaxOp'>Includes taxes and fees</span>
                        <button className='siCheckButton'>See Availability</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchItem
