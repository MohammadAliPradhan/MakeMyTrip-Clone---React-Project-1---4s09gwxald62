import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Calendar from 'react-calendar'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./TrainDetails.css"
import axios from 'axios'
import { getHeaderWithProjectId } from '../Authenticaltion/utils/service'
import FindMembers from '../FindMembers/FindMembers'
import { fromStations, toStations } from '../Modals/TrainsNames'






function TrainDetails() {


    const [modalInput, setModalInput] = useState(false);


    const [modalInputTO, setModalInputTO] = useState(false);


    const [TrainFromData, SetTrainFromData] = useState(fromStations);
    const [trainto, setTrainto] = useState(toStations); 





    const initialDate = new Date('Wed Nov 15 2023 00:00:00 GMT+0530');
    const [TravelDate, setTravelDate] = useState(initialDate);
    const [MemberValue, setMemberValue] = useState({
        adult: 1,
        kids: 0
    })
    const [trthly, setTrthly] = useState(true);
    const [TrainPlace, setTrainPlace] = useState({
        from: "Secunderabad",
        to: "Varanasi",

    })
    const [findMemberModal, setFindMemberModal] = useState();

    function handleTrainChange(e, field) {
        const { value } = e.target;
        console.log("This is", value);
        setTrainPlace((oldState) => ({
            ...oldState,
            [field]: value
        }))
        console.log("Hi This is the chagne", TrainPlace.from);
        TrainSection({ ...TrainPlace, [field]: value });
    }

    async function TrainSection(updatedState) {
        try {
            console.log("This is from", updatedState.from);
            console.log("This is to", updatedState.to);
            const config = getHeaderWithProjectId()
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/train?search={"source":"${updatedState.from}","destination":"${updatedState.to}"}&day=Fri`, config);
            console.log("this is response", response);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDateChange = (date) => {
        setTravelDate(date);
        setTrthly(true);
    };
    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    function handleCalendarOnOf() {
        setTrthly(true)
    }



    useEffect(() => {
        TrainSection(TrainPlace)
    }, [TrainPlace])

    const navigate = useNavigate();
    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }

  


    //getCityName

    function handleGetCityName(event) {
        const { value } = event.target;
        let filteredSearch = fromStations.filter((data) => {
            let cityName =data.toLowerCase();
            console.log(cityName);
            let result = value.toLowerCase();
            console.log(result);
            if (cityName.includes(result)) {
                console.log(true);
                return data
            }
        })        
        SetTrainFromData(filteredSearch);
    }


    //VelueSetter
    function valuesetter(val) {
        console.log(val);
        if (val) {
            setTrainPlace((oldState) => ({
                ...oldState,
                from: val,
            }))
        } else {
            setTrainPlace((oldState) => ({
                ...oldState,
                from: val,
            }))
        }
        setModalInput(false);
    }

    //getCityEndHere

    function valuesetterTwo(val) {
        console.log(val);
        if (val) {
            setTrainPlace((oldState) => ({
                ...oldState,
                to: val,
            }))
        } 
        else {
            setTrainPlace((oldState) => ({
                ...oldState,
                to: val,
            }))
        }
        setModalInputTO(false);
    }


    function handleGetCityName(event) {
        const { value } = event.target;
        let filteredSearch = toStations.filter((data) => {
            let cityName =data.toLowerCase();
            let result = value.toLowerCase();
            if (cityName.includes(result)) {
                console.log(true);
                return data
            }
        })
        setTrainto(filteredSearch);
    }

    //getCitytoends here these are dropdown inputs


    //dates and times 


    const alldate = TravelDate.toDateString();

    const year = alldate.substring (13,15);
    const month = alldate.substring(5, 7);
    const day = alldate.substring(8, 10);

    const dayWeek = TravelDate.toDateString().substring(0,4);
    const monthWord = TravelDate.toDateString().substring(4,7);

    console.log(year, month, day, dayWeek, monthWord);


    function handleOnSubmit(e) {
        e.preventDefault()
        navigate("/trainsingle", { state: { TrainPlace, MemberValue, dayWeek  } })
    }







    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 1, 10);

    return (
        <>

            <div className="DetailsParent">
                <div style={{ position: "relative" }} className='Details'>
                    <form className='ticket-type' onSubmit={handleOnSubmit}>
                        <div className="radioFlight">
                            <div className="form-check me-4">
                                <input type="radio"
                                    className='requiredradio'
                                    defaultChecked

                                    required />
                                <label htmlFor="">OneWay</label>
                            </div>
                        </div>

                        
                    </form>
                    
                    
                    <section className="flight-booking-details-container booking-details-container">
                       
                        <div style={{position: "relative"}}>
                            <label htmlFor="fromCity" className='booking-inputBox'>
                                <span className='from-span'>From</span>
                                <input onClick={() => setModalInput(!modalInput)}  className='from-div-input' type="text" readOnly id='fromCity' value={TrainPlace.from} style={{caretColor: "transparent"}}/>
                                <span className='from-span'>India</span>
                            </label>
                            {modalInput && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="	https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {TrainFromData && TrainFromData.map((details) => (
                                        <li onClick={() => valuesetter(details)} className="modal-flight-for-li">  
                                            <div>
                                                <span className="modal-flight-for-span-two" >{details}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </modal>}
                        </div>

                        <div style={{position: "relative" , borderLeft: "1px solid #e7e7e7"}}>
                            <label htmlFor="toCity" className='booking-inputBox'>
                                <span className='from-span'>To</span>
                                <input onClick={()=> setModalInputTO(!modalInputTO)} className='from-div-input' type="text" readOnly id='toCity' value={TrainPlace.to} style={{caretColor: "transparent"}}/> 
                                <span className='from-span'>India</span>
                            </label>

                            {modalInputTO && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {trainto && trainto.map((details) => (
                                        <li onClick={() => valuesetterTwo(details)} className="modal-flight-for-li">
                                            <div>
                                                <span className="modal-flight-for-span-two" >{details}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </modal>}
                        </div>


                        <div onClick={()=>setTrthly(!trthly)} style={{position: "relative" , borderLeft: "1px solid #e7e7e7"}}>
                            <label htmlFor="travelDate" className='booking-inputBox'>
                               
                                
                                <span className='dropdown'>
                                    Departure
                                </span>

                                {trthly ?<> <div style={{fontSize: "30px", lineHeight: "36px"}}>
                                       <span style={{fontWeight: "900", paddingRight:"6px"}}>{day}</span> 
                                       <span style={{fontSize: "20px"}}>{monthWord}</span>
                                       <span  className='shortYear'>{year}</span>
                               </div>

                                <span>
                                    {dayWeek}
                                </span>

                                </>
                                
                                : <div onClick={(e)=>e.stopPropagation()}><Calendar className="calendarOnOfFlight" onChange={handleDateChange} onClickDay={handleDayClick} value={TravelDate} minDate={new Date()} /></div>}
                            </label>
                        </div>

                        <div onClick={()=>setFindMemberModal(!findMemberModal)} style={{position: "relative" , borderLeft:  "1px solid #e7e7e7"}}>
                            <label htmlFor="class" className='booking-inputBox-last'>
                                <span className='dropdown'>
                                    Travellers & Class
                                </span>

                                <div style={{ fontSize: "30px", lineHeight: "36px"}}>
                                    <span style={{fontWeight: 900}}>{totalMembers}</span>
                                </div>

                                <span className='from-span'>People</span>
                            </label>
                                {findMemberModal && <div className='flightadult'>
                                    <div onClick={(e)=> e.stopPropagation()} className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>
                                    </div>}

                        </div>

                    </section>



                    {/* <div className='searchParent'>

                        <div className='searchBtn'>
                            SEARCH
                        </div>
                    </div> */}


                <div className="searchBtnforhotel" >
                    <button onClick={handleOnSubmit}  className='searchHotelBtnA' style={{position: "absolute", bottom: "-18px"}}>SEARCH</button>
                </div>
                </div>

            </div >
            <Outlet />
            <Footer />

        </>


    )
}

export default TrainDetails
