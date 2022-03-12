import { useRouter } from "next/router";
import { Skeleton, Typography, Divider, Empty } from "antd";
import DOMPurify from "dompurify";
import { useEffect } from "react";

const { Title, Text, Paragraph } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
import Center from "../../../components/Center";
import useAPI from "../../../hooks/useAPI";
import useSessionStorage from "../../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Assignment", `/${router.query.course}/assignment/${router.query.assignment}?title=${router.query.title}`, 3), []);

  let assignment = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/assignments/${router.query.assignment}`,
    [["include", "items"]]
  );

  let body;
  if (Object.keys(assignment).length != 0) {
    if (storage[3][0] == "Assignment") {
      set(assignment.data.name, `/${router.query.course}/assignment/${router.query.assignment}?title=${router.query.title}`, 3);
    }
    body = (
      <>
        <div style={{ display: "flex", verticalAlign: "middle" }}>
          <Title style={{ margin: 0 }}>{assignment.data.name}</Title>
          <div style={{ flexGrow: 1 }}></div>
          <Center height="46.73px">
            <Text style={{ marginRight: "10px" }}>
              <span style={{ color: "gray" }}>Due on:</span>&nbsp;
              {new Date(Date.parse(assignment.data.due_at)).toLocaleString(
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
          {new Date(Date.parse(assignment.data.created_at)).toLocaleString(
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
        {assignment.data.description != "" ? <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(assignment.data.description, {
              USE_PROFILES: { html: true },
            }),
          }}
        ></div> : <Empty/>}
      </>
    );
  } else {
    body = <Skeleton active />;
  }
  // TODO: make menu item group actually surround the items
  return (
    <>
      <Header />

      <Main history={storage} title={router.query.title} course={router.query.course} page>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}