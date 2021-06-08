import React, { useEffect, useState } from "react";
import "./timePicker.css";
const TimeData = [
  "01:00 AM",
  "02:00 AM",
  "03:00 AM",
  "04:00 AM",
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "11:00 AM",
  "12:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const TimeComponent = ({ handleTime, date, time }) => {
  return (
    <div onClick={() => handleTime(date, time)} className="timecomponent">
      <h2>{time}</h2>
    </div>
  );
};

const TimePicker = ({ date, setTimeActive }) => {
  // const { mhpID } = useParams();

  // const saveAppointment = () => {
  //   firestore
  //     .collection('mhp')
  //     .doc(mhpID)
  //     .collection('appointments')
  //     .doc(date)
  //     .update({
  //       appointments : FieldValue.arrayUnion({
  //         client: user.uid,
  //         time: time,
  //       })
  //     })
  //   firestore
  //     .collection('users')
  //     .doc(user.uid)
  //     .collection('appointments')
  //     .doc(date)
  //     .update({
  //       appointments : FieldValue.arrayUnion({
  //         mhp: mhpID,
  //         time: time,
  //       })
  //     })
  // }

  const [dateTime, setDateTime] = useState([]);

  useEffect(() => {
    console.log(dateTime);
  }, [dateTime]);

  const handleTime = (date, time) => {
    setDateTime([...dateTime, { date: date, time: time }]);
  };

  return (
    <div className="timepicker">
      <h2>Select Time</h2>

      <div className="timepicker-wrapper">
        {TimeData.map((time) => (
          <TimeComponent handleTime={handleTime} date={date} time={time} />
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
