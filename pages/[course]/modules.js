import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";

const { SubMenu } = Menu;

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";

export default function App() {
  const router = useRouter();
  // TODO: pass the course data along
  let modules = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/modules`,
    [["include", "items"]]
  );
  let body;
  // TODO: make menu item group actually surround the items
  if (Object.keys(modules).length != 0) {
    if (!("errors" in modules.data)) {
      console.log(convertToItemGroup(modules.data[1]));
      body = (
        <Menu mode="inline">
          {modules.data.map((module) => (
            <SubMenu key={module.id} title={module.name}>
              {convertToItemGroup(module)}
            </SubMenu>
          ))}
        </Menu>
      );
    }
  }
  return (
    <>
      <Header />

      <Main title={router.query.title}>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}

function convertToItemGroup(list) {
  let temp = []
  let group_temp = []
  let temp_item = {
    title: "",
    id: 0
  }
  list.items.forEach(item => {
    if (item.type == "SubHeader") {
      if (temp_item.id == 0) {
        temp.push(
          <>
            {group_temp}
          </>
        )
      } else {
        temp.push(
          <Menu.ItemGroup key={temp_item.id} title={temp_item.title}>
            {group_temp}
          </Menu.ItemGroup>
        );
      }
      group_temp = []
      temp_item = item
    } else {
      group_temp.push(<Menu.Item key={item.id} style={{paddingLeft: `${24*item.indent+48}px`}}>{item.title}</Menu.Item>);
    }
  });

  temp.push(
    <Menu.ItemGroup key={temp_item.id} title={temp_item.title}>
      {group_temp}
    </Menu.ItemGroup>
  );

  return temp
}