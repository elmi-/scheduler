export function getAppointmentsForDay(state, day) {
  const appointmentArr = [];
  
  state.days.forEach(sDay => {
    if (sDay.name === day) {
      sDay.appointments.forEach(apptId => {
        appointmentArr.push(state.appointments[apptId])
      })
    }
  })

  return appointmentArr;
}
