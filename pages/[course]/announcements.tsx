import { useState, useEffect } from "react";

import Main from "../../components/Main";
import setItem from "../../utils/breadcrumb";
import { Skeleton, Menu } from "antd";
import Link from "next/link"

interface Discussion {
  id: number;
  title: string;
}

export default function App(props) {
  setItem(2, "Announcements", `/${props.course}/announcements`);

  return (
    <Main course={props.course} sidebar={props.tabs}>
      <Menu mode="inline">
        <Menu.ItemGroup title="Announcements">
          {props.data.map((discussion) => (
            <Menu.Item key={discussion.id}>
              <Link href={`/${props.course}/announcement/${discussion.id}`}>
                {discussion.title}
              </Link>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/discussion_topics?per_page=50&only_announcements=true`,
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
