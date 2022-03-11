import { useRouter } from "next/router";
import { Skeleton, Typography, Divider } from "antd";
import DOMPurify from "dompurify";
import { useEffect } from "react";

const { Title } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
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
        <Title>{assignment.data.name}</Title>
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(assignment.data.description, {
              USE_PROFILES: { html: true },
            }),
          }}
        ></div>
      </>
    );
  } else {
    body = <Skeleton active />;
  }
  // TODO: make menu item group actually surround the items
  return (
    <>
      <Header />

      <Main history={storage} title={router.query.title} page>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}