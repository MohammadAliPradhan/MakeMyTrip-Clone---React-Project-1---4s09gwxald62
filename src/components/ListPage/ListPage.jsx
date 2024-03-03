import React, { useContext, useEffect, useRef, useState } from 'react'
import "./ListPage.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SearchItem from '../../SearchItem/SearchItem';
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar';
import { ApiDetails } from '../App';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { getHeaderWithProjectId } from '../Authenticaltion/utils/service';



function ListPage() {

    // getting the state values from previus page
    const location = useLocation();

    //for checking if the page is being loaded or not
    const [Loading, setLoading] = useState(true);

    //for getting value from input search
    const searchNewValue = useRef();


    //Got all the inputs coming from input page or front page 

    const memberhowmuch = location.state.MemberValue ? location.state.MemberValue : 1;
    const checkInDate = location.state.checkInDate ? location.state.checkInDate : new Date();
    const checkOutDate = location.state.checkOutDate ? location.state.checkOutDate : new Date();

    const hotelDetailsValue = location.state.hotelName ? location.state.hotelName.destination : null

    const [hotelDetails, setHotelDetails] = useState();

    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckedInHighest, setIsCheckedInHighest] = useState(false);

    //end



    // doing the api call here 
    const getHotelDetails = async(value) =>{
        try {
            console.log(hotelDetailsValue);
            const config = getHeaderWithProjectId();
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${ value ? value : hotelDetailsValue }"}`, config)
            setLoading(false);
            setHotelDetails(response.data.data.hotels)
            console.log("hotels", response.data.data.hotels);

        } catch (error) {
            setLoading(false);
            console.log("hotels", error);
        }
    }

    useEffect(() =>{
        getHotelDetails();
    },[]);


    //Sorting cheapest 

    const handelCheapestSort = () =>{
        setIsCheckedIn(!isCheckedIn);
        setHotelDetails([...hotelDetails].sort((a,b) => a.rooms[0].costDetails.baseCost - b.rooms[0].costDetails.baseCost))
    }


    //sorting highest
    const handelHighestSort = () =>{
        setIsCheckedInHighest(!isCheckedInHighest);
        setHotelDetails([...hotelDetails].sort((a,b) => b.rooms[0].costDetails.baseCost - a.rooms[0].costDetails.baseCost))
    }


    // If uncheck call random api
    useEffect(() =>{
        if(isCheckedIn === false){
            getHotelDetails(undefined);
        }

        
    },[isCheckedIn]);

    //if uncheck call random api
    useEffect(() =>{
        if(isCheckedInHighest === false){
            getHotelDetails(undefined);
        }

        
    },[isCheckedInHighest]);



    //using the functionality of inpage search through search buttton
    function handleSearchOnClick(e) {
        e.preventDefault();
        const value = searchNewValue.current.value;
        getHotelDetails(value);
    }



    

   




    // const [listSearch, setListSearch] = useState('');
    // const [locationlocal, setLocationLocal] = useState('')


    // //This is present in listCurrent Api
    // const listItemb = localStorage.getItem("listItem")
    // const listItemc = localStorage.getItem("locationApi")
    // console.log(listItemc);


    // const [newvalue, setNewValue] = useState('');



   


    // //navigate location
    // const [navigateLocation, setNavigateLocation] = useState(location)
    // console.log(navigateLocation);



    // //Testing 
    // useEffect(() => {
    //     if (listItemb !== listItemc) {
    //         localStorage.removeItem("listItem")
    //         setLocationLocal(listItemb);

    //     } else {
    //         setLocationLocal(listItemc)
    //     }

    //     console.log("locationlocal", locationlocal);
    // }, [])

    // console.log("im in listPage", ApiInfo);
    // console.log(JSON.parse(sessionStorage.getItem("proxy")))

    // useEffect(() => {
    //     const proxyData = JSON.parse(sessionStorage.getItem("proxy"));
    //     setApiInfo(proxyData);
    // }, []);



    



    // function handleOnChange() {

    //     setLocationLocal(newvalue)
    //     console.log("locationlocal", locationlocal);
    // }
    // console.log(ApiInfo);

    // function sortCheapA() {
    //     const apiregulatechange = [...ApiInfo];
    //     apiregulatechange.sort((a, b) => {
    //         return [a.rooms[0].costDetails.baseCost - b.rooms[0].costDetails.baseCost]
    //     })
    //     setApiInfo(apiregulatechange)
    // }

    // function sortHighestA() {
    //     const apiregulatechange = [...ApiInfo];
    //     apiregulatechange.sort((a, b) => {
    //         return [b.rooms[0].costDetails.baseCost - a.rooms[0].costDetails.baseCost]
    //     })
    //     setApiInfo(apiregulatechange)
    // }

    // async function getListDetails(locationA = "") {
    //     const config = {
    //         headers: {
    //             projectID: "9sa80czkq1na"
    //         }
    //     }
    //     console.log(locationA);
    //     const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${locationA}"}`, config)
    //     setApiInfo(response.data.data.hotels)
    //     localStorage.setItem("listItem", locationA)  //This is present in listCurrent Api
    //     console.log("this is response in list:", response);
    // }

    // useEffect(() => {
    //     getListDetails(locationlocal)
    //     console.log("sometihngsdfjsdklfj", listSearch);
    // }, [locationlocal])


    return (
        <div>
             <ScrollNavBar />
             <div className="bluish"></div> 

            {/* two buttons */}
            <div className='btnsortab'>
                {/* <button onClick={sortCheapA} className='firstab'>Sort By Cheapest
                </button> */}
                {/* <button onClick={sortHighestA} className='secondab'>Sort By Highest</button> */}
            </div>

            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">
                            Search
                        </h1>
                        <div className="lsItem">
                            <label>Search</label>
                            <input type="text"
                                // onChange={handleSearchOnChange}
                                // value={newvalue}
                                ref={searchNewValue}
                        
                                placeholder='City/State'
                            />
                        </div>

                        <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Sort By Cheapest
                                    </span>
                                    <input
                                     id='sortByCheapest' 
                                     onClick={handelCheapestSort}  
                                     className="lradio" 
                                     type="checkbox" 
                                     checked={isCheckedIn}
                                     name="radio" />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                       Sort By Highest
                                    </span>
                                    <input
                                    checked={isCheckedInHighest}
                                    type="checkbox"
                                     id="sortByCheapest" 
                                     onClick={handelHighestSort} 
                                     className="lradio " />
                                </div>
                            </div>

                        </div>
                        <button onClick={handleSearchOnClick}>Search</button>  

                     </div> 
                    <div className="listResult">
                        <h1 id='color-change-black'>Hotels in {Loading ? "loading" : hotelDetails[0]?.location}</h1>
                        {
                            hotelDetails?.map((apis, index) => (
                                <SearchItem key={index} data={apis} state={location} />
                            ))
                        }
                    </div>
                </div>
                </div> 
            <Footer />  

        </div>
    )
}

export default ListPage
