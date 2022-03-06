import { Layout, Typography, Space } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Main(props) {
  // TODO: Make fill work on mobile
  return (
    <Layout className="body">
      <Header>
        <Space size={40}>
          <Link href="/" passHref>
            <span style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faSchool} color="white" size="xl" />
            </span>
          </Link>
          <Title
            style={{
              color: "white",
              fontWeight: 400,
              margin: 0,
              fontSize: "2rem",
            }}
          >
            {props.title}
          </Title>
        </Space>
      </Header>
      <Layout>
        <Sidebar />
        <Content style={{ overflowY: "scroll" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
