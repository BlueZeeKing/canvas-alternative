import { useEffect, useState } from "react";
import { notification } from "antd";

export default function useFile(key, id) {
  const [data, setData] = useState(undefined);
  
  useEffect(() => {
    if (!data && id != undefined) {
      fetch(`/api/canvas?url=/files/${id}/public_url`, {
        headers: {
          Authorization: `Bearer ${key}`,
          url: id,
          query: JSON.stringify([]),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data.public_url);
        });
    }
  });

  return data
}
