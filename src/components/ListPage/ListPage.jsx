import React, { useState } from 'react'
import "./ListPage.css"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SearchItem from '../../SearchItem/SearchItem';
function ListPage() {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    return (
        <div>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">
                            Search
                        </h1>
                        <div className="lsItem">
                            <label>Destination</label>
                            <input type="text" />
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
                        <button>Search</button>

                    </div>
                    <div className="listResult">
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPage
