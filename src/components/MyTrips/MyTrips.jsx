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


    //converting time 

    function convertToIST(timestamps) {
        const istOptions = { timeZone: 'Asia/Kolkata', hour12: true, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

        const istDateStrings = timestamps.map(utcTimestamp => {
            const date = new Date(utcTimestamp);
            return new Intl.DateTimeFormat('en-US', istOptions).format(date);
        });

        return istDateStrings;
    }

    const utcTimestamps = ["2023-12-02T21:10:47.616Z", "2023-12-01T15:30:00.000Z"];
    const istDateStrings = convertToIST(utcTimestamps);

    istDateStrings.forEach(dateString => {
        console.log(dateString);
    });



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

                            details.hotel ? (
                                <div className='mytripsfirstChild' key={details.id}>
                                    <span>Booking Type: {details.booking_type === "hotel" ? "Hotel" : null} </span>
                                    <span>Name: {details?.hotel.name} </span>
                                    <span>Location: {details.hotel.location}</span>
                                    <span>Free Cancellation upto 24 hours</span>
                                    <span>Booking Timing: {new Date(details?.user.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })} </span>

                                    <h4 className='status-c'>Status: {details.status === "confirmed" ? "Confirmed" : null}</h4>
                                </div>
                            ) : (
                                <div className='mytripsfirstChild' key={details.id}>
                                    <span>Booking Type:  {details?.booking_type === "flight" ? "Flight" : null}</span>
                                    <span>Name: NA </span>
                                    <span>Location: NA</span>
                                    <span>Cancellation: Sorry No Cancellation Available</span>
                                    <span>Booking Timing: {new Date(details?.user.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', hour12: true })} </span>

                                    <h4 className='status-c'>Status: {details.status === "confirmed" ? "Confirmed" : null}  </h4>
                                </div>
                            )

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
