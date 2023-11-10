import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const FormData = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('12:00'); // Set default time
    const [combinedDateTime, setCombinedDateTime] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        if (event.target.value === NaN || event.target.value === '') {
            setSelectedTime('12:00')
        } else {
            setSelectedTime(event.target.value);
        }

    };

    useEffect(() => {
        // Update the combined date and time whenever either date or time changes
        const combinedDateTimeValue = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate(),
            parseInt(selectedTime.split(':')[0], 10),
            parseInt(selectedTime.split(':')[1], 10)
        ).toISOString();

        setCombinedDateTime(combinedDateTimeValue);
    }, [selectedDate, selectedTime]);

    const handleDayClick = (value, event) => {
        console.log('Clicked day:', value);
    };

    return (
        <div>
            <h2>Interactive DateTime Picker</h2>
            <div>
                <label>Date:</label>
                <Calendar onChange={handleDateChange} onClickDay={handleDayClick} value={selectedDate} />
            </div>
            <div>
                <label>Time:</label>
                <input type="time" value={selectedTime} onChange={handleTimeChange} />
                <p>Selected Time: {selectedTime}</p>
            </div>
            <div>
                <label>Combined Date and Time:</label>
                <p>{combinedDateTime}</p>
            </div>
        </div>
    );
};


export default FormData;


