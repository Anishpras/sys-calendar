import {
  CalendarComponent,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import { useEffect, useState, useRef } from "react";
import TimePicker from "./TimePicker";
import "./App.css";

function App() {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });
  // const [value, onChange] = useState("10:00");
  // const startDate = new Date(new Date().getFullYear(), new Date().getMonth());
  // const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
  // const timePickerRef = useRef(null);
  useEffect(() => {
    console.log(dateTime);
  }, [dateTime]);

  const handleChange = (e) => {
    // console.log(timePickerRef);
    let tempDate = e.value.toLocaleDateString();
    setDateTime({ ...dateTime, date: tempDate });
    // document.querySelector(".e-time-icon").click();
    // timePickerRef.current.setAttribute("disabled", true);
  };

  return (
    <div>
      <CalendarComponent
        onChange={handleChange}
        start="Year"
        isMultiSelection="true"></CalendarComponent>
      {/* <TimePicker onChange={onChange} value={value} /> */}
      {<TimePicker />}
    </div>
  );
}

export default App;

// (args) => setDate(args.value.toLocaleDateString())

// e-input-group-icon e-time-icon e-icons
