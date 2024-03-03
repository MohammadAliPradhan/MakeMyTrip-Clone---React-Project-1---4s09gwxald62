import React, { useEffect, useState } from 'react'
import "../../components/AllDetails.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./FlightDetails.css"
import icon from "../../assets/images/fontAwesom/circle-check-solid.svg"
import Footer from '../Footer/Footer'
import Calendar from 'react-calendar'
import FindMembers from '../FindMembers/FindMembers'
import Airports from '../Modals/Airports'
import { idText } from 'typescript'




function FlightDetails() {
    const initialDate = new Date('Wed Nov 15 2023 00:00:00 GMT+0530');
    const [TravelDate, setTravelDate] = useState(initialDate);
    const [trthly, setTrthly] = useState(true);
    const [MemberValue, setMemberValue] = useState({
        adult: 1,
        kids: 0
    })

    const [AirportData, SetAirportData] = useState(Airports);

    const [modalInput, setModalInput] = useState(false);

    const [findMemberModal, setFindMemberModal] = useState();

    const [modalInputTO, setModalInputTO] = useState(false);





    const [flightDetails, setFlightDetails] = useState({
        from: "Mumbai",
        to: "Kolkata"
    })


    function handleOnClick(e, field) {
        const { value } = e.target;
        console.log(value);
        setFlightDetails((oldState) => ({
            ...oldState,
            [field]: value
        }))

    }


    const handleDateChange = (date) => {
        setTravelDate(date);
        setTrthly(true);
    };
    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    function handleBookingvalue(findmembers) {
        setMemberValue(findmembers)
        console.log("this is state", MemberValue);
    }

    const navigate = useNavigate()
    function handleOnSubmit() {
        navigate(`/flightsingle`, { state: { flightDetails, TravelDate, MemberValue } })
    }

    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 0, 10);

    // defining city name for "From"

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
        SetAirportData(filteredSearch);
    }

    function valuesetter(val) {
        console.log(val);
        if (val) {
            setFlightDetails((oldState) => ({
                ...oldState,
                from: val,
            }))
        } else {
            setFlightDetails((oldState) => ({
                ...oldState,
                from: AirportData[0].city_name,
            }))
        }
        setModalInput(false);
    }

    // Ends here

    function valuesetterTwo(val) {
        console.log(val);
        if (val) {
            setFlightDetails((oldState) => ({
                ...oldState,
                to: val,
            }))
        } else {
            setFlightDetails((oldState) => ({
                ...oldState,
                to: AirportData[0].IATA_code,
            }))
        }
        setModalInputTO(false);
    }


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
        SetAirportData(filteredSearch);
    }

    //let create 

    //creating date
    
    const alldate = TravelDate.toDateString();

    const year = alldate.substring (13,15);
    const month = alldate.substring(5, 7);
    const day = alldate.substring(8, 10);

    const dayWeek = TravelDate.toDateString().substring(0,4);
    const monthWord = TravelDate.toDateString().substring(4,7);

    console.log(year, month, day, dayWeek, monthWord);



    return (
        <>
            <div className="DetailsParent">
                <div className='Details' style={{ position: "relative" }}>
                    <form className='ticket-type' onSubmit={handleOnSubmit}>
                        <div className="radioFlight">
                            <div className="form-check me-4">
                                <input
                                    type="radio"
                                    id="one-way"
                                    value="one-way"
                                    name="trip"
                                    className='requiredradio' defaultChecked
                                ></input>
                                <label className="form-check-label" htmlFor="one-way">
                                    One Way
                                </label>
                            </div>

                        </div>
                        
                    </form>



                    <section className="flight-booking-details-container booking-details-container">
                       
                        <div style={{position: "relative"}}>
                            <label htmlFor="fromCity" className='booking-inputBox'>
                                <span className='from-span'>From</span>
                                <input onClick={() => setModalInput(!modalInput)}  className='from-div-input' type="text" readOnly id='fromCity' value={flightDetails.from} style={{caretColor: "transparent"}}/>
                                <span className='from-span'>India</span>
                            </label>
                            {modalInput && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="	https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {AirportData && AirportData.map((details) => (
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

                        <div style={{position: "relative" , borderLeft: "1px solid #e7e7e7"}}>
                            <label htmlFor="toCity" className='booking-inputBox'>
                                <span className='from-span'>To</span>
                                <input onClick={()=> setModalInputTO(!modalInputTO)} className='from-div-input' type="text" readOnly id='toCity' value={flightDetails.to} style={{caretColor: "transparent"}}/> 
                                <span className='from-span'>India</span>
                            </label>

                            {modalInputTO && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {AirportData && AirportData.map((details) => (
                                        <li onClick={() => valuesetterTwo(details.city_name)} className="modal-flight-for-li">
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

                
                <div className="searchBtnforhotel" >
                    <button onClick={handleOnSubmit}  className='searchHotelBtnA' style={{position: "absolute", bottom: "-18px"}}>SEARCH</button>
                </div>

                    
                </div>
            </div >
            <div className='footerfix'><Footer /></div>

            <Outlet />
            <Footer />

        </>


    )
}





export default FlightDetails
