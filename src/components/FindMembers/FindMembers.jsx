import React, { useState } from "react";
import "./findmembers.css"

export default function FindMembers({ onBookingValue }) {
    const [findMembers, setFindMembers] = useState({
        adult: "0",
        kids: "0"
    });
    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;

        setFindMembers((oldState) => ({
            ...oldState,
            [name]: value
        }));
    };

    function handleBookingvalue(e) {
        e.preventDefault();
        onBookingValue(findMembers);
    }

    console.log(findMembers.adult);

    return (
        <div className="parentAdultchild">
            <form className="formsomething">
                <label>
                    <span>Adults</span>
                    <input
                        type="number"
                        className="input-field"
                        name="adult"
                        value={findMembers.adult}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    <span>Kids</span>
                    <input
                        type="number"
                        className="input-field"
                        name="kids"
                        value={findMembers.kids}
                        onChange={handleInputChange}
                    />
                </label>
                <button className="btnFindMembers" onClick={handleBookingvalue}>Book Now</button>
            </form>
        </div>
    );
}
