import "./Tabs.css";
interface props {
  tabs: string[];
}
function Tabs(props: props) {
  console.log(props.tabs);
  return (
    <div className="carousel">
      <div className="Tabs">
        {props.tabs.map((element) => (
          <div className="tab">{element}</div>
        ))}
      </div>
      <div className="Tabs">
        {props.tabs.map((element) => (
          <div className="tab">{element}</div>
        ))}
      </div>
    </div>
  );
}
export default Tabs;
