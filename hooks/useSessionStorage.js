import { useState, useEffect } from "react";

export default function useSessionStorage() {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    setStorage(JSON.parse(window.sessionStorage.getItem("history")));
  }, []);

  function set(name, url, level) {
    try {
      let current = JSON.parse(window.sessionStorage.getItem("history"));

      current[level] = [name, url]

      window.sessionStorage.setItem("history", JSON.stringify(current))
    } catch {
      console.log("run")
    }
  }

  function reset(array) {
    window.sessionStorage.setItem("history", JSON.stringify(array));
  }

  return [storage, set, reset];
}
