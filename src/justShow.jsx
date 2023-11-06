import axios from 'axios'
import React, { useEffect, useState } from 'react'



function justShow() {


    const [hotels, SetHotels] = useState([]);
    const [inputVal, setInputVal] = useState({
        val: 'proxy',
    });
    const [submitedValue, setSubmitedValue] = useState('')
    async function getMusicList(location) {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        console.log("location", location);
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`, config)
        SetHotels(response.data.data.hotels)
        // setShow(response.data)
    };

    function handleOnSubmit(e) {
        e.preventDefault()
        setSubmitedValue(inputVal.val)

    }

    useEffect(() => {
        getMusicList(submitedValue);
    }, [submitedValue])
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="text"
                    value={inputVal.val}
                    onChange={(e) => setInputVal({ val: e.target.value })}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                {hotels.map((hotel) => (
                    <div key={hotel._id}>
                        <h2>{hotel.name}</h2>
                        <p>Location: {hotel.location}</p>
                        <p>Rating: {hotel.rating}</p>
                        <ul>
                            {hotel.amenities.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                            ))}
                        </ul>
                        <div>
                            {hotel.images.map((image, index) => (
                                <img key={index} src={image} alt={`Image ${index}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default justShow
