import React from 'react'
import { Outlet , Link} from 'react-router-dom'
import "./MmtHeader.css"


function MmtHeader() {
    return (
        <>
        <div className='MmtParentForMiddle'>
        <div className='MmtParent'>
            <div className="componentsStyle">
            <Link to="/flight"><div className="flightShow">flights</div></Link>
            <Link to="/hotel"><div>hotels</div></Link>
            <div className="mobDontShow">homestays</div>
            <div className="mobDontShow">holiday</div>
            <Link to="/train"><div>trains</div></Link>
            <div className="mobDontShow">buses</div>
            <div className="mobDontShow">cabs</div>
            <div className="mobDontShow">forexcard</div>
            <div className="mobDontShow">travelinsurance</div>
            </div>
        </div>
        </div>
        
         <Outlet />

         </>
    )
}

export default MmtHeader
