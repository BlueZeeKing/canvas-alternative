import { useRouter } from "next/router";
import { Skeleton, Menu } from "antd";
import Link from "next/link";

import { useEffect } from "react";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";
import useSessionStorage from "../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Announcements", `/${router.query.course}/announcements?title=${router.query.title}`, 2), []);

  let announcements = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/discussion_topics`,
    [["only_announcements", true]]
  );
  let body;
  // TODO: make menu item group actually surround the items
  console.log(announcements);
  if (Object.keys(announcements).length != 0) {
    if (!("errors" in announcements.data)) {
      body = (
        <Menu mode="inline">
          <Menu.ItemGroup title="Announcements">
            {announcements.data.map((announcement) => (
              <Menu.Item key={announcement.id}>
                <Link
                  href={`/${router.query.course}/announcement/${announcement.id}?title=${router.query.title}`}
                >
                  {announcement.title}
                </Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
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

      <Main history={storage} title={router.query.title} course={router.query.course}>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}