import React from 'react'
import NavBar from './NavBar/NavBar'
import MmtHeader from './MmtHeader/MmtHeader'
import FlightDetails from './FlightDetails/FlightDetails'
import HotelDetails from './HotelDetails/HotelDetails'

import "../styles/Home.css";
import { Outlet } from 'react-router-dom'
import FlightOffer from './FlightDetails/FlightOfferDetails/FlightOffer'
import Footer from './Footer/Footer'

function Home() {
    return (
        <div className='HomeParent'>
            <FlightDetails />
            <FlightOffer />

            <div><Footer /></div>

            <Outlet />
        </div>
    )
}

export default Home
