import React from 'react'
import NavBar from './NavBar/NavBar'
import MmtHeader from './MmtHeader/MmtHeader'
import FlightDetails from './FlightDetails/FlightDetails'
import HotelDetails from './HotelDetails/HotelDetails'

import "../styles/Home.css";
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className='HomeParent'>
            <FlightDetails />
          
            <Outlet />
        </div>
    )
}

export default Home
