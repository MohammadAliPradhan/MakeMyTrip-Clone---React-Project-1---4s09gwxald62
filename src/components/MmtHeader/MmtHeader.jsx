import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import "./MmtHeader.css"
import { faBus, faHotel, faHouse, faPlaneDeparture, faSuitcaseRolling, faTaxi, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function MmtHeader() {
    return (
        <>
            <div className='MmtParentForMiddle'>
                <div className='MmtParent'>
                    <div className="componentsStyle">

                        <div className='single-single-component '> <NavLink to="/" className='textdecon'>
                            <FontAwesomeIcon icon={faPlaneDeparture} size="2xl" style={{ color: "black  ", }} />
                            <li className='icon-no-link'>Flights</li></NavLink>
                        </div>


                        <div className='single-single-component '><NavLink to="/hotel" className='textdecon'>
                            <FontAwesomeIcon icon={faHotel} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Hotels</li>
                        </NavLink>
                        </div>

                        <div className='single-single-component '><NavLink to="/train" className='textdecon'>
                            <FontAwesomeIcon icon={faTrain} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Trains</li></NavLink>
                        </div>

                        <div className='single-single-component NoShow'><NavLink to="/allotherroute" className='textdecon'>
                            <FontAwesomeIcon icon={faHouse} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>HomeStays</li>
                        </NavLink>
                        </div>

                        <div className='single-single-component NoShow'><NavLink to="/allotherroute" className='textdecon'>
                            <FontAwesomeIcon icon={faSuitcaseRolling} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Holidays</li>
                        </NavLink>
                        </div>



                        <div className='single-single-component NoShow'><NavLink to="/allotherroute" className='textdecon'>
                            <FontAwesomeIcon icon={faBus} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Buses</li>
                        </NavLink>
                        </div>


                        <div className='single-single-component NoShow'><NavLink to="/allotherroute" className='textdecon'>
                            <FontAwesomeIcon icon={faTaxi} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Cabs</li>
                        </NavLink>
                        </div>



                    </div>
                </div>
            </div >

            <Outlet />

        </>
    )
}

export default MmtHeader
