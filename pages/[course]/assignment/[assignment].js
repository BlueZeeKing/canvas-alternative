import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";
import Link from "next/link";
import DOMPurify from "dompurify";

const { SubMenu } = Menu;

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
  let cleanHTML = "";
  if (Object.keys(assignment).length != 0) {
    cleanHTML = DOMPurify.sanitize(assignment.data.description, {
      USE_PROFILES: { html: true },
    });
  }
  console.log(assignment);
  // TODO: make menu item group actually surround the items
  return (
    <>
      <Header />

      <Main title={router.query.title}>
        <div
          style={{ padding: "10px" }}
        >
          {Object.keys(assignment).length == 0 ? <Skeleton active /> : <div dangerouslySetInnerHTML={{ __html: cleanHTML }}></div>}
        </div>
      </Main>
    </>
  );
}