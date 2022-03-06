import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { Typography, Menu, Layout, Card, Space, Skeleton } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Main from "../components/Main";

import useAPI from "../hooks/useAPI"
import { useState, useEffect } from 'react';

export default function Home() {
  let courses = useAPI(
    process.env.API_KEY,
    "/courses?per_page=50&enrollment_state=active&state=available&include=favorites"
  );
  // TODO: Make fill work on mobile
  console.log(courses);
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
    body = courses.data.map((item) => (
      <Link key={item.id} href={`/course/${item.id}`} passHref>
        <Card title={item.name} style={{ width: "300px", minHeight: "150px" }}>
          <p style={{ margin: 0 }}>{item.course_code}</p>
        </Card>
      </Link>
    ));
  }
  return (
    <>
      <Head>
        <title>Canvas Alternative</title>
        <meta
          name="description"
          content="Alternative to Instructure's Canvas using react"
        />
      </Head>

      <Main>
        <Space style={{ width: "100%", padding: "10px" }} wrap>
          {body}
        </Space>
      </Main>
    </>
  );
}
