import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "../../pdf-worker";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
import { useState } from "react";

const { SubMenu } = Menu;

import Main from "../../components/Main";
import Header from "../../components/Header";
import useFile from "../../hooks/useFile";
import useAPI from "../../hooks/useAPI";

export default function App() {
  const router = useRouter();
  const [url, setURL] = useState("")
  // TODO: pass the course data along
  let assignment = useAPI(
    process.env.API_KEY,
    `/files/${router.query.file}/public_url`,
    []
  );
  let body;
  // TODO: make menu item group actually surround the items
  if (Object.keys(assignment).length != 0) {
    console.log(new URLSearchParams([["include", "hello"]]).toString());
    body = <Document file={`http://localhost:3000/api/file?${new URLSearchParams([["include", "hello"]]).toString()}`} />;
  } else {
    body = <Skeleton active />;
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
  let temp = [];
  let group_temp = [];
  let temp_item = {
    title: "",
    id: 0,
  };
  list.items.forEach((item) => {
    if (item.type == "SubHeader") {
      if (temp_item.id == 0) {
        temp.push(<>{group_temp}</>);
      } else {
        temp.push(
          <Menu.ItemGroup key={temp_item.id} title={temp_item.title}>
            {group_temp}
          </Menu.ItemGroup>
        );
      }
      group_temp = [];
      temp_item = item;
    } else {
      group_temp.push(
        <Menu.Item
          key={item.id}
          style={{ paddingLeft: `${24 * item.indent + 48}px` }}
        >
          {item.title}
        </Menu.Item>
      );
    }
  });

  temp.push(
    <Menu.ItemGroup key={temp_item.id} title={temp_item.title}>
      {group_temp}
    </Menu.ItemGroup>
  );

  return temp;
}
