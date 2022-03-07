import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Space, Skeleton } from "antd";
import { Parser } from "html-to-react";

import Main from "../../components/Main";
import Header from "../../components/Header";
import useAPI from "../../hooks/useAPI";

const parser = new Parser();

export default function App() {
  const router = useRouter();
  // TODO: pass the course data along
  let home_page = useAPI(
    process.env.API_KEY,
    `/courses/${router.query.course}/front_page`
  );
  console.log(router.query);
  return (
    <>
      <Header />

      <Main title={router.query.title}>
        <div style={{ padding: "10px" }}>
          {Object.keys(home_page).length != 0 ? (
            parser.parse(home_page.data.body)
          ) : (
            <Skeleton active />
          )}
        </div>
      </Main>
    </>
  );
}
