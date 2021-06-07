import React from "react";

const TimeData = [
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
];

const TimeComponent = ({ data, handleTime }) => {
  return (
    <div onClick={() => handleTime(data)} className="timecomponent">
      <h2>{data}</h2>
    </div>
  );
};

const TimePicker = () => {
  const handleTime = (time) => {
    console.log(time);
  };

  return (
    <div className="timepicker">
      {TimeData.map((time) => (
        <TimeComponent handleTime={handleTime} data={time} />
      ))}
    </div>
  );
};

export default TimePicker;
