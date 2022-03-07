import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Space, Skeleton } from "antd";
import DOMPurify from "dompurify";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";

export default function App() {
  const router = useRouter();
  // TODO: pass the course data along
  let home_page = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/front_page`,
    []
  );
  console.log(router.query);
  let cleanHTML = "";
  if (Object.keys(home_page).length != 0) {
    cleanHTML = DOMPurify.sanitize(home_page.data.body, {
      USE_PROFILES: { html: true },
    });
  }
  return (
    <>
      <Header />

      <Main title={router.query.title}>
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
