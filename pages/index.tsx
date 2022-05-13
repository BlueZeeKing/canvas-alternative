import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography, Card, Skeleton, Layout, notification } from "antd";

import Topbar from "../components/Topbar";
import setIndex from "../utils/breadcrumb";

interface Item {
  name: string;
  is_favorite: boolean;
  course_code: string;
  id: number;
  default_view: string;
  public_description: string;
}

const { Content } = Layout;

function App(props) {
  const router = useRouter();

  return (
    <Layout className="h-screen">
      <Topbar title="Canvas" />
      <Content className="flex flex-row flex-wrap p-3 overflow-scroll overflow-x-hidden">
        {props.data ? (
          props.data
            .filter((a) => a.is_favorite)
            .map((item: Item) => (
              <Card
                onClick={() => {
                  if (item.default_view == "wiki") {
                    setIndex(1, item.name, `/${item.id}/wiki`);
                    router.push(`/${item.id}/wiki`);
                  } else if (item.default_view == "modules") {
                    setIndex(1, item.name, `/${item.id}/modules`);
                    router.push(`/${item.id}/modules`);
                  } else if (item.default_view == "assignments") {
                    setIndex(1, item.name, `/${item.id}/assignments`);
                    router.push(`/${item.id}/assignments`);
                  }
                }}
                key={item.id}
                title={item.name}
                className="w-72 h-40 m-3 cursor-pointer"
              >
                <p>
                  {!item.public_description || item.public_description == ""
                    ? item.course_code
                    : item.public_description}
                </p>
              </Card>
            ))
        ) : (
          <Skeleton style={{ width: "100%" }} />
        )}
      </Content>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    "https://apsva.instructure.com/api/v1/courses?per_page=50&enrollment_state=active&state=available&include=favorites",
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

export default App;
