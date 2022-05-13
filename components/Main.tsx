import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Layout, Breadcrumb, Affix } from "antd";

import { useEffect, useState } from "react";
import Link from "next/link"
import Header from "./Header"

const { Content } = Layout;

interface BreadcrumbItem {
  name: string,
  url: string
}

export default function Main(props: { children: any, sidebar: any, course: number }) {
  const [state, setState] = useState<BreadcrumbItem[]>([{ name: "Dashboard", url: "/" }])
  const breadcrumbData = typeof window != "undefined" ? window.localStorage.getItem("breadcrumb") : "";
  useEffect(() => {
    if (window.localStorage.getItem("breadcrumb")) {
      setState(JSON.parse(window.localStorage.getItem("breadcrumb")));
    } else {
      window.localStorage.setItem(
        "breadcrumb",
        JSON.stringify([{ name: "Dashboard", url: "/" }])
      );
    }
  }, [breadcrumbData]);

  return (
    <Layout className="h-screen">
    <Header />
      <Topbar title="Canvas" />
      <Layout className="h-full">
        <Sidebar tabs={props.sidebar} course={props.course} />
        <Content className="h-full p-3 overflow-y-scroll">
          <Breadcrumb>
            {state.map((item) => <Breadcrumb.Item key={item.name}><Link href={item.url}>{item.name}</Link></Breadcrumb.Item>)}
          </Breadcrumb>
          <div className="mt-3">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}