import { Layout } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

const { Header } = Layout;

export default function TopBar(props: { title: string }) {
  return (
    <Header>
      <div className="flex flex-row h-full">
        <Link href="/" passHref>
          <div className="cursor-pointer flex flex-col h-full">
            <div className="flex-grow"></div>
            <FontAwesomeIcon icon={faSchool} color="white" size="2x" />
            <div className="flex-grow"></div>
          </div>
        </Link>
        <div className="ml-6 flex flex-col h-full justify-center">
          <h1 className="text-white text-3xl font-bold m-0">{props.title}</h1>
        </div>
      </div>
    </Header>
  );
}
