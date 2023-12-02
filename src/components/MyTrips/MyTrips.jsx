import React, { useEffect, useState } from 'react'
import "./mytrips.css"
import axios from 'axios'
import { getHeaderWithProjectId } from '../Authenticaltion/utils/service';
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar';

function MyTrips() {
    const token = JSON.parse(sessionStorage.getItem("userToken"))
    const [apiDetails, setapiDetails] = useState();

    async function getMyTrips() {
        try {
            const config = {
                headers: {
                    projectID: getHeaderWithProjectId(),
                    Authorization: `Bearer ${token}`,
                }
            }
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
                config, {
                bookingType: "hotel",
                bookingDetails: {
                    "something": "something"
                }
            },

            );
            setapiDetails(response);
            console.log("ues", response);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyTrips();
    }, [])
    return (
        <><ScrollNavBar />

            <div className='mytirpsParentcontainer'>
                <h2 className='headingMyTrips'>My Trips</h2>
                {apiDetails?.data.data.map((details) => (
                    <div className='mytripsfirstChild'>
                        <span>Booking Type: {details.booking_type === "hotel" ? "Hotel" : null} </span>
                        <span>Name: {details.hotel.name} </span>
                        <span>Location: {details.hotel.location}</span>
                        <span>Lorem Ipsum</span>
                        <h4 className='status-c'>Status: {details.status === "confirmed" ? "Confirmed" : null}</h4>
                    </div>
                ))

                }
            </div>
        </>
    )
}

export default MyTrips
