import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'Mohammad Ali',
        email: 'mdsali914@gmail.com',
        contactNumber: '6263370106',
        country: 'India',
    });


    const userDetails = {
        Name: "Mohammad Ali",
        Email: "mdsali914@gmail.com",
        ContactNumber: "6263370106",
        Country: "India",
        jfskdjf: "skfjksdjf"
    }

    // Add the appType here




    const handleBooking = async () => {
        try {
            console.log();
            const response = await axios.post(
                'https://academics.newtonschool.co/api/v1/bookingportals/booking',
                userDetails,  // Move the payload here
                {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NGQ2Mjc4OGY4MTQ3ZjA3OTY3YTUwYSIsImlhdCI6MTY5OTU3MDU5NywiZXhwIjoxNzMxMTA2NTk3fQ.82Ck338C4dDXlU-Blk-CF0u_NiqJr3aidIgxWCBgX9U`,
                        projectID: '9sa80czkq1na',
                    },
                }
            );

            console.log('Booking successful:', response.data);
        } catch (error) {
            console.error('Booking failed:', error);
        }
    };

    useEffect(() => {
        handleBooking()
    }, [])

    return (
        <div>

        </div>
    );
};

export default CheckoutPage;
