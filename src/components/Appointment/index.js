import React from "react";
import  useVisualMode from "hooks/useVisualMode";
import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form"
import Status from "./Status";
import Confirm from "./Confirm ";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const DELETE_CONFIRM = "DELETE_CONFIRM";
const EDIT = "EDIT";

const Appointment = (props)  => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

function onSave(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props.bookInterview(props.id, interview)
    .then(() => { 
      transition(SHOW);
    });  
}
  const onDelete = (id) =>  {
    transition(DELETE);
  } 

  const onDeleteConfirm = (id) =>  {
    transition(DELETE_CONFIRM);

    props.cancelAppointment(props.id) 
      .then(() => { 
        transition(EMPTY);
      });  
  } 

  const onEdit = () => {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={ onDelete } onEdit={ onEdit } />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={ onSave} />}
      {mode === EDIT && <Form interviewers={props.interviewers } interviewer={props.interview.interviewer.id } student={props.interview.student} onCancel={() => back()} onSave={ onSave} onEdit={ onSave } />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETE_CONFIRM && <Status message={"Deleting"} />}
      {mode === DELETE && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={ onDeleteConfirm } />}
    </article> 
  );
}

export default Appointment;