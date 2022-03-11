import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";

import { useEffect } from "react";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Assignments", `/${router.query.course}/assignments?title=${router.query.title}`, 2), []);

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

      <Main history={storage} title={router.query.title} course={router.query.course}>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}