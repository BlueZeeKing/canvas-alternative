import { useRouter } from "next/router";
import { Skeleton, Typography, Divider } from "antd";
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

  useEffect(() => set("Page", `/${router.query.course}/page/${router.query.page}?title=${router.query.title}`, 3), []);

  let page = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/pages/${router.query.page}`,
    [["include", "items"]]
  );

  let body;
  if (Object.keys(page).length != 0) {
    if (storage[3][0] == "Page") {
      set(
        page.data.title,
        `/${router.query.course}/page/${router.query.page}?title=${router.query.title}`,
        3
      );
    }
    body = (
      <>
        <Title>{page.data.title}</Title>
        <Text style={{ color: "gray" }}>
          {new Date(Date.parse(page.data.created_at)).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Text>
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(page.data.body, {
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