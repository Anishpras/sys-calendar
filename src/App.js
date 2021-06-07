import { CalendarComponent } from "@syncfusion/ej2-react-calendars";
import { useState } from "react";
import TimePicker from "./TimePicker";
import "./App.css";
import Psychiatrist from "./Psychiatrist";
import EventSection from "./EventSection";
import NavBar from "./NavBar";

function App() {
  const [date, setDate] = useState("");
  const [timeActive, setTimeActive] = useState(false);

  const handleChange = (e) => {
    let tempDate = e.value.toLocaleDateString();
    setDate(tempDate);
    setTimeActive(true);
  };

  return (
    <div className="main" >
    <NavBar/>
    <div className="app">
    <Psychiatrist/>
    <div className="calender-wrapper"  >  
    <CalendarComponent
    onChange={handleChange}
    start="Year"></CalendarComponent>
    {/* <TimePicker onChange={onChange} value={value} /> */}
    {timeActive && <TimePicker />}
    </div>
    <EventSection/>
    </div>
    </div>
  );
}

export default App;
