import { useRouter } from "next/router";
import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App(props) {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Home Page", `/${router.query.course}/wiki?title=${router.query.title}`, 2), []);

  return (
    <>
      <Header />

      <Main
        history={storage}
        title={router.query.title}
        page
        course={router.query.course}
        rate_limit={props.limit}
        tabs={props.tabs}
      >
        <div style={{ padding: "10px" }}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.data.body, {
                USE_PROFILES: { html: true },
              }),
            }}
          ></div>
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/front_page`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/tabs`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
  ]);

  const [data, tabs] = await Promise.all([res.json(), tabsRaw.json()]); 

  // Pass data to the page via props
  return {
    props: {
      data: data,
      limit: res.headers.get("x-rate-limit-remaining"),
      tabs: tabs,
    },
  };
}