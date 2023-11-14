import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "./MmtHeader.css"
import { faHotel, faPlaneDeparture, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function MmtHeader() {
    return (
        <>
            <div className='MmtParentForMiddle'>
                <div className='MmtParent'>
                    <div className="componentsStyle">

                        <div className='single-single-component'> <Link to="/" className='textdecon'>
                            <FontAwesomeIcon icon={faPlaneDeparture} size="2xl" style={{ color: "black  ", }} />
                            <li className='icon-no-link'>Flights</li></Link>
                        </div>


                        <div className='single-single-component'><Link to="/hotel" className='textdecon'>
                            <FontAwesomeIcon icon={faHotel} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Hotels</li>
                        </Link>
                        </div>


                        <div className='single-single-component'><Link to="/hotel" className='textdecon'>
                            <FontAwesomeIcon icon={faHotel} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>HomeStays</li>
                        </Link>
                        </div>

                        <div className='single-single-component'><Link to="/hotel" className='textdecon'>
                            <FontAwesomeIcon icon={faHotel} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Holidays</li>
                        </Link>
                        </div>


                        <div className='single-single-component'><Link to="/train" className='textdecon'>
                            <FontAwesomeIcon icon={faTrain} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Trains</li></Link>
                        </div>

                        <div className='single-single-component'><Link to="/hotel" className='textdecon'>
                            <FontAwesomeIcon icon={faHotel} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Buses</li>
                        </Link>
                        </div>


                        <div className='single-single-component'><Link to="/hotel" className='textdecon'>
                            <FontAwesomeIcon icon={faHotel} size="2xl" style={{ color: "black", }} />
                            <li className='icon-no-link'>Cabs</li>
                        </Link>
                        </div>



                    </div>
                </div>
            </div >

            <Outlet />

        </>
    )
}

export default MmtHeader
