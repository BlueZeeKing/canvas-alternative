import { useEffect, useState } from "react";

export default function useAPI(key, url, query) {
  const [data, setData] = useState({})
  
  useEffect(() => {
    if (Object.keys(data).length == 0) {
      fetch(`/api/canvas?url=${url}`, {
        headers: {
          Authorization: `Bearer ${key}`,
          url: url,
          query: JSON.stringify(query),
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  });

  return data
}
