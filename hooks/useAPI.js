import { useEffect, useState } from "react";

export default function useAPI(key, url) {
  const [data, setData] = useState({})
  useEffect(() => {
    if (Object.keys(data).length == 0) {
      fetch("/api/canvas", {
        headers: {
          Authorization: `Bearer ${key}`,
          url: url,
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  });

  return data
}
