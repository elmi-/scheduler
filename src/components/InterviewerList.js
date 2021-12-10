import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"
// InterviewerList 
export default function InterviewerList(props) {
  const interviewers = props.interviewers;
  const parsedInterviewerList = interviewers.map(interviewer => 
    <InterviewerListItem 
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}
      {...interviewer}  
    />)
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { parsedInterviewerList }
      </ul>
    </section>
  );
}