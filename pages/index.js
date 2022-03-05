import Head from 'next/head'
import Image from 'next/image'
import { Typography, Menu, Layout, Card, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import Sidebar from "../components/Sidebar"
import { useState, useEffect } from 'react';

const { Title, Paragraph, Text, Link } = Typography;
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Home() {
  const [data, setData] = useState({data: []})
  useEffect(() => {
    if (data.data == []) {
      fetch("/api/courses", {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          url: "/courses",
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  })
  // TODO: Make fill work on mobile
  console.log(data)
  return (
    <>
      <Head>
        <title>Canvas Alternative</title>
        <meta
          name="description"
          content="Alternative to Instructure's Canvas using react"
        />
      </Head>

      <Layout className="body">
        <Header>
          <HomeOutlined style={{ color: "white" }} />
        </Header>
        <Layout>
          <Sidebar />
          <Content>
            <Space style={{ width: "100%", padding: "10px" }} wrap>
              {data.data.map((item) => <Card key={item.id} title={item.name} style={{ width: "300px"}} />)}
            </Space>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
