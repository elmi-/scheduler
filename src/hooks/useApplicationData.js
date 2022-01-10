import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: []
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
     
    const setDay = day => setState({ ...state, day });
    
    const cancelAppointment = (id) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
   
      const cDay = state.days.find(day => day.appointments.includes(id))
      const nDay = {...cDay, spots: cDay.spots+1}
      const nDays =  state.days.map((day) => {return day.name === state.day ? nDay: day})
        
      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
           setState({
          ...state,
          appointments,
          days: nDays
        });
      })
      // .catch((err) => {
      //   // console.log(err.message);
      // });
    };

    function bookInterview(id, interview) {      
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
    
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const cDay = state.days.find(day => day.appointments.includes(id))
      const nDay = {...cDay, spots: cDay.spots-1}
      const nDays =  state.days.map((day) => {return day.name === state.day ? nDay: day})

      return axios.put(`http://localhost:8001/api/appointments/${ id }`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: nDays
        });
      })
      // .catch((err) => {
      //   console.log(err.message);
      // });
    };

  return {
    state,
    setDay,
    bookInterview,
    cancelAppointment
  }
}