
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import "./trainswholeList.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleArrowLeft, faCircleRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { getHeaderWithProjectId } from '../../Authenticaltion/utils/service';
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar';
import Footer from '../../Footer/Footer';
function TrainSinglePage() {
    const [singleInfoPageOfFlight, setSingleInfoPageOfFlight] = useState()
    const { flightId } = useParams();
    const testFlightId = flightId;
    console.log(testFlightId);

    const location = useLocation();
    console.log("locationStaete", location);


    const originalDate = location.state.TravelDate;
    const dateObject = new Date(originalDate);

    const dayOfWeekOptions = { weekday: 'short' };
    const dayOfWeek = dateObject.toLocaleDateString(undefined, dayOfWeekOptions);

  


    async function getTrainList(){

        const config = {
            headers : {
                "Content-Type": "application/json",
                projectID: "f104bi07c490"
            }
        }
        
        try{
            const resultForSuggestion = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${""}","destination":"${""}"}&day=${"Mon"}`,
                config
            )
            const result = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${"Howrah Junction"}","destination":"${"Chandigarh"}"}&day=${"Mon"}`,
                config
            )
            setSingleInfoPageOfFlight(result.data.data.trains)
            console.log("this is result", result);
            console.log(resultForSuggestion);
        } catch(e){
            console.log(e);
        }
       
    }


    //Howrah Junction
    //Chandigarh


    useEffect(() => {
        getTrainList()
    }, [])
    const navigate = useNavigate();

    console.log(location.state.MemberValue);

    const [MemberValuee, setMemberValue] = useState(location.state.MemberValue)
    console.log(MemberValuee);



    function handleOnClickId(info) {
        console.log(info);
        navigate(`/traindetail/${info}`, { state: { MemberValuee } })
    }

    return (
        <>
            <ScrollNavBar />
            <div>
                <div className='searchPage-header-container'>
                    <div style={{display: "flex", gap: "30px"}}>
                        <section className='searchPage-booking-details-container'>
                            <div className='searchPage-booking-input'>
                                <label htmlFor="fromcity" className='searchPage-booking-inputBox'>
                                    <span style={{textTransform: "uppercase"}}>From</span>
                                    <input type="text" id='railway-input' />
                                </label>
                            </div>


                            <div className='searchPage-booking-input'>
                                <label htmlFor="toCity" className='searchPage-booking-inputBox'>
                                    <span style={{textTransform: "uppercase"}}>To</span>
                                    <input type="text" id="railway-input" />
                                </label>
                            </div>
                        </section>
                        <section>
                            <p style={{display: "flex", justifyContent: "center"}}>
                                <button className='railway-search'>SEARCH</button>
                            </p>
                        </section>
                    </div>
                </div>
                <div className="paentpaent">
                    <div style={{position:"relative", top: "100px"}} className='quick-filters'>
                        <div style={{display:"flex", flexDirection:"column", gap:"0.8rem" , textAlign:"left"}} className='railfilters'>
                            <h4>Quick Filters</h4>
                            <label style={{textAlign: "center"}} htmlFor="ac">
                                <input type="checkbox" id="sortfilter" name='Highest'/>
                                Sort By Highest
                            </label>

                            <label htmlFor="ac">
                                <input type="checkbox" id="sortfilter" name='lowest'/>
                                Sort By Lowest
                            </label>
                        </div>
                    </div>
                 <div class="parentContainer">

                    {singleInfoPageOfFlight?.map((details) => (
                        <div class="single-train-detail single-train-padding">
                            <div class="flex train-info">
                                <div class="left-info flex flex-column">
                                    <div class="train-name">{details.trainName}</div>
                                    <div class="flex train-depart-number">
                                        <div>#12987</div>
                                        <div style={{ margin: '0px 10px' }}>|</div>
                                        <div>Departs on : {details.daysOfOperation.map((coach) => (
                                            <span class="green"><b>{coach}</b> </span>
                                        ))}</div>
                                    </div>
                                </div>
                                <div class="right-info flex flex-column">
                                    <div class="flex">
                                        <div class="flex flex-column">
                                            <div class="depart-time">{details.arrivalTime} , Thu</div>
                                            <div class="station-name">{details.source} (SDAH)</div>
                                        </div>
                                        <div class="flex flex-column">
                                            <div class="jouney-duration flex align-center"><span
                                                class="jouney-duration-line"></span><span class="duration"><b>{details.travelDuration}</b>

                                                </span><span class="jouney-duration-line"></span></div>
                                        </div>
                                        <div class="flex flex-column">
                                            <div class="arrival-time">{details.arrivalTime}, Fri</div>
                                            <div class="station-name">{details.destination}   (CNB)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* heres the catch 1 */}

                            <div class="trainSubsChild">
                                {details.coaches.map((infos) => (
                                    <div class="flex-column flex m-r-15" onClick={() => handleOnClickId(infos._id)}>
                                        <div id="train_options_16-11-2023_0" class="card ">
                                            <div class="flex align-center justify-space-between"
                                                style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                                <div class="flex align-center">
                                                    <div class="rail-class">{infos.coachType}</div>
                                                </div>
                                                <div class="ticket-price justify-flex-end"><span>₹</span> {details.fare}</div>
                                            </div>
                                            <div class="flex align-center justify-space-between" style={{ marginBottom: '15px' }}>
                                                <div class="availibilty-info" style={{ color: 'rgb(240, 152, 25)' }}>SEATS {infos.numberOfSeats}</div>
                                            </div>
                                            <div class="railofy-texts-container"><span class="railofy-texts free-cancellation-text">{details.trainType}</span></div>
                                            <div class="update-info">Updated 10 hrs ago</div>
                                        </div>
                                    </div>
                                ))}
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

            </div>
            


        </>
    )
}

export default TrainSinglePage