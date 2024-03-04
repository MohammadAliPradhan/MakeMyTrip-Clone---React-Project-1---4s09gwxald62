
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
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




    const fromSearch = useRef();
    const toSearch = useRef();



    //maintaining counter to have check
    const [checkSortByHighest, setCheckSortByHighest] = useState(false);
    const [checkSortByCheapest, setCheckSortByCheapest] = useState(false);

    const location = useLocation();
    console.log("locationStaete", location);

    const from = location.state.TrainPlace.from;
    const to = location.state.TrainPlace.to;
    const dayWeek = location.state.dayWeek;



    const sortByCheapest = () => {
        const sortedFlights = [...singleInfoPageOfFlight];
        sortedFlights.sort((a, b) => {
            return a.fare - b.fare;
        });
        setSingleInfoPageOfFlight(sortedFlights);
        setCheckSortByCheapest(!checkSortByCheapest);
    };

    const sortByHighest = () => {
        const sortedFlights = [...singleInfoPageOfFlight];
        sortedFlights.sort((a, b) => {
            return b.fare - a.fare;
        });
        setSingleInfoPageOfFlight(sortedFlights);
        setCheckSortByHighest(!checkSortByHighest);
        
    };

    
    async function getTrainList(value1, value2){

        console.log(value1, value2);

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
            const result = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${value1 ? value1 : from}","destination":"${value2 ? value2 : to}"}&day=${dayWeek}`,
                config
            )
            setSingleInfoPageOfFlight(result.data.data.trains)
            console.log("this is result", result);
            console.log(resultForSuggestion);
        } catch(e){
            console.log(e);
        }
       
    }



    useEffect(()=>{
        if(checkSortByCheapest === false){
            getTrainList()
        }
    }, [checkSortByCheapest])


    useEffect(()=>{
        if(checkSortByHighest === false){
            getTrainList()
        }
    }, [checkSortByHighest])


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
        const source = fromSearch.current.value ? fromSearch.current.value : from;
        const destination = toSearch.current.value ? toSearch.current.value : to;
        
        let coaches = singleInfoPageOfFlight.filter((details) => {
            return details._id === info || details.coaches.some(coach => coach._id === info);
        });
    
        coaches = coaches.length > 0 ? coaches : singleInfoPageOfFlight[0];
        
        console.log(singleInfoPageOfFlight[0]);
        console.log(coaches);
        
        navigate(`/traindetail/${info}`, { state: { MemberValuee, source, destination, coaches } });
    }


    const searchAgain = () => {
        let from = fromSearch.current.value;
        let to = toSearch.current.value;
    
        getTrainList(from, to)
    }

    return (
        <>
            <ScrollNavBar />
            <div>
                <div className='searchPage-header-container'>
                    <div className='searchMobileRes' style={{display: "flex", gap: "30px"}}>
                        <section className='searchPage-booking-details-container'>
                            <div className='searchPage-booking-input'>
                                <label htmlFor="fromcity" className='searchPage-booking-inputBox'>
                                    <span style={{textTransform: "uppercase"}}>From</span>
                                    <input ref={fromSearch} placeholder="Enter City" type="text" id='railway-input' />
                                </label>
                            </div>


                            <div className='searchPage-booking-input'>
                                <label htmlFor="toCity" className='searchPage-booking-inputBox'>
                                    <span style={{textTransform: "uppercase"}}>To</span>
                                    <input ref={toSearch} placeholder="Enter City" type="text" id="railway-input" />
                                </label>
                            </div>
                        </section>
                        <section>
                            <p style={{display: "flex", justifyContent: "center"}}>
                                <button onClick={searchAgain} className='railway-search'>SEARCH</button>
                            </p>
                        </section>
                    </div>
                </div>
                <div id='paentpaent' className="paentpaent">
                    <div style={{position:"relative", top: "100px", display: "flex"}} className='quick-filters'>
                        <div style={{display:"flex", flexDirection:"column", gap:"0.8rem" , textAlign:"left"}} className='railfilters'>
                            <h4>Quick Filters</h4>
                            <label style={{textAlign: "center"}} htmlFor="ac">
                                <input checked={checkSortByHighest}    onClick={sortByHighest}  type="checkbox" id="sortfilter" name='Highest'/>
                                Sort By Highest
                            </label>

                            <label htmlFor="ac">
                                <input checked={checkSortByCheapest} onClick={sortByCheapest} type="checkbox" id="sortfilter" name='lowest'/>
                                Sort By Lowest
                            </label>
                        </div>
                    </div>
                 <div class="parentContainer">

                    {singleInfoPageOfFlight?.map((details) => (
                        <div id='singlepaddingtrain' class="single-train-detail single-train-padding">
                            <div class="flex train-info" id='flex'>
                                <div id='special' class="left-info flex flex-column "  >
                                    <div class="train-name">{details.trainName}</div>
                                    <div id='flex'  class="flex train-depart-number">
                                        <div>#12987</div>
                                        <div style={{ margin: '0px 10px' }}>|</div>
                                        <div>Departs on : {details.daysOfOperation.map((coach) => (
                                            <span class="green"><b>{coach}</b> </span>
                                        ))}</div>
                                    </div>
                                </div>
                                <div id='flex' class="right-info flex flex-column">
                                    <div id='flex' class="flex">
                                        <div id='flex'     class="flex flex-column">
                                            <div class="depart-time">{details.arrivalTime} , Thu</div>
                                            <div class="station-name">{details.source} (SDAH)</div>
                                        </div>
                                        <div  id='flex' class="flex flex-column">
                                            <div id='flex' class="jouney-duration flex align-center"><span
                                                class="jouney-duration-line"></span><span class="duration"><b>{details.travelDuration}</b>

                                                </span><span class="jouney-duration-line"></span></div>
                                        </div>
                                        <div id='flex' class="flex flex-column">
                                            <div class="arrival-time">{details.arrivalTime}, Fri</div>
                                            <div class="station-name">{details.destination}   (CNB)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* heres the catch 1 */}

                            <div class="trainSubsChild">
                                {details.coaches.map((infos) => (
                                    <div id='flex' class="flex-column flex m-r-15" onClick={() => handleOnClickId(infos._id)}>
                                        <div id="train_options_16-11-2023_0" class="card ">
                                            <div id='flex' class="flex align-center justify-space-between"
                                                style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                                                <div id='flex' class="flex align-center">
                                                    <div class="rail-class">{infos.coachType}</div>
                                                </div>
                                                <div class="ticket-price justify-flex-end"><span>₹</span> {details.fare}</div>
                                            </div>
                                            <div id='flex' class="flex align-center justify-space-between" style={{ marginBottom: '15px' }}>
                                                <div class="availibilty-info" style={{ color: 'rgb(240, 152, 25)' }}>SEATS {infos.numberOfSeats}</div>
                                            </div>
                                            <div class="railofy-texts-container"><span class="railofy-texts free-cancellation-text">{details.trainType}</span></div>
                                            <div class="update-info">Updated 10 hrs ago</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id='flex' class="flex">
                                <div id='flex'  class="false dropdown-options flex align-center"><span>Nearby dates</span><span
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