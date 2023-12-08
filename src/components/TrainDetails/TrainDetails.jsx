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


function TrainDetails() {
    const initialDate = new Date('Wed Nov 15 2023 00:00:00 GMT+0530');
    const [TravelDate, setTravelDate] = useState(initialDate);
    const [MemberValue, setMemberValue] = useState({
        adult: 0,
        kids: 0
    })
    const [trthly, setTrthly] = useState();
    const [TrainPlace, setTrainPlace] = useState({
        from: "BAN",
        to: "DEL",

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

    function handleOnSubmit(e) {
        e.preventDefault()
        navigate("/trainsingle", { state: { TrainPlace, TravelDate, MemberValue } })
    }








    const totalMembers = parseInt(MemberValue?.kids || 0, 10) + parseInt(MemberValue?.adult || 0, 10);

    return (
        <>

            <div className="DetailsParent">
                <div className='Details'>
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

                        <div className='searchParent'>
                            <button className="searchBtn" type="submit">Search</button>
                        </div>
                    </form>
                    <div className="flight-search">
                        <div className="flight">
                            <span>
                                From
                            </span>
                            <h1><input
                                type="text"
                                className='something'
                                value={TrainPlace.from}
                                onChange={(e) => handleTrainChange(e, 'from')}
                            /></h1>
                            <span>{TrainPlace.from}, {TrainPlace.from} India</span>
                        </div>

                        <div className="flight">
                            <span>
                                To
                            </span>

                            <h1><input
                                type="text"
                                className='something'
                                value={TrainPlace.to}
                                onChange={(e) => handleTrainChange(e, 'to')}
                            /></h1>
                            <span>{TrainPlace.to}, {TrainPlace.to} India</span>

                        </div>

                        <div className="flight">
                            <span>
                                Travel Date
                            </span>

                            {/* do the work two */}
                            {trthly ? <div >
                                <span onClick={() => setTrthly(false)} className='calendarCrossOfTwo-train'>Done</span>
                                <Calendar className="calendarOn" onChange={handleDateChange} onClickDay={handleDayClick} value={TravelDate} />
                            </div> : <h1><input

                                type="text"
                                className='something'
                                value={TravelDate}
                                onClick={handleCalendarOnOf}

                            /></h1>}
                            <span onClick={() => setTrthly(true)}><FontAwesomeIcon icon={faCalendar} /></span>
                        </div>

                        <div className="flight" >
                            <div onClick={() => setFindMemberModal(!findMemberModal)}>
                                <span>
                                    Members
                                </span>
                                <h3 className='inputHeremains'>Members: {totalMembers}</h3>
                            </div>

                            {findMemberModal && <div className='findMemberssomething'><FindMembers onBookingValue={handleBookingvalue} /></div>}


                            <span>{MemberValue === undefined ? "1" : MemberValue?.adult} Adult, {MemberValue === undefined ? "7" : MemberValue?.kids} Kids ({MemberValue === undefined ? 4 : totalMembers} Members)</span>
                        </div>


                    </div>




                    {/* <div className='searchParent'>

                        <div className='searchBtn'>
                            SEARCH
                        </div>
                    </div> */}



                </div>

            </div >
            <Outlet />
            <Footer />

        </>


    )
}

export default TrainDetails
