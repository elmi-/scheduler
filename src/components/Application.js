import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment"; 
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
// import appointments from "sampleData";
import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    });
  },[]);
  
  useEffect(() => {
    const daysURL = "http://localhost:8001/api/days";
    axios.get(daysURL)
      .then(response => {
        setDays(response.data);
      })
      .catch(err => {
        console.log(err.message)
      });
  }, []);

  
  const setDay = day => setState({ ...state, day });
  const setDays = days =>   setState(prev => ({ ...prev, days }));


  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  function bookInterview(id, interview) {
    // console.log("bookInterview", id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${ id }`, { interview })
    .then((res) => {
      setState({
        ...state,
        appointments
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  const cancelAppointment = (id) => {
    console.log(id);
    return axios.delete(`http://localhost:8001/api/appointments/${ id }`)
    .then((res) => {
      // setState({
      //   ...state,
      //   appointments
      // });
    })
    .catch((err) => {
      console.log(err.message);
    });
  };

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelAppointment={cancelAppointment}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
