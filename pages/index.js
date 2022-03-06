import Link from "next/link";
import { Card, Space, Skeleton } from "antd";

import Main from "../components/Main";
import useAPI from "../hooks/useAPI"
import Header from "../components/Header";

export default function Home() {
  let courses = useAPI(
    process.env.API_KEY,
    "/courses?per_page=50&enrollment_state=active&state=available&include=favorites"
  );
  // TODO: Make fill work on mobile
  let body;
  if (Object.keys(courses).length == 0) {
    body = [1, 2, 3, 4, 5, 6, 7].map((item) => (
      <Card
        key={item}
        title={<Skeleton active paragraph={false} />}
        style={{ width: "300px", minHeight: "150px" }}
      >
        <Skeleton active title={false} />
      </Card>
    ));
  } else {
    body = courses.data.filter(item => item.is_favorite).map((item) => (
      <Link key={item.id} href={`/course/${item.id}?title=${item.name}`} passHref>
        <Card title={item.name} style={{ width: "300px", minHeight: "150px" }}>
          <p style={{ margin: 0 }}>{item.course_code}</p>
        </Card>
      </Link>
    ));
  }
  return (
    <>
      <Header />

      <Main title="Dashboard">
        <Space style={{ width: "100%", padding: "10px" }} wrap>
          {body}
        </Space>
      </Main>
    </>
  );
}
