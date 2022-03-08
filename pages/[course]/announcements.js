import { useRouter } from "next/router";
import { Skeleton, Menu, Typography } from "antd";

const { Title } = Typography;

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";

export default function App() {
  const router = useRouter();
  // TODO: pass the course data along
  let announcements = useAPI(
    process.env.API_KEY,
    `/announcements/${router.query.course}`,
    [[]]
  );
  console.log(module);
  let body;
  // TODO: make menu item group actually surround the items
  //if (Object.keys(assignments).length != 0) {
  if (false) {
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

      <Main title={router.query.title}>
        <div style={{ padding: "10px" }}>
          {body}
        </div>
      </Main>
    </>
  );
}