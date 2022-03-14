import { useRouter } from "next/router";
import { Menu } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenRuler, faFile, faLink, faNewspaper } from "@fortawesome/free-solid-svg-icons";

const { SubMenu } = Menu;

import Main from "../../components/Main";
import Header from "../../components/Header";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App(props) {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Modules", `/${router.query.course}/modules?title=${router.query.title}`, 2), []);
  return (
    <>
      <Header />

      <Main
        history={storage}
        title={router.query.title}
        course={router.query.course}
        rate_limit={props.limit}
      >
        <div style={{ padding: "10px" }}>
          <Menu mode="inline">
            {props.data.map((module) => (
              <SubMenu key={module.id} title={module.name}>
                {module.items.map((item) => {
                  if (item.type == "SubHeader") {
                    return <Menu.ItemGroup key={item.id} title={item.title} />;
                  } else if (item.type == "Assignment") {
                    return (
                      <Menu.Item
                        key={item.id}
                        style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                      >
                        <Link
                          href={`/${router.query.course}/assignment/${item.content_id}?title=${router.query.title}`}
                          passHref
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faPenRuler}
                              color="white"
                              style={{ paddingRight: "8px" }}
                            />
                            {item.title}
                          </div>
                        </Link>
                      </Menu.Item>
                    );
                  } else if (item.type == "File") {
                    return (
                      <Menu.Item
                        key={item.id}
                        style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                      >
                        <Link
                          href={`/${router.query.course}/file/${item.content_id}?title=${router.query.title}`}
                          passHref
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faFile}
                              color="white"
                              style={{ paddingRight: "8px" }}
                            />
                            {item.title}
                          </div>
                        </Link>
                      </Menu.Item>
                    );
                  } else if (item.type == "ExternalUrl") {
                    return (
                      <Menu.Item
                        key={item.id}
                        style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                      >
                        <Link href={item.external_url} passHref>
                          <div>
                            <FontAwesomeIcon
                              icon={faLink}
                              color="white"
                              style={{ paddingRight: "8px" }}
                            />
                            {item.title}
                          </div>
                        </Link>
                      </Menu.Item>
                    );
                  } else if (item.type == "Page") {
                    return (
                      <Menu.Item
                        key={item.id}
                        style={{ paddingLeft: `${24 * item.indent + 48}px` }}
                      >
                        <Link
                          href={`/${router.query.course}/page/${item.page_url}?title=${router.query.title}`}
                          passHref
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faNewspaper}
                              color="white"
                              style={{ paddingRight: "8px" }}
                            />
                            {item.title}
                          </div>
                        </Link>
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
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(
    `https://apsva.instructure.com/api/v1/courses/${context.params.course}/modules?include=items&per_page=50`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );

  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      data: data,
      limit: res.headers.get("x-rate-limit-remaining"),
    },
  };
}