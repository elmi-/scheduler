import React from "react";
import "./styles.scss"

const Appointment = (props)  => {
  return (
    <article className="appointment">{ props.value} { props.time }</article>
  );
}

export default Appointment;