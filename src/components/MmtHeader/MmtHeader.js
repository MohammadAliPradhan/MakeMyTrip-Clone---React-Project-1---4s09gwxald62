import React from 'react'
import { Outlet } from 'react-router-dom'
import "./MmtHeader.css"

function MmtHeader() {
    return (
        <>
        <div className='MmtParentForMiddle'>
        <div className='MmtParent'>
            This is MMT MmtHeader
        </div>
        </div>
        
         <Outlet />

         </>
    )
}

export default MmtHeader
