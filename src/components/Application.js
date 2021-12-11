import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment"; 
import appointments from "sampleData";
import "components/Application.scss";

export default function Application(props) {
  const [days, setDays] = useState([]);  
  const [day, setDay] = useState("Monday");

  const parsedAppointments = appointments.map(appointment => 
    <Appointment 
      key={appointment.id}
      {...appointment}  
    />);

  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    axios.get(daysURL)
      .then(response => {
        // console.log(response.data);
        setDays(response.data);
      })
      .catch(err => {
        console.log(err.message)
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { parsedAppointments }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
