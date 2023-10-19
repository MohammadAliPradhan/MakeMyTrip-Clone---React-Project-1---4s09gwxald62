import React from 'react'
import { Outlet } from 'react-router-dom'
import "./MmtHeader.css"

function MmtHeader() {
    return (
        <>
        <div className='MmtParentForMiddle'>
        <div className='MmtParent'>
            <div className="componentsStyle">
            <div>flights</div>
            <div>hotels</div>
            <div className="mobDontShow">homestays</div>
            <div className="mobDontShow">holiday</div>
            <div>trains</div>
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
