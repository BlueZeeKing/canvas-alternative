import Main from "../../components/Main";
import process from "../../utils/htmlProcessor";
import setItem from "../../utils/breadcrumb";

export default function App(props) {
  setItem(2, "Home", `/${props.course}/wiki`);

  return (
    <Main sidebar={props.tabs} course={props.course}>
      <div
        dangerouslySetInnerHTML={{
          __html: process(props.data.body),
        }}
      ></div>
    </Main>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const [res, tabsRaw] = await Promise.all([
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/front_page`,
      {
        headers: {
          // @ts-expect-error
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
    fetch(
      `https://apsva.instructure.com/api/v1/courses/${context.params.course}/tabs`,
      {
        headers: {
          // @ts-expect-error
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ),
  ]);

  const [data, tabs] = await Promise.all([res.json(), tabsRaw.json()]);

  console.log(tabs)

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
