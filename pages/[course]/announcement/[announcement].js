import { useRouter } from "next/router";
import { Skeleton, Typography, Divider, Avatar } from "antd";
import DOMPurify from "dompurify";
import { useEffect } from "react";

const { Title, Text } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
import Center from "../../../components/Center";
import useAPI from "../../../hooks/useAPI";
import useSessionStorage from "../../../hooks/useSessionStorage";

export default function App() {
  const router = useRouter();
  const [storage, set, reset] = useSessionStorage();

  useEffect(() => set("Announcement", `/${router.query.course}/announcement/${router.query.announcement}?title=${router.query.title}`, 3), []);

  const announcement = useAPI(
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
        <div style={{ display: "flex", verticalAlign: "middle" }}>
          <Title style={{ margin: 0 }}>{announcement.data.title}</Title>
          <div style={{ flexGrow: 1 }}></div>
          <Center height="46.73px">
            <Text style={{marginRight:"10px"}}>{announcement.data.author.display_name}</Text>
          </Center>
          <Center height="46.73px">
            <Avatar src={announcement.data.author.avatar_image_url} />
          </Center>
        </div>
        <Text style={{color:"gray"}}>{new Date(Date.parse(announcement.data.posted_at)).toLocaleString("en-US", {
          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
        })}</Text>
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