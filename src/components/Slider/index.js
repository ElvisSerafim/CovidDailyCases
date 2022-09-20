import React from 'react';
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { useState } from 'react';


export default function DateSlider({ min, value, onChange, max }) {

  const [currentDate, setCurrentDate] = useState(value || min);
  const steps = Math.round((max - min) / (1000 * 60 * 60 * 24));
  const valueProps = Math.round((currentDate - min) / (1000 * 60 * 60 * 24));

  const handleChange = (value) => {
    const nextCurrentDate = new Date(min.getTime());
    nextCurrentDate.setDate(value);
    onChange(nextCurrentDate);
    setCurrentDate(nextCurrentDate);
  }


  return (
    <>
      <Slider max={steps} value={valueProps} onChange={handleChange} />
    </>

  )
}


