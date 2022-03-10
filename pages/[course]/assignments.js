import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  set("Assignments", `/${router.query.course}/wiki?title=${router.query.title}`, 2);

  let assignments = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/assignments`,
    [["include", ""]]
  );
  let body;
  // TODO: make menu item group actually surround the items
  if (Object.keys(assignments).length != 0) {
    if (!("errors" in assignments.data)) {
      body = (
        <Menu mode="inline">
          <Menu.ItemGroup title="Assignments">
            {assignments.data.map((assignment) => (
              <Menu.Item key={assignment.id}>{assignment.name}</Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu>
      );
    } else {
      body = <Skeleton active/>
    }
  } else {
    body = <Skeleton active />;
  }
  return (
    <>
      <Header />

      <Main title={router.query.title} course={router.query.course}>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}