import {
  CalendarComponent,
} from "@syncfusion/ej2-react-calendars";
import { useState } from "react";
import TimePicker from "./TimePicker";
import "./App.css";

function App() {
  const [date, setDate] = useState('');
  const [timeActive, setTimeActive] = useState(false);

  const handleChange = (e) => {
    let tempDate = e.value.toLocaleDateString();
    setDate(tempDate);
    setTimeActive(true);
  };

  return (
    <div>
      <CalendarComponent
        onChange={handleChange}
        start="Year"></CalendarComponent>
      {timeActive && <TimePicker date={date} setTimeActive={setTimeActive} />}
    </div>
  );
}

export default App;
