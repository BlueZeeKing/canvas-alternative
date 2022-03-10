import { useRouter } from "next/router";
import { Skeleton, Typography, Divider } from "antd";
import DOMPurify from "dompurify";

const { Title } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
import useAPI from "../../../hooks/useAPI";

export default function App() {
  const router = useRouter();
  // TODO: pass the course data along
  let assignment = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/assignments/${router.query.assignment}`,
    [["include", "items"]]
  );
  let body;
  if (Object.keys(assignment).length != 0) {
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
  console.log(assignment);
  // TODO: make menu item group actually surround the items
  return (
    <>
      <Header />

      <Main title={router.query.title} page>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}