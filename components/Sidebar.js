import { Layout, Menu } from "antd";
import Link from "next/link";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar(props) {
  return (
    <Sider>
      <Menu mode="inline" style={{ minHeight: "100%" }}>
        <Menu.Item key="0">
          <Link href={`/${props.course}/wiki?title=${props.name}`}>
            Home Page
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link href={`/${props.course}/modules?title=${props.name}`}>
            Modules
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href={`/${props.course}/assignments?title=${props.name}`}>
            Assignments
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href={`/${props.course}/announcements?title=${props.name}`}>
            Announcements
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href={`/${props.course}/discussions?title=${props.name}`}>
            Discussions
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}