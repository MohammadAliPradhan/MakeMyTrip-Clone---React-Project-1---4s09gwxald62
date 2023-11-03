import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "./MmtHeader.css"
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function MmtHeader() {
    return (
        <>
            <div className='MmtParentForMiddle'>
                <div className='MmtParent'>
                    <div className="componentsStyle">

                        <div> <Link to="/flight">
                            <FontAwesomeIcon icon={faPlaneDeparture} size="2xl" style={{ color: "#4f8bd8", }} />
                            <li className='icon-no-link'>flights</li></Link>
                        </div>


                        <div><Link to="/hotel">
                            <FontAwesomeIcon icon={faPlaneDeparture} size="2xl" style={{ color: "#4f8bd8", }} />
                            <li className='icon-no-link'>hotels</li>
                        </Link>
                        </div>
                        <div className="mobDontShow">homestays</div>
                        <div className="mobDontShow">holiday</div>
                        <Link to="/train"><li className='icon-no-link'>trains</li></Link>
                        <div className="mobDontShow">buses</div>
                        <div className="mobDontShow">cabs</div>
                        <div className="mobDontShow">forexcard</div>
                        <div className="mobDontShow">travelinsurance</div>

                    </div>
                </div>
            </div >

            <Outlet />

        </>
    )
}

export default MmtHeader
