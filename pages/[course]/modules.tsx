import Link from "next/link"
import {
  faPenRuler,
  faFile,
  faLink,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import Main from "../../components/Main";
import setItem from "../../utils/breadcrumb";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { SubMenu } = Menu;

interface Item {
  content_id: number;
  title: string;
  type: string;
  id: number;
  indent: number;
  external_url: string;
  page_url: string;
}

interface Module {
  id: number;
  name: string;
  items: Item[];
}

export default function App(props) {
  console.log(props)
  setItem(2, "Modules", `/${props.course}/modules`);
  return (
    <Main sidebar={props.tabs} course={props.course}>
      <Menu mode="inline">
        {props.data.map((module: Module) => (
          <SubMenu key={module.id} title={module.name}>
            {module.items.map((item: Item) => {
              if (item.type == "SubHeader") {
                return <Menu.ItemGroup key={item.id} title={item.title} />;
              } else if (item.type == "Assignment") {
                return (
                  <Menu.Item
                    key={props.id}
                    style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                  >
                    <Item
                      icon={faPenRuler}
                      name={item.title}
                      url={`/${props.course}/assignment/${item.content_id}`}
                      key={item.id}
                    />
                  </Menu.Item>
                );
              } else if (item.type == "File") {
                return (
                  <Menu.Item
                    key={props.id}
                    style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                  >
                    <Item
                      icon={faFile}
                      name={item.title}
                      url={`/${props.course}/file/${item.content_id}`}
                      key={item.id}
                    />
                  </Menu.Item>
                );
              } else if (item.type == "ExternalUrl") {
                return (
                  <Menu.Item
                    key={props.id}
                    style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                  >
                    <Item
                      icon={faLink}
                      name={item.title}
                      url={item.external_url}
                      key={item.id}
                    />
                  </Menu.Item>
                );
              } else if (item.type == "Page") {
                return (
                  <Menu.Item
                    key={props.id}
                    style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                  >
                    <Item
                      icon={faNewspaper}
                      name={item.title}
                      url={`/${props.course}/page/${item.page_url}`}
                      key={item.id}
                    />
                  </Menu.Item>
                );
              } else {
                return (
                  <Menu.Item
                    key={item.id}
                    style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                  >
                    <Link href="/">{item.title}</Link>
                  </Menu.Item>
                );
              }
            })}
          </SubMenu>
        ))}
      </Menu>
    </Main>
  );
}

function Item(props: {
  icon: any;
  name: string;
  url: string;
}) {
  return (
    <Link passHref href={props.url}>
      <div>
        <FontAwesomeIcon
          icon={props.icon}
          color="white"
          style={{ paddingRight: "8px" }}
        />
        {props.name}
      </div>
    </Link>
  );
}

export async function getServerSideProps(context) {
  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/modules?include=items&per_page=50`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/tabs`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
  ]);

  const [data, tabs] = await Promise.all([res.json(), tabsRaw.json()]);

  // Pass data to the page via props
  return {
    props: {
      data: data,
      limit: res.headers.get("x-rate-limit-remaining"),
      tabs: tabs,
      course: context.params.course,
    },
  };
}