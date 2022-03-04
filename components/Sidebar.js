import { Layout, Menu } from "antd";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar(props) {
  return (
    <Sider>
      <Menu mode="inline" style={{ minHeight:"100%"}}>
        <SubMenu key="1" title="option 1">
          <Menu.Item key="1">option 1</Menu.Item>
          <Menu.Item key="2">option 2</Menu.Item>
          <Menu.Item key="3">option 3</Menu.Item>
          <Menu.Item key="4">option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="2" title="option 2">
          <Menu.Item key="1">option 1</Menu.Item>
          <Menu.Item key="2">option 2</Menu.Item>
          <Menu.Item key="3">option 3</Menu.Item>
          <Menu.Item key="4">option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="3" title="option 3">
          <Menu.Item key="1">option 1</Menu.Item>
          <Menu.Item key="2">option 2</Menu.Item>
          <Menu.Item key="3">option 3</Menu.Item>
          <Menu.Item key="4">option 4</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}