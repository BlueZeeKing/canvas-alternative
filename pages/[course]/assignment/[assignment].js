import { useRouter } from "next/router";
import { Skeleton, Typography, Divider, Empty } from "antd";
import DOMPurify from "isomorphic-dompurify";
import { useEffect } from "react";

const { Title, Text, Paragraph } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
import Center from "../../../components/Center";
import useSessionStorage from "../../../hooks/useSessionStorage";

export default function App(props) {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set(props.data.name, `/${router.query.course}/assignment/${router.query.assignment}?title=${router.query.title}`, 3), []);

  // TODO: make menu item group actually surround the items
  return (
    <>
      <Header />

      <Main
        history={storage}
        title={router.query.title}
        course={router.query.course}
        page
        rate_limit={props.limit}
        tabs={props.tabs}
      >
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", verticalAlign: "middle" }}>
            <Title style={{ margin: 0 }}>{props.data.name}</Title>
            <div style={{ flexGrow: 1 }}></div>
            <Center height="46.73px">
              <Text style={{ marginRight: "10px" }}>
                <span style={{ color: "gray" }}>Due on:</span>&nbsp;
                {new Date(Date.parse(props.data.due_at)).toLocaleString(
                  "en-US",
                  {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </Text>
            </Center>
          </div>
          <Text style={{ color: "gray" }}>
            {new Date(Date.parse(props.data.created_at)).toLocaleString(
              "en-US",
              {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </Text>
          <Divider />
          {props.data.description != "" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(props.data.description, {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></div>
          ) : (
            <Empty />
          )}
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {

  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/assignments/${context.params.assignment}`,
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