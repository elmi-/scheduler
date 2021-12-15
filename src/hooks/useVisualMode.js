import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(mode, replace = false) {
    const newHistory = [...history];

    if(replace) {
      newHistory.pop();
    }

    newHistory.push(mode);
    setMode(mode);
    setHistory(newHistory);
  }

  function back() {
    const newHistory = [...history];

    if (newHistory.length > 1) {
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory([...newHistory]);
  }
}

  return { mode, transition, back };
}