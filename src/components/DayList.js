import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const parsedDays = days.map(day => 
    <DayListItem 
      key = { day.id } 
      name = { day.name }
      spots = { props.spots }
      selected = { day.name === props.value }
      setDay = { props.onChange }
      {...day} 
    />)
  return (
    <ul>
      { parsedDays }
    </ul>
  );
}