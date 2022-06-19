import "./Tabs.css";
interface props {
  tabs: string[];
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
}
interface props2 {
  title: string;
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
}
function Tab(props: props2) {
  async function getList() {
    const response = await fetch("http://localhost:4000/getnotes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: props.title }),
    });
    const data = await response.text();
    const parsedData = JSON.parse(data);
    console.log("got new notes");
    console.log(parsedData);
    props.setNotes(() => [
      ...parsedData.map(
        (element: { _id: any; payload: string }) => element.payload
      ),
    ]);
  }

  return (
    <div className="tab" onClick={getList}>
      {props.title}
    </div>
  );
}

function Tabs(props: props) {
  console.log(props.tabs);
  return (
    <div className="carousel">
      <div className="Tabs">
        {props.tabs.map((element) => (
          <Tab title={element} setNotes={props.setNotes} />
        ))}
      </div>
      <div className="Tabs">
        {props.tabs.map((element) => (
          <Tab title={element} setNotes={props.setNotes} />
        ))}
      </div>
    </div>
  );
}
export default Tabs;
