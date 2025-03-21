
import React, { useState, useRef } from "react";
import "./StopWatch.css";
import app_icon from "../assets/app.svg";
import arrow_icon from "../assets/arrow-clockwise.svg";
import play_icon from "../assets/play-circle (1).svg";

const StopWatch = () => {
  const [time, setTime] = useState({ milliseconds: 0, seconds: 0, minutes: 0, hours: 0 });
  const timerRef = useRef(null);

  const formatTime = (value) => (value < 10 ? `0${value}` : value);
  const formatMilliseconds = (value) => value.toString().padStart(3, "0");

  const startStopwatch = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        let { milliseconds, seconds, minutes, hours } = prevTime;

        milliseconds += 10;
        if (milliseconds >= 1000) {
          milliseconds = 0;
          seconds++;
          if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
              minutes = 0;
              hours++;
            }
          }
        }

        return { milliseconds, seconds, minutes, hours };
      });
    }, 10);
  };

  const stopStopwatch = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTime({ milliseconds: 0, seconds: 0, minutes: 0, hours: 0 });
  };

  return (
    <div className="Stopwatch">
        <h1>Stopwatch</h1>
    <div className="Stopwatch-box">
  
      <div className="timer">
        {formatTime(time.hours)} : {formatTime(time.minutes)} : {formatTime(time.seconds)} : {formatMilliseconds(time.milliseconds)}
      </div>
      <div className="button">
      
     <div style={{marginRight:"30px"}}>
     <img src={app_icon} alt="Stop" onClick={stopStopwatch} />
     <b><p>stop</p></b>
     </div>
        
        <div style={{marginRight:"30px"}}>
        <img src={play_icon} alt="Start" onClick={startStopwatch} />
       <b> <p>start</p></b>
        </div>
      <div style={{marginRight:"10px"}}>
      <img src={arrow_icon} alt="Reset" onClick={resetStopwatch} />
   <b>   <p>reset</p></b>

      </div>
      </div>
    </div>
    </div>
  );
};

export default StopWatch;