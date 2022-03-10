import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";
import Link from "next/link";
import { useEffect } from "react";

const { SubMenu } = Menu;

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();
  // TODO: pass the course data along
  let modules = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/modules`,
    [["include", "items"]]
  );
  let body;
  set("Modules", `/${router.query.course}/modules?title=${router.query.title}`, 2);
  // TODO: make menu item group actually surround the items
  if (Object.keys(modules).length != 0) {
    if (!("errors" in modules.data)) {
      body = (
        <Menu mode="inline">
          {modules.data.map((module) => (
            <SubMenu key={module.id} title={module.name}>
              {module.items.map((item) => {
                if (item.type == "SubHeader") {
                  return <Menu.ItemGroup key={item.id} title={item.title} />;
                } else if (item.type == "Assignment") {
                  return <Menu.Item key={item.id} style={{ paddingLeft: `${24 * item.indent + 48}px` }}><Link href={`/${router.query.course}/assignment/${item.content_id}?title=${router.query.title}`}>{item.title}</Link></Menu.Item>
                } else {
                  return <Menu.Item key={item.id} style={{ paddingLeft: `${24 * item.indent + 48}px` }}><Link href="/">{item.title}</Link></Menu.Item>
                }
              })}
            </SubMenu>
          ))}
        </Menu>
      );
    } else {
      body = <Skeleton active />;
    }
  } else {
    body = <Skeleton active />;
  }
  return (
    <>
      <Header />

      <Main title={router.query.title} course={router.query.course}>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}