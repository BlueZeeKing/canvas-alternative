import Head from 'next/head'
import Image from 'next/image'
import { Typography, Space } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Canvas Alternative</title>
        <meta
          name="description"
          content="Alternative to Instructure's Canvas using react"
        />
      </Head>

      <main>
        <Space direction="vertical" size="large" style={{padding: "1rem"}}>
          <Typography>
            <Title>Hi!</Title>
            <Paragraph>
              This is a simple alternative to Instructure's Canvas using react.
            </Paragraph>
          </Typography>
        </Space>
      </main>

      <footer></footer>
    </div>
  );
}
