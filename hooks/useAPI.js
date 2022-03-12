import { useEffect, useState } from "react";
import { notification } from "antd";

export default function useAPI(key, url, query) {
  const [data, setData] = useState({})
  
  useEffect(() => {
    console.log(`/api/canvas?url=${url}`);
    if (Object.keys(data).length == 0 && !url.includes("undefined")) {
      fetch(`/api/canvas?url=${url}`, {
        headers: {
          Authorization: `Bearer ${key}`,
          url: url,
          query: JSON.stringify(query),
        },
      })
        .then((res) => {
          if (parseInt(res.headers.get("x-rate-limit-remaining")) < 50) {
            notification.warning({
              message: "Please Slow Down",
              description: `You are currently using ${700 - parseInt(res.headers.get("x-rate-limit-remaining"))} out of 700 of your alloted quota. Please slow down.`,
            });
          }
          return res.json();
        })
        .then((data) => setData(data));
    }
  });

  return data
}
