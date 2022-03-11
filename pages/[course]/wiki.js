import { useRouter } from "next/router";
import { Skeleton } from "antd";
import DOMPurify from "dompurify";
import { useEffect } from "react";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Home Page", `/${router.query.course}/wiki?title=${router.query.title}`, 2), []);
  
  let home_page = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/front_page`,
    []
  );
  let cleanHTML = "";
  if (Object.keys(home_page).length != 0) {
    cleanHTML = DOMPurify.sanitize(home_page.data.body, {
      USE_PROFILES: { html: true },
    });
  }
  return (
    <>
      <Header />

      <Main history={storage} title={router.query.title} page course={router.query.course}>
        <div style={{ padding: "10px" }}>
          {Object.keys(home_page).length != 0 ? (
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }} ></div>
          ) : (
            <Skeleton active />
          )}
        </div>
      </Main>
    </>
  );
}
