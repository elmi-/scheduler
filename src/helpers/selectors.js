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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  
  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return result;
}