import React, { useState } from "react";
import {
  subDays,
  subMonths,
  startOfToday,
  format,
  getDaysInMonth
} from "date-fns";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "50px"
};

const getUnixTime = (date) => {
  return (
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0) /
    1000
  );
};

const DateSlider = ({ value, max, min, onChange }) => {
  const [currentDate, setCurrentDate] = useState(value || min);
  // max = Wed Aug 31 2022 00:00:00 GMT+0800 (Singapore Standard Time)

  // num of days between max and min date
  const steps = Math.round((max - min) / (1000 * 60 * 60 * 24));
  console.log("steps:", steps);
  // add a func to check the number of days for this month and divide accordingly

  const updateValue = Math.round((currentDate - min) / (1000 * 60 * 60 * 24));

  const handleChange = (value) => {
    const nextCurrentDate = new Date(min.getTime());
    //sets the day of the month of a date:
    nextCurrentDate.setDate(value);
    onChange(nextCurrentDate);
    setCurrentDate(nextCurrentDate);
  };
  return (
    <Slider range={true} max={steps} value={updateValue} onChange={handleChange} />
  );
};

const TestRangeSlider = () => {
  const [val, setVal] = useState([0, 1000]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000);
  // const [min, setMin] = useState(new Date(2018, 3, 31));
  // const [max, setMax] = useState(new Date(2022, 7, 31));
  // static domain
  const [marks, setMarks] = useState({
    0: `${min}`,
    500: `${Math.round((max - min) / 2)}`,
    1000: `${max}`
  });

  const handleChange = (val) => {
    console.log(val);
    setVal(val);
  };
  return (
    <Slider
      dots
      range
      min={min}
      max={max}
      marks={marks}
      onChange={handleChange}
      defaultValue={[min, max / 2]}
      // tipFormatter={(value) => value}
      // tipProps={{
      //   placement: "top",
      //   visible: true
      // }}
      step={25}
    />
  );
};

export default function App() {
  const [currentDate, setCurrentDate] = useState(null);
  const min = new Date(2018, 3, 31);
  const max = new Date(2022, 7, 31);

  const handleChange = (value) => {
    setCurrentDate(value);
  };

  return (
    <>
      <TestRangeSlider />

      <div style={styles}>
        <DateSlider
          max={max}
          min={min}
         defaultValue={[new Date(2019, 3, 31), new Date(2020, 3, 31)]}
          value={currentDate}
          onChange={handleChange}
        />

        {currentDate ? currentDate.toDateString() : "Move slider"}
      </div>
    </>
  );
}
