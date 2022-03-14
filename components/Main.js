import { Layout, Typography, Space, Breadcrumb, BackTop, notification } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Main(props) {
  useEffect(() => {
    if (parseInt(props.rate_limit) < 50) {
    notification.warning({
      message: "Please Slow Down",
      description: `You are currently using ${
        700 - parseInt(props.rate_limit)
      } out of 700 of your alloted quota. Please slow down.`,
    });
  }
  }, [])
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
        <Sidebar course={props.course} name={props.title} tabs={props.tabs} />
        <div
          style={{
            overflow: "scroll",
            padding: "10px",
            width: "100%",
          }}
          className="scroll"
        >
          {!props.breadcrumb && props.history ? (
            <Breadcrumb style={{ paddingBottom: "10px" }}>
              {props.history.map((item, index) => (
                item == null ? "" : <Breadcrumb.Item key={index}>
                  <Link href={item[1]}>{item[0]}</Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          ) : (
            ""
          )}
          <Content
            style={{
              width: "100%",
            }}
          >
            {props.children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
