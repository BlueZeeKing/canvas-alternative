import { Layout, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;

export default function Main(props) {
  // TODO: Make fill work on mobile
  return (
    <Layout className="body">
      <Header>
        <HomeOutlined style={{ color: "white" }} />
      </Header>
      <Layout>
        <Sidebar />
        <Content style={{overflow: "scroll"}}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
