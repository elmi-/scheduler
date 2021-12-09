import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = (spots) => {
  let text = "";
  switch (spots) {
    case 0:
      text = "no spots remaining";
      break;
    case 1:
      text = `${spots}  spot remaining`;
      break
    default:
      text = `${spots} spots remaining`;
  }

  return text;
};

export default function DayListItem(props) {
  const dayClass  =  classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (   
    <li className={dayClass} onClick={() => props.setDay(props.name)}
    selected={ props.selected }>
      <h2 className="text--regular">{ props.name }</h2> 
      <h3 className="text--light">{ formatSpots(props.spots) }</h3>
    </li>
  );
} 