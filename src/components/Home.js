import React from 'react'
import NavBar from './NavBar/NavBar'
import MmtHeader from './MmtHeader/MmtHeader'
import FlightDetails from './FlightDetails/FlightDetails'
import "../styles/Home.css";

function Home() {
    return (
        <div className='HomeParent'>
            <FlightDetails />
        </div>
    )
}

export default Home
