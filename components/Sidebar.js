import { Layout, Menu } from "antd";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Sidebar(props) {
  return (
    <Sider>
      <Menu mode="inline" style={{ minHeight:"100%"}}>
        <SubMenu key="men1" title="option 1">
          <Menu.Item key="sub11">option 1</Menu.Item>
          <Menu.Item key="sub12">option 2</Menu.Item>
          <Menu.Item key="sub13">option 3</Menu.Item>
          <Menu.Item key="sub14">option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="men2" title="option 2">
          <Menu.Item key="sub21">option 1</Menu.Item>
          <Menu.Item key="sub22">option 2</Menu.Item>
          <Menu.Item key="sub23">option 3</Menu.Item>
          <Menu.Item key="sub24">option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="men3" title="option 3">
          <Menu.Item key="sub31">option 1</Menu.Item>
          <Menu.Item key="sub32">option 2</Menu.Item>
          <Menu.Item key="sub33">option 3</Menu.Item>
          <Menu.Item key="sub34">option 4</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}