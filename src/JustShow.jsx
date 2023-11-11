import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom';


function JustShow() {


    const [hotels, SetHotels] = useState([]);
    const [inputVal, setInputVal] = useState({
        val: 'proxy',
    });
    const [submitedValue, setSubmitedValue] = useState()
    const location = useLocation()


    //These all are api related variables
    console.log("finally reached", location);
    const checkInDate = location.state.item.checkInClear;
    const checkOutDate = location.state.item.checkOutClear;
    const hotelId = location.state.item.singleId;
    const token = JSON.parse(sessionStorage.getItem("userToken"))
    console.log(token);

    async function getMusicList(hotelId) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                projectID: "9sa80czkq1na",

            }
        }

        console.log();
        const response = await axios.post(`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
            {
                bookingType: "hotel",
                bookingDetails: {
                    hotelId: hotelId,
                    startDate: checkInDate,
                    endDate: checkOutDate
                }
            },
            config,

        )

        // setShow(response.data)
        console.log(response);
    };

    function handleOnSubmit(e) {
        e.preventDefault()
        setSubmitedValue(inputVal.val)
    }

    useEffect(() => {
        getMusicList(hotelId);
    }, [])


    return (
        <>
            hi
        </>
    );
}

export default JustShow