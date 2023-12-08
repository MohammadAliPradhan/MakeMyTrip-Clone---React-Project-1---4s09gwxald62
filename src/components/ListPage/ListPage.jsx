import React, { useContext, useEffect, useState } from 'react'
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



function ListPage() {

    const { ApiInfo, setApiInfo } = useContext(ApiDetails)

    const [listSearch, setListSearch] = useState('');
    const [locationlocal, setLocationLocal] = useState('')


    //This is present in listCurrent Api
    const listItemb = localStorage.getItem("listItem")
    const listItemc = localStorage.getItem("locationApi")
    console.log(listItemc);


    const [newvalue, setNewValue] = useState('');



    const location = useLocation();
    console.log("list page", location);


    //navigate location
    const [navigateLocation, setNavigateLocation] = useState(location)
    console.log(navigateLocation);



    //Testing 
    useEffect(() => {
        if (listItemb !== listItemc) {
            localStorage.removeItem("listItem")
            setLocationLocal(listItemb);

        } else {
            setLocationLocal(listItemc)
        }

        console.log("locationlocal", locationlocal);
    }, [])

    console.log("im in listPage", ApiInfo);
    console.log(JSON.parse(sessionStorage.getItem("proxy")))

    useEffect(() => {
        const proxyData = JSON.parse(sessionStorage.getItem("proxy"));
        setApiInfo(proxyData);
    }, []);



    function handleSearchOnChange(e) {
        const { value } = e.target;
        setNewValue(value);
    }


    function handleOnChange() {

        setLocationLocal(newvalue)
        console.log("locationlocal", locationlocal);
    }
    console.log(ApiInfo);

    function sortCheapA() {
        const apiregulatechange = [...ApiInfo];
        apiregulatechange.sort((a, b) => {
            return [a.rooms[0].costDetails.baseCost - b.rooms[0].costDetails.baseCost]
        })
        setApiInfo(apiregulatechange)
    }

    function sortHighestA() {
        const apiregulatechange = [...ApiInfo];
        apiregulatechange.sort((a, b) => {
            return [b.rooms[0].costDetails.baseCost - a.rooms[0].costDetails.baseCost]
        })
        setApiInfo(apiregulatechange)
    }

    async function getListDetails(locationA = "") {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        console.log(locationA);
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${locationA}"}`, config)
        setApiInfo(response.data.data.hotels)
        localStorage.setItem("listItem", locationA)  //This is present in listCurrent Api
        console.log("this is response in list:", response);
    }

    useEffect(() => {
        getListDetails(locationlocal)
        console.log("sometihngsdfjsdklfj", listSearch);
    }, [locationlocal])


    return (
        <div>
            <ScrollNavBar />
            <div className="bluish"></div>

            {/* two buttons */}
            <div className='btnsortab'>
                <button onClick={sortCheapA} className='firstab'>Sort By Cheapest
                </button>
                <button onClick={sortHighestA} className='secondab'>Sort By Highest</button>
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
                                onChange={handleSearchOnChange}
                                value={newvalue}
                                placeholder='City/State'
                            />
                        </div>

                        {/* <div className="lsItem">
                            <label>Check-in-Date</label>
                            <span></span>
                            {false && <DateRange
                                editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                            />}
                        </div> */}
                        {/* <div className="lsItem">
                            <label>Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Min price
                                        <small>Per Night</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Max price
                                        <small>Per Night</small>
                                    </span>
                                    <input type="number" className="lsOptionInput" />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Adult
                                    </span>
                                    <input type="number" min={5} className="lsOptionInput" />
                                </div>

                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Children
                                    </span>
                                    <input type="number" min={0} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">
                                        Room
                                    </span>
                                    <input type="number" min={1} className="lsOptionInput" />
                                </div>
                            </div>

                        </div> */}
                        <button onClick={handleOnChange}>Search</button>

                    </div>
                    <div className="listResult">
                        <h1 id='color-change-black'>Hotels in {ApiInfo[0]?.location ? ApiInfo[0].location : "Loading"}</h1>
                        {
                            ApiInfo.map((apis, index) => (
                                <SearchItem key={index} data={apis} state={navigateLocation} />
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
