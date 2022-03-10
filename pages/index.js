import Link from "next/link";
import { Card, Space, Skeleton } from "antd";
import { useEffect } from "react";

import Main from "../components/Main";
import Header from "../components/Header";

import useAPI from "../hooks/useAPI"
import useSessionStorage from "../hooks/useSessionStorage";


export default function Home() {
  let courses = useAPI(
    process.env.API_KEY,
    "/courses",
    [
      ["per_page", 50],
      ["enrollment_state", "active"],
      ["state", "available"],
      ["include", "favorites"],
    ]
  );

  const [storage, set, reset] = useSessionStorage();

  useEffect(() => {
    reset([["Home", "/"]]);
    console.log("set")
  })
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
    body = courses.data
      .filter((item) => item.is_favorite)
      .map((item) => (
        <Link
          key={item.id}
          href={`/${item.id}/${item.default_view}?title=${item.name}`}
          passHref
        >
          <Card
            title={item.name}
            style={{ width: "300px", minHeight: "150px", cursor: "pointer" }}
            onClick={() => {
              set(
                item.name,
                `/${item.id}/${item.default_view}?title=${item.name}`,
                1
              );
            }}
          >
            <p style={{ margin: 0 }}>{item.course_code}</p>
          </Card>
        </Link>
      ));
  }
  return (
    <>
      <Header />

      <Main title="Dashboard" breadcrumb>
        <Space style={{ width: "100%", padding: "10px" }} wrap>
          {body}
        </Space>
      </Main>
    </>
  );
}