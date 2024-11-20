import React, { useEffect, useState } from 'react';
import './Clock.css';

export default function Clock() {
  const [time, setTime] = useState({
    day: '',
    hours: '',
    minutes: '',
    seconds: '',
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const day = now.toLocaleString('en-US', { weekday: 'short' });
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      setTime({ day, hours, minutes, seconds });
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='clock-body'>
      <div className="clock-container">
        <div className="clock-col">
          <p className="clock-day clock-timer">{time.day}</p>
        </div>
        <div className="timer">
        <div className="clock-col">
          <p className="clock-hours clock-timer">{time.hours}</p>
          <p className="clock-label">Hours</p>
        </div>
        <div className="clock-col">
          <p className="clock-minutes clock-timer">{time.minutes}</p>
          <p className="clock-label">Minutes</p>
        </div>
        <div className="clock-col">
          <p className="clock-seconds clock-timer">{time.seconds}</p>
          <p className="clock-label">Seconds</p>
        </div>
        </div>
      </div>
    </div>
  );
}
