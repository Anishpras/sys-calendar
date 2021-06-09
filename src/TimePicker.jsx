import React, { useEffect, useState } from "react";
import "./timePicker.css";

const TimeComponent = ({ handleTime, date, time, active, index }) => {
  return (
    <div
      onClick={() => handleTime(date, time, index)}
      className={active ? "active" : "timecomponent"}>
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
  const [timeData, setTimeData] = useState([
    { time: "01:00 AM", active: false },
    { time: "01:00 AM", active: false },
    { time: "03:00 AM", active: false },
    { time: "01:00 AM", active: false },
    { time: "01:00 AM", active: false },
    { time: "01:00 AM", active: false },
  ]);
  useEffect(() => {
    console.log(dateTime);
  }, [dateTime]);

  const handleTime = (date, time, index) => {
    setDateTime([...dateTime, { date: date, time: time }]);

    let tempTimeData = [...timeData];
    tempTimeData[index].active = true;
    setTimeData(tempTimeData);
    console.log(tempTimeData);
  };

  return (
    <div className="timepicker">
      <h2>Select Time</h2>

      <div className="timepicker-wrapper">
        {timeData.map((time, index) => (
          <TimeComponent
            index={index}
            handleTime={handleTime}
            date={date}
            active={time.active}
            time={time.time}
          />
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
