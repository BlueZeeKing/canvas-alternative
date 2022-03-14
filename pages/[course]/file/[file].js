import { useRouter } from "next/router";
import { Skeleton, Typography, Divider, Avatar } from "antd";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link"

const Document = dynamic(
  () => import("react-pdf/dist/esm/entry.webpack5").then((pdf) => pdf.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import("react-pdf/dist/esm/entry.webpack5").then((pdf) => pdf.Page),
  { ssr: false }
);

const { Title, Text } = Typography;

import Main from "../../../components/Main";
import Header from "../../../components/Header";
import Center from "../../../components/Center";
import useSessionStorage from "../../../hooks/useSessionStorage";

export default function App(props) {
  const [numPages, setNumPages] = useState([]);
  const [storage, set, reset] = useSessionStorage();
  const router = useRouter();

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }
  
  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
      textLayers.forEach(layer => {
        const { style } = layer;
        style.top = "0";
        style.left = "0";
        style.transform = "";
    });
  }

  useEffect(() => set(props.data.display_name, `/${router.query.course}/file/${router.query.file}?title=${router.query.title}`, 3), []);

  return (
    <>
      <Header />

      <Main
        history={storage}
        title={router.query.title}
        course={router.query.course}
        page
        rate_limit={props.limit}
        tabs={props.tabs}
      >
        <div style={{ padding: "10px" }}>
          <div style={{ display: "flex", verticalAlign: "middle" }}>
            <Title style={{ margin: 0 }}>{props.data.display_name}</Title>
            <div style={{ flexGrow: 1 }}></div>
            <Center height="46.73px">
              <Link href={props.data.url}>Click to download</Link>
            </Center>
          </div>
          <Text style={{ color: "gray" }}>
            {new Date(Date.parse(props.data.created_at)).toLocaleString(
              "en-US",
              {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </Text>
          <Divider />
          <Document
            file={props.url}
            onLoadSuccess={onDocumentLoadSuccess}
            style={{ width: "100%" }}
          >
            {Array.apply(null, { length: numPages })
              .map(Number.call, Number)
              .map((item, index) =>
                item == null ? (
                  ""
                ) : (
                  <Page
                    onLoadSuccess={removeTextLayerOffset}
                    pageNumber={index + 1}
                    key={item}
                    className="page-padding"
                  />
                )
              )}
          </Document>
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps(context) {
  const [res, tabsRaw, file] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/files/${context.params.file}`,
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
    fetch(
      `https://apsva.instructure.com/api/v1/files/${context.params.file}/public_url`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
  ]);

  const [data, fileData, tabs] = await Promise.all([res.json(), file.json(), tabsRaw.json()]);

  // Pass data to the page via props
  return {
    props: {
      url: fileData.public_url,
      data: data,
      limit: res.headers.get("x-rate-limit-remaining"),
      tabs: tabs,
    },
  };
}