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
        from: "Del",
        to: "Hyd"
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
                from: AirportData[0].IATA_code,
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

    return (
        <>
            <div className="DetailsParent">
                <div className='Details'>
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
                        <button className="searchBtn" type="submit">Search</button>
                    </form>
                    <div className="flight-search">
                        <div className="flight-for">
                            <span>
                                FROM
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'from')}
                                onClick={() => setModalInput(true)}
                                value={flightDetails.from.toUpperCase()}
                            /></h1>
                            <span>{flightDetails.from.toUpperCase()}, {flightDetails.from.toUpperCase
                                ()} India</span>

                            {modalInput && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="	https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {AirportData && AirportData.map((details) => (
                                        <li onClick={() => valuesetter(details.IATA_code)} className="modal-flight-for-li">
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

                        <div className="flight-to">
                            <span>
                                To
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                onChange={(e) => handleOnClick(e, 'to')}
                                value={flightDetails.to.toUpperCase()}
                                onClick={() => setModalInputTO(true)}
                            /></h1>

                            <span>{flightDetails.to.toUpperCase
                                ()}, {flightDetails.to.toUpperCase()} Airport India</span>

                            {modalInputTO && <modal className="modal-flight-for">
                                <div className="modal-flight-for-input">
                                    <img className="search-icon-img" src="https://upload.wikimedia.org/wikipedia/commons/c/ca/VisualEditor_-_Icon_-_Search.svg" alt="" />
                                    <input onChange={handleGetCityName} type="text" placeholder="From" />
                                </div>

                                <ul className="modal-flight-for-ul">
                                    {AirportData && AirportData.map((details) => (
                                        <li onClick={() => valuesetterTwo(details.IATA_code)} className="modal-flight-for-li">
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

                        {trthly ? <div className="flight">
                            <span>
                                Departure
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                value={TravelDate.toDateString()}
                                onClick={() => setTrthly(!trthly)}
                            /></h1>
                            <span>DEL, Delhi Airport India</span>
                        </div> : <div >
                            {/* <span onClick={() => setTrthly(!trthly)} className='calendarCrossOfTwoFlight'>Done</span> */}
                            <Calendar className="calendarOnOfFlight" onChange={handleDateChange} onClickDay={handleDayClick} value={TravelDate} minDate={new Date()} />
                        </div>}

                        <div className="flight" >
                            <div onClick={() => setFindMemberModal(!findMemberModal)}>
                                <span>
                                    Members
                                </span>
                                <h3 className='inputHeremains'>Members: {totalMembers} </h3>
                            </div>
                            {findMemberModal && <div className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>}
                            <span>{MemberValue?.adult} Adults, {MemberValue?.kids} Kids ({totalMembers} Members)</span>
                        </div>
                    </div>
                    <div className='searchParent'>
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
