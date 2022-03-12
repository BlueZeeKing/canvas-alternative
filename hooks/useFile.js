import { useEffect, useState } from "react";
import { notification } from "antd";

export default function useFile(key, id) {
  const [data, setData] = useState({})
  
  useEffect(() => {
    if (Object.keys(data).length == 0 && id != undefined) {
      fetch(`/api/file?id=${id}`, {
        headers: {
          Authorization: `Bearer ${key}`,
          id: id
        },
      })
        .then((res) => {
          setData({"hello": "hi"})
          console.log(res)
        })
    }
  });

  return data
}
