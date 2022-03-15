import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";
import Link from "next/link";

import { useEffect } from "react";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App(props) {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Assignments", `/${router.query.course}/assignments?title=${router.query.title}`, 2), []);

  return (
    <>
      <Header />

      <Main
        history={storage}
        title={router.query.title}
        course={router.query.course}
        rate_limit={props.limit}
        tabs={props.tabs}
      >
        <div style={{ padding: "10px" }}>
          <Menu mode="inline">
            <Menu.ItemGroup title="Assignments">
              {props.data.map((assignment) => (
                <Menu.Item key={assignment.id}>
                  <Link
                    href={`/${router.query.course}/assignment/${assignment.id}?title=${router.query.title}`}
                  >
                    {assignment.name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu>
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {

  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/assignments?per_page=80`,
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