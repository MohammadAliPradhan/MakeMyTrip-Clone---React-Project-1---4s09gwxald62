import React, { useContext, useEffect, useState } from 'react'
import "./mytrips.css"
import axios from 'axios'
import { getHeaderWithProjectId } from '../Authenticaltion/utils/service';
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../App';

function MyTrips() {
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext);
    const [Loading, setLoading] = useState(false);
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
            setLoading(true)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        getMyTrips();
    }, [])
    return (
        <>
            <ScrollNavBar />
            {isLoggedin === false ? (
                <h2 className='textAlign'>Login First</h2>
            ) : (
                Loading === true ? (
                    <div className='mytirpsParentcontainer'>
                        <h2 className='headingMyTrips'>My Trips</h2>
                        {apiDetails?.data.data.map((details) => (
                            <div className='mytripsfirstChild' key={details.id}>
                                <span>Booking Type: {details.booking_type === "hotel" ? "Hotel" : null} </span>
                                <span>Name: {details.hotel.name} </span>
                                <span>Location: {details.hotel.location}</span>
                                <span>Free Cancellation upto 24 hours</span>
                                <h4 className='status-c'>Status: {details.status === "confirmed" ? "Confirmed" : null}</h4>
                            </div>
                        ))}
                        <Footer />
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            )}
        </>
    );
}

export default MyTrips
