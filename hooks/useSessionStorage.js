import { useState, useEffect } from "react";

export default function useSessionStorage() {
  const [storage, setStorage] = useState([]);

  function set(name, url, level) {
    let storage_temp = JSON.parse(window.sessionStorage.getItem("history"));

    if (!storage_temp) {
      storage_temp = [["Home", '/']]
    }

    storage_temp[level] = [name, url];

    storage_temp = storage_temp.slice(0, level+1)

    setStorage(storage_temp)
    window.sessionStorage.setItem("history", JSON.stringify(storage_temp));
  }

  function reset(array) {
    setStorage(array);
    window.sessionStorage.setItem("history", JSON.stringify(array));
  }

  return [storage, set, reset];
}
