import Main from "../../components/Main";
import setItem from "../../utils/breadcrumb";
import { Menu } from "antd";
import Link from "next/link";

interface Assignment {
  id: number;
  description: string;
  name: string;
}

interface AssignmentGroup {
  id: number;
  name: string;
  assignments: Assignment[];
}

export default function App(props) {
  setItem(2, "Assignments", `/${props.course}/assignments`);

  return (
    <Main course={props.course} sidebar={props.tabs}>
      <Menu mode="inline">
        <Menu.ItemGroup title="Assignments">
          {props.data.map((group: AssignmentGroup) => (
            <Menu.SubMenu key={group.id} title={group.name}>
              {group.assignments.map((assignment: Assignment) => (
                <Menu.Item key={assignment.id}>
                  <Link href={`/${props.course}/assignment/${assignment.id}`}>
                    {assignment.name}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/assignment_groups?include=assignments?per_page=80`,
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
  ]);

  const [data, tabs] = await Promise.all([res.json(), tabsRaw.json()]);

  // Pass data to the page via props
  return {
    props: {
      data: data,
      limit: res.headers.get("x-rate-limit-remaining"),
      tabs: tabs,
      course: context.params.course,
    },
  };
}
