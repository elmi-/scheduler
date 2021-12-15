import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    const newHistory = [...history];
    if(replace) {
      newHistory.pop();
    }

    newHistory.push(newMode);
    setHistory(newHistory);
    setMode(newMode);
  }

  function back() {
    const newHistory = [...history];

    if (newHistory.length < 2) {
      return newHistory[0];
    }

    let popVal = newHistory.pop();

    if (popVal === mode) {
      popVal = newHistory.pop();
    }
    
    setHistory(newHistory);
    setMode(popVal);
  }

  return { mode, transition, back };
}