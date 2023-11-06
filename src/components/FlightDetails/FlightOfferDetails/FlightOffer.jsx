import React from 'react'
import "./FlightOffer.css"

function FlightOffer() {
    return (
        <div className='parentUni'>
            <div className='ComponentUni'>
                <div className="makeFlex blackText appendBottom20">
                    <h2>Offers</h2>

                    <div className="makeFlex perfectContainer">
                        <ul className='makeFlex nrlText superOffersTab appendLeft30'>
                            <li>ALL</li>
                            <li>FLIGHTS</li>
                            <li>HOTELS</li>
                            <li>HOLIDAYS</li>
                            <li>RAILS</li>
                            <li>CABS</li>
                            <li>BANKOFFERS</li>
                        </ul>
                    </div>
                    <div className="pushRight"><span>VIEW ALL</span></div>
                </div>
                <div className="superOffers">
                    <div className="childSuperOffer"></div>
                    <div className="childSuperOffer"></div>
                    <div className="childSuperOffer"></div>
                    <div className="childSuperOffer"></div>
                    <div className="childSuperOffer"></div>
                    <div className="childSuperOffer"></div>
                </div>



            </div>
        </div >
    )
}

export default FlightOffer
