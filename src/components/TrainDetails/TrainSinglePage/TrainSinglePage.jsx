
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import "./trainswholeList.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleArrowLeft, faCircleRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getHeaderWithProjectId } from '../../Authenticaltion/utils/service';
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar';
function TrainSinglePage() {
    const [singleInfoPageOfFlight, setSingleInfoPageOfFlight] = useState()
    const { flightId } = useParams();
    const testFlightId = flightId;
    console.log(testFlightId);

    const location = useLocation();
    console.log("locationStaete", location);



    async function TrainSection() {
        try {
            const from = location.state.TrainPlace.from;
            const to = location.state.TrainPlace.to;
            const config = getHeaderWithProjectId()
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${from}","destination":"${to}"}&day=Fri`, config);
            setSingleInfoPageOfFlight(response.data.data.trains)
            console.log("this is response", response);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        TrainSection()
    }, [])
    const navigate = useNavigate();



    function handleNavigate(info) {
        console.log(info);
        navigate(`/traindetail/${info}`)
    }

    return (
        <div>
            <ScrollNavBar />
            <div className='parent-container-trainsingle'>
                {singleInfoPageOfFlight?.map((details) => (
                    <div className='searchItem-train'>
                        <div className="siDesc">
                            <h1 className="siTitle">sdfsdf</h1>
                            <span className="siDistance">lore</span>
                            <span className="siTaxiOp">pakore</span>
                            <span className="siSubtitle">sakore</span>
                            <span className="siFeatures">mashware</span>
                            <span className="siCancelOp">mashwakanta</span>
                            <span className="siCancelOpSubtitle">You can cancel later</span>
                        </div>
                        <div className="siDetails">
                            <div className="siRating">
                                <span>Excellent</span>
                                <button>8.9</button>
                            </div>

                            <div className="siDetailTexts">
                                <span className='siPrice'>rs majur</span>
                                <span className='siTaxOp'>Includes taxes and fees</span>
                                <button className='siCheckButton' onClick={() => handleNavigate(details._id)}>See Availability</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrainSinglePage