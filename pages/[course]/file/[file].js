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
import useFile from "../../../hooks/useFile";
import useSessionStorage from "../../../hooks/useSessionStorage";
import useAPI from "../../../hooks/useAPI";

export default function App() {
  const [numPages, setNumPages] = useState([]);
  const [storage, set, reset] = useSessionStorage();
  const router = useRouter();
  const file = useFile(process.env.API_KEY, router.query.file);
  const fileData = useAPI(process.env.API_KEY, `/files/${router.query.file}`, []);

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

  useEffect(() => set("File", `/${router.query.course}/file/${router.query.file}?title=${router.query.title}`, 3), []);

  let body;
  
  if (file && Object.keys(fileData).length != 0) {
    console.log(fileData);
    if (storage[3][0] == "File") {
      set(fileData.data.display_name, `/${router.query.course}/file/${router.query.file}?title=${router.query.title}`, 3);
    }

    body = (
      <>
        <div style={{ display: "flex", verticalAlign: "middle" }}>
          <Title style={{ margin: 0 }}>{fileData.data.display_name}</Title>
          <div style={{ flexGrow: 1 }}></div>
          <Center height="46.73px">
            <Link href={fileData.data.url}>Click to download</Link>
          </Center>
        </div>
        <Text style={{ color: "gray" }}>
          {new Date(Date.parse(fileData.data.created_at)).toLocaleString(
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
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          style={{ width: "100%" }}
        >
          {Array.apply(null, {length: numPages}).map(Number.call, Number).map((item, index) => (
            item == null ? "" : <Page
              onLoadSuccess={removeTextLayerOffset}
              pageNumber={index+1}
              key={item}
            />
          ))}
        </Document>
      </>
    );
  } else {
    body = <Skeleton active />;
  }
  return (
    <>
      <Header />

      <Main history={storage} title={router.query.title} course={router.query.course} page>
        <div style={{ padding: "10px" }}>{body}</div>
      </Main>
    </>
  );
}