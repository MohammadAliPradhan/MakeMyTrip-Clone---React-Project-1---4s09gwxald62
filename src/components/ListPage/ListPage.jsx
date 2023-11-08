import React, { useContext, useEffect, useState } from 'react'
import "./ListPage.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SearchItem from '../../SearchItem/SearchItem';
import ScrollNavBar from '../../ScrollNavBar/ScrollNavBar';
import { ApiDetails } from '../App';
import axios from 'axios';


function ListPage() {
    const { ApiInfo, setApiInfo } = useContext(ApiDetails)
    const [searchText, setSearchText] = useState('');
    const [listSearch, setListSearch] = useState('');

    console.log("im in listPage", ApiInfo);
    console.log(JSON.parse(sessionStorage.getItem("proxy")))

    useEffect(() => {
        const proxyData = JSON.parse(sessionStorage.getItem("proxy"));
        setApiInfo(proxyData);
    }, []);



    function handleSearchOnChange(e) {
        const { value } = e.target;
        setSearchText(value)
    }

    function handleOnChange() {

        setListSearch(searchText)
        console.log(searchText);
    }

    async function getListDetails() {
        const config = {
            headers: {
                projectID: "9sa80czkq1na"
            }
        }
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"bangalore"}`, config)
        console.log("this is response in list:", response);
    }

    useEffect(() => {
        getListDetails()
        console.log("sometihngsdfjsdklfj", listSearch);
    }, [listSearch])








    return (
        <div>
            <ScrollNavBar />
            <div className="bluish"></div>

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
                                value="none"
                            />
                        </div>

                        <div className="lsItem">
                            <label>Check-in-Date</label>
                            <span></span>
                            {false && <DateRange
                                editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                            />}
                        </div>
                        <div className="lsItem">
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

                        </div>
                        <button onClick={handleOnChange}>Search</button>

                    </div>
                    <div className="listResult">
                        <h1>Hotels in {ApiInfo[0]?.location ? ApiInfo[0].location : "Loading"}</h1>
                        {
                            ApiInfo.map((apis, index) => (
                                <SearchItem key={index} data={apis} />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListPage
