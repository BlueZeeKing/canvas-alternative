import { Layout, Typography, Space, Breadcrumb } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "../components/Sidebar";
import useSessionStorage from "../hooks/useSessionStorage";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Main(props) {
  const [storage, set, push] = useSessionStorage();
  console.log(storage)
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
        <div
          style={{
            overflowY: "scroll",
            padding: "10px",
            backgroundColor: "#f0f2f5",
            width: "100%",
          }}
        >
          {
          !props.breadcrumb ? <Breadcrumb style={{ paddingBottom: "10px" }}>
            {storage.map((item, index) => (<Breadcrumb.Item key={index}><Link href={item[1]}>{item[0]}</Link></Breadcrumb.Item>))}
          </Breadcrumb> : ""
          }
          <Content
            style={{
              width: "100%",
              backgroundColor: props.page ? "white" : "#f0f2f5",
            }}
          >
            {props.children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
