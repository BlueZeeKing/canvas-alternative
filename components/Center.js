export default function Center(props) {
  return (
    <div style={{ display: "flex", height: props.height, flexDirection: "column" }}>
      <div style={{ flexGrow: 1 }}></div>
      {props.children}
      <div style={{ flexGrow: 1 }}></div>
    </div>
  );
}