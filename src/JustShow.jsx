import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


function JustShow() {


    const [hotels, SetHotels] = useState([]);
    const [inputVal, setInputVal] = useState({
        val: 'proxy',
    });
    const hotelId = "6527dc50de44dd75f5273b8c"
    const [submitedValue, setSubmitedValue] = useState()
    async function getMusicList(hotelId) {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        console.log(hotelId);
        console.log();
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`, config)
        SetHotels(response.data.data.hotels)
        // setShow(response.data)
        console.log(response);
    };

    function handleOnSubmit(e) {
        e.preventDefault()
        setSubmitedValue(inputVal.val)
    }

    useEffect(() => {
        getMusicList(hotelId);
    }, [submitedValue])

    const location = useLocation()
    console.log(location);
    return (
        <>
            hi
        </>
    );
}

export default JustShow