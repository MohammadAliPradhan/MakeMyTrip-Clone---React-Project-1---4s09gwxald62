import React from 'react'
import { Outlet } from 'react-router-dom'
import "./MmtHeader.css"

function MmtHeader() {
    return (
        <>
        <div className='MmtParent'>
            This is MMT MmtHeader
           
        </div>
         <Outlet />

         </>
    )
}

export default MmtHeader
