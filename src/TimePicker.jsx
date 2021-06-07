import React, { useEffect, useState } from "react";

import Group88 from './assest/Group88.png'
import "./timePicker.scss";
const TimeData = [
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
];

const TimeComponent = ({ handleTime, date, time }) => {
  return (
    <div onClick={() => handleTime(date, time)} className="timecomponent">
      <h2>{time}</h2>
    </div>
  );
};

const TimePicker = ({ date }) => {
  const [dateTime, setDateTime] = useState([]);

  useEffect(() => {
    console.log(dateTime);
  }, [dateTime]);

  const handleTime = (date, time) => {
    setDateTime([...dateTime, { date: date, time: time }]);
  };

  return (
    <div className="timepicker">
    <img className="arrow-sign"   src={Group88}   />
    <div className="timepicker-wrapper" >   
      {TimeData.map((time) => (
        <TimeComponent handleTime={handleTime} date={date} time={time} />
      ))}
      </div>
      <img className="arrow-sign1"   src={Group88}   />
    </div>
  );
};

export default TimePicker;
