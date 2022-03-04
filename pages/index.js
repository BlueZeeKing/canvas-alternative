import Head from 'next/head'
import Image from 'next/image'
import { Typography, Menu, Layout } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import Sidebar from "../components/Sidebar"

const { Title, Paragraph, Text, Link } = Typography;
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Home() {
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
            <Typography style={{ padding: "0.5rem" }}>
              <Title>This is a canvas alternative</Title>
              <Paragraph>It is build using ant design and react</Paragraph>
              <Title level={1}>
                Canvas design leaves some things to be desired
              </Title>
            </Typography>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
