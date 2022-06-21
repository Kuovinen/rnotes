import "./Tabs.css";
import React from "react";
interface props {
  tabs: string[];
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
  currentTab: { current: string };
}
interface props2 {
  title: string;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
  currentTab: { current: string };
}
function Tab(props: props2) {
  async function getList() {
    props.currentTab.current = props.title;
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
    props.setNotes(() => [...parsedData]);
  }

  return (
    <div className="tab" onClick={getList}>
      {props.title}
    </div>
  );
}

function Tabs(props: props) {
  console.log("render TABS");
  const initX = React.useRef<number>(0);
  const [x, setX] = React.useState<number>(0);
  const listenerX = React.useRef<number>(0);
  const width = (window as any).innerWidth;
  console.log("rerendered TAS, current X is : " + x);
  const caru = React.useRef<HTMLDivElement>(null);
  function handleBeginDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();

    const boundry = caru.current?.getBoundingClientRect();
    //get initial click position
    initX.current = (window as any).event.clientX;
    //console.log(boundry?.left);
    //setX((x) => x + 20);
  }
  function handleEndDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    initX.current = 0;
  }
  function moveCaru(e: MouseEvent) {
    e.stopPropagation();
    //if initial click position isn't 0, then I clicked
    if (initX.current) {
      const currentX = (window as any).event.clientX;
      setX((x) => x + currentX - initX.current);
      listenerX.current += currentX - initX.current;
      console.log(x + "/" + listenerX.current);
      if (listenerX.current < -width) {
        console.log("X is less that WIDTH!!!");
        setX(0);
        listenerX.current = 0;
      }
    }
  }

  React.useEffect(() => {
    caru.current?.addEventListener("mousemove", (e) => {
      moveCaru(e);
    });
    return caru.current?.removeEventListener("mousemove", (e) => {
      moveCaru(e);
    });
  }, []);
  return (
    <div className="carousel" ref={caru} style={{ left: `${x}px` }}>
      <div
        className="Tabs"
        onMouseDown={(e) => handleBeginDrag(e)}
        onMouseUp={(e) => handleEndDrag(e)}
      >
        {props.tabs.map((element, index) => (
          <Tab
            key={index}
            title={element}
            setNotes={props.setNotes}
            currentTab={props.currentTab}
          />
        ))}
      </div>
      <div className="Tabs">
        {props.tabs.map((element, index) => (
          <Tab
            key={index + 2}
            title={element}
            setNotes={props.setNotes}
            currentTab={props.currentTab}
          />
        ))}
      </div>
    </div>
  );
}
export default Tabs;
