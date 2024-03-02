import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./HotelDetails.css"
import axios from 'axios';
import { ApiDetails } from '../App';
import Footer from '../Footer/Footer';
import Calendar from 'react-calendar';
import { CropSquareSharp } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import FindMembers from '../FindMembers/FindMembers'
import Airports from '../Modals/Airports';



function HotelDetails() {
    const [FlightDepartureData, setFlightDepartureData] = useState(Airports);

    const [hotelName, setHotelName] = useState({
        destination: "Delhi",
        checkIn: 6
    })


    //This is for city or Location Modal
    const [modalInput, setModalInput] = useState(false);


    // This is for calendar modal
    const [trthly, setTrthly] = useState(true);
    const [checkInTrthly,setCheckInTrthly] = useState(true);


    //THis is for Guests Modal 
    const [findMemberModal, setFindMemberModal] = useState();

    const [MemberValue, setMemberValue] = useState()

    const checkInValue = new Date('Wed Nov 15 2023 00:00:00 GMT+0530');
    const checkOutValue = new Date('Thu Nov 17 2023 00:00:00 GMT+0530')

    const [checkInDate, SetcheckInDate] = useState(checkInValue)
    const [checkOutDate, SetCheckOutDate] = useState(checkOutValue)  
    
    
    const navigate = useNavigate()

    

    const [submittedHotelDetails, setSubmittedHotelDetails] = useState("");
    const [flag, setFlag] = useState(false);

    

    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    //This one is the first one change of the input
    const handleDateChangeCheckOut = (date) => {
        SetCheckOutDate(date);
        setTrthly(true);
    };


    //This is checkinDate onchange function
    const handleDateCheckIn = (date) => {
        SetcheckInDate(date);
        setCheckInTrthly(true);
    };

  

    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }



    async function getHotelDetails(location = "") {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location === "" ? undefined : location}"}`, config)
        if (response.data.results === 0) {
            setFlag(false)
        } else {
            JSON.stringify(sessionStorage.setItem('proxy', JSON.stringify(response.data.data.hotels)))
            localStorage.setItem("locationApi", response.data.data.hotels[0].location)
            localStorage.setItem("listItem", response.data.data.hotels[0].location)
            navigate("/list", { state: { selectedDate, selectedDateCheckOut, MemberValue } })
            // navigate("/justshow", { state: { item } })
        }
        console.log("response", response)


    };
    
    useEffect(() => {
        getHotelDetails(submittedHotelDetails)
    }, [submittedHotelDetails]);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmittedHotelDetails(hotelName.destination)
    }



       //creating date variable for checkIn
    
       const alldatecheckIn = checkInDate.toISOString();

       const yearcheckin = alldatecheckIn.substring(2, 4);
       const daycheckin = alldatecheckIn.substring(8, 10);
   
       const dayWeekcheckin = checkInDate.toDateString().substring(0,4);
       const monthWordcheckin = checkInDate.toDateString().substring(4,7);
       //end date




        //creating date variable for checkOut
    
        const alldatecheckOut = checkOutDate.toISOString();
       
        const yearcheckout = alldatecheckOut.substring(2, 4);
        const daycheckout = alldatecheckOut.substring(8, 10);
          
        const dayWeekcheckout = checkOutDate.toDateString().substring(0,4);
        const monthWordcheckout = checkOutDate.toDateString().substring(4,7);
        //end date

       //getHotelData

       function handleGetCityName(event) {
        const { value } = event.target;
        let filteredSearch = Airports.filter((data) => {
            let code = data.IATA_code.toLowerCase();
            let airportName = data.airport_name.toLowerCase();
            let cityName = data.city_name.toLowerCase();
            let result = value.toLowerCase();
            if (code.includes(result) || airportName.includes(result) || cityName.includes(result)) {
                return data
            }
        })
        setFlightDepartureData(filteredSearch);
    }

    function valuesetter(val) {
        console.log(val);
        if (val) {
            setHotelName((oldState) => ({
                ...oldState,
                destination: val,
            }))
        } else {
            setHotelName((oldState) => ({
                ...oldState,
                from: AirportData[0].city_name,
            }))
        }
        setModalInput(false);
    }


    //End HotelData





    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 0, 10);


    return (
        <>



            <div className="DetailsParent">

                <div className='Details'>
                    <form className='ticket-type' onSubmit={handleSubmit}>
                        <div className="radioFlight">
                            <div className="form-check me-4">
                                <input
                                    type="radio"
                                    id="one-way"
                                    value="one-way"
                                    name="trip"
                                    className='requiredradio'
                                    defaultChecked
                                ></input>
                                <label className="form-check-label" htmlFor="one-way">
                                    Holiday Trip
                                </label>
                            </div>

                        </div>

                        <div className='searchParent'>
                            <button className="searchBtn" type="submit">Search</button>
                        </div>
                    </form>

                    <section className="hotel-booking-details-container booking-details-container">
                       
                        <div   style={{position: "relative"}}>
                            <label onClick={() => setModalInput(!modalInput)} htmlFor="location" className='booking-inputBox'>
                                <span className='from-span'>City Or Location</span>
                                <input   className='from-div-input' type="text" readOnly id='fromCity' value={hotelName.destination} style={{caretColor: "transparent"}}/>
                                <span className='from-span'>India</span>
                            </label>
                            {modalInput && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="	https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {FlightDepartureData && FlightDepartureData.map((details) => (
                                        <li onClick={() => valuesetter(details.city_name)} className="modal-flight-for-li">
                                            <div className="modal-flight-for-div">
                                                <span className="modal-flight-for-span">{details.IATA_code}</span>
                                            </div>

                                            <div>
                                                <span className="modal-flight-for-span-two" >{details.city_name}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </modal>}
                        </div>

                        <div onClick={() => setCheckInTrthly(!checkInTrthly)} style={{position: "relative" , borderLeft: "1px solid #e7e7e7"}}>
                            <label htmlFor="checkIn" className='booking-inputBox'>
                                <span className='dropdown'>
                                    Check-In
                                </span>

                                {checkInTrthly ? <><div style={{fontSize: "30px", lineHeight: "36px"}}>
                                       <span style={{fontWeight: "900", paddingRight:"6px"}}>{daycheckin}</span> 
                                       <span style={{fontSize: "20px"}}>{monthWordcheckin}</span>
                                       <span  className='shortYear'>{yearcheckin}</span>
                               </div>

                                <span>
                                    {dayWeekcheckin}
                                </span>
                                </>
                                
                                : <div onClick={(e)=>e.stopPropagation()}><Calendar className="calendarOnOfFlight" onChange={handleDateCheckIn} onClickDay={handleDayClick} value={checkInDate} minDate={new Date()} /></div>}
                            </label>
                        </div>


                        <div onClick={()=>setTrthly(!trthly)} style={{position: "relative" , borderLeft: "1px solid #e7e7e7"}}>
                            <label htmlFor="travelDate" className='booking-inputBox'>
                               
                                
                                <span className='dropdown'>
                                    Check-Out
                                </span>

                                {trthly ?<> <div style={{fontSize: "30px", lineHeight: "36px"}}>
                                       <span style={{fontWeight: "900", paddingRight:"6px"}}>{daycheckout}</span> 
                                       <span style={{fontSize: "20px"}}>{monthWordcheckout}</span>
                                       <span  className='shortYear'>{yearcheckout}</span>
                               </div>

                                <span>
                                    {dayWeekcheckout}
                                </span>

                                </>
                                
                                : <div onClick={(e)=>e.stopPropagation()}><Calendar className="calendarOnOfFlight" onChange={handleDateChangeCheckOut} onClickDay={handleDayClick} value={checkOutDate} minDate={new Date()} /></div>}
                            </label>
                        </div>

                        <div onClick={()=>setFindMemberModal(!findMemberModal)} style={{position: "relative" , borderLeft:  "1px solid #e7e7e7"}}>
                            <label htmlFor="class" className='booking-inputBox-last'>
                                <span className='dropdown'>
                                    Guests
                                </span>

                                <div style={{ fontSize: "30px", lineHeight: "36px"}}>
                                    <span style={{fontWeight: 900, marginRight: "10px"}}>{MemberValue === undefined ? "1" : MemberValue?.adult}</span>
                                    <span style={{fontSize: "20px",  lineHeight: "36px",marginRight: "10px"}}>Adults</span>
                                    <span style={{fontWeight: 900, marginRight: "10px"}}>{MemberValue === undefined ? "1" : MemberValue?.kids}</span>
                                    <span style={{fontSize: "20px",  lineHeight: "36px"}}> Kids </span>
                                </div>

                                <span className='from-span'>People</span>
                            </label>
                                {findMemberModal && <div className='flightadult'>
                                    <div onClick={(e)=> e.stopPropagation()} className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>
                                    </div>}

                        </div>


                        <div style={{borderLeft: "1px solid #e7e7e7"}}>
                             <label style={{cursor: "not-allowed"}} htmlFor="price" className='booking-inputBox'>
                                <span className='dropdown'>
                                    Price Per Night
                                </span>

                                <span className='span-priceHotel'>₹0-₹1500, ₹1500-₹2500,...</span>
                             </label>
                        </div>

                    </section>
                  

                  



                </div>

            </div >

            <Outlet />
            <Footer />


        </>


    )
}

export default HotelDetails
