import { useRouter } from "next/router";
import { Skeleton, Typography, Divider } from "antd";
import DOMPurify from "dompurify";
import { useEffect } from "react";

const { Title } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
import useAPI from "../../../hooks/useAPI";
import useSessionStorage from "../../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Announcement", `/${router.query.course}/announcement/${router.query.announcement}?title=${router.query.title}`, 3), []);

  let announcement = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/discussion_topics/${router.query.announcement}`,
    [["include", "items"]]
  );
  console.log(announcement);

  let body;
  if (Object.keys(announcement).length != 0) {
    if (storage[3][0] == "Announcement") {
      set(announcement.data.title, `/${router.query.course}/announcement/${router.query.announcement}?title=${router.query.title}`, 3);
    }
    body = (
      <>
        <Title>{announcement.data.title}</Title>
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(announcement.data.message, {
              USE_PROFILES: { html: true },
            }),
          }}
        ></div>
      </>
    );
  } else {
    body = <Skeleton active />;
  }
  // TODO: make menu item group actually surround the items
  return (
    <>
      <Header />

      <Main history={storage} title={router.query.title} course={router.query.course} page>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}