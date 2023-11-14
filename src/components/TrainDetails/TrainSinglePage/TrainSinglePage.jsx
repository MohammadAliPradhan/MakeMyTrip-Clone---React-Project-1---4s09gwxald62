
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
        <>
            <div class="paentpaent">
                <div class="parentContainer">

                    {singleInfoPageOfFlight?.map((details) => (
                        <div class="single-train-detail single-train-padding">
                            <div class="flex train-info">
                                <div class="left-info flex flex-column">
                                    <div class="train-name">Sdah Aii Sf Exp</div>
                                    <div class="flex train-depart-number">
                                        <div>#12987</div>
                                        <div style={{ margin: '0px 10px' }}>|</div>
                                        <div>Departs on : &nbsp;<span class="green"><b>S</b> &nbsp;</span><span
                                            class="green"><b>M</b>
                                            &nbsp;</span><span class="green"><b>T</b> &nbsp;</span><span class="green"><b>W</b>
                                                &nbsp;</span><span class="green"><b>T</b> &nbsp;</span><span class="green"><b>F</b>
                                                &nbsp;</span><span class="green"><b>S</b> &nbsp;</span></div>
                                    </div>
                                </div>
                                <div class="right-info flex flex-column">
                                    <div class="flex">
                                        <div class="flex flex-column">
                                            <div class="depart-time">10:55 PM, Thu</div>
                                            <div class="station-name">Kolkata Sealdah Railway Station (SDAH)</div>
                                        </div>
                                        <div class="flex flex-column">
                                            <div class="jouney-duration flex align-center"><span
                                                class="jouney-duration-line"></span><span class="duration"><b>15</b> hrs
                                                    <b>30</b>
                                                    mins</span><span class="jouney-duration-line"></span></div>
                                            <div class="view-routes">View route</div>
                                        </div>
                                        <div class="flex flex-column">
                                            <div class="arrival-time">2:25 PM, Fri</div>
                                            <div class="station-name">Kanpur Central Railway Station (CNB)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="trainSubsChild">
                                <div class="flex-column flex m-r-15">
                                    <div id="train_options_16-11-2023_0" class="card ">
                                        <div class="flex align-center justify-space-between"
                                            style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                            <div class="flex align-center">
                                                <div class="rail-class">SL</div>
                                            </div>
                                            <div class="ticket-price justify-flex-end"><span>₹</span> 520</div>
                                        </div>
                                        <div class="flex align-center justify-space-between" style={{ marginBottom: '15px' }}>
                                            <div class="availibilty-info" style={{ color: 'rgb(240, 152, 25)' }}>PQWL 144</div>
                                        </div>
                                        <div class="railofy-texts-container"><span class="railofy-texts free-cancellation-text">Free
                                            Cancellation</span></div>
                                        <div class="update-info">Updated 10 hrs ago</div>
                                    </div>
                                </div>
                                <div class="flex-column flex m-r-15">
                                    <div id="train_options_16-11-2023_1" class="card ">
                                        <div class="flex align-center justify-space-between"
                                            style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                            <div class="flex align-center">
                                                <div class="rail-class">3A</div>
                                            </div>
                                            <div class="ticket-price justify-flex-end"><span>₹</span> 1365</div>
                                        </div>
                                        <div class="flex align-center justify-space-between" style={{ marginBottom: '15px', fontWeight: 'bold' }}>
                                            <div class="availibilty-info" style={{ color: 'rgb(240, 152, 25)' }}>PQWL 48</div>
                                        </div>
                                        <div class="railofy-texts-container"><span class="railofy-texts free-cancellation-text">Free
                                            Cancellation</span></div>
                                        <div class="update-info">Updated 11 hrs ago</div>
                                    </div>
                                </div>
                                <div class="flex-column flex m-r-15">
                                    <div id="train_options_16-11-2023_2" class="card ">
                                        <div class="flex align-center justify-space-between"
                                            style={{ marginBottom: '5px', fontWeight: 'bold', color: 'rgb(240, 152, 25)' }}>
                                            <div class="flex align-center">
                                                <div class="rail-class">2A</div>
                                            </div>
                                            <div class="ticket-price justify-flex-end"><span>₹</span> 1940</div>
                                        </div>
                                        <div class="flex align-center justify-space-between" style={{ marginBottom: '15px' }}>
                                            <div class="availibilty-info" style={{ color: 'rgb(240, 152, 25)' }}>PQWL 19</div>
                                        </div>
                                        <div class="railofy-texts-container"><span class="railofy-texts free-cancellation-text">Free
                                            Cancellation</span></div>
                                        <div class="update-info">Updated 1 day ago</div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="false dropdown-options flex align-center"><span>Nearby dates</span><span
                                    class="appendLeft10 arrowTab downArrowTab"></span></div>
                            </div>
                        </div>
                    ))


                    }
                </div>

            </div >
        </>
    )
}

export default TrainSinglePage