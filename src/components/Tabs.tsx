import "./Tabs.css";
import React from "react";
//props for the tabs container
interface props {
  tabs: string[];
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
  currentTab: { current: string };
}
//Props for singular tab component
interface props2 {
  title: string;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
  currentTab: { current: string };
}

//TAB COMPONENTS------------------------------------------------------------
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
//TABS COMPONENTS------------------------------------------------------------
function Tabs(props: props) {
  const initX = React.useRef<number>(0);
  const lefTabs = React.useRef<HTMLDivElement>(null);
  const initialRender = React.useRef<boolean>(true);
  const [x, setX] = React.useState<number>(0);
  const listenerX = React.useRef<number>(0);
  const width = (window as any).innerWidth;
  console.log("rerendered TANS, current X is : " + `${x}px`);
  const caru = React.useRef<HTMLDivElement>(null);

  //on click down define init X and thus alow movement defined in handler
  function handleBeginDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    const boundry = caru.current?.getBoundingClientRect();
    //get initial click position
    initX.current = (window as any).event.clientX;
    //console.log(boundry?.left);
    //setX((x) => x + 20);
  }
  //on click UP restore X and thus DISalow movement defined in handler
  function handleEndDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    initX.current = 0;
  }

  //handler callback function, look below for the handler in the useEffect
  function moveCaru(e: MouseEvent) {
    e.stopPropagation();
    //if initial click position isn't 0, then I clicked
    if (initX.current) {
      const currentX = (window as any).event.clientX;
      setX((x) => x + currentX - initX.current);
      listenerX.current += currentX - initX.current;
      console.log(x + "/" + listenerX.current);
      if (listenerX.current < -width) {
        console.log("X is less than WIDTH!!!");
        setX(0);
        listenerX.current = 0;
      }
    }
  }
  //use effect EventListener and cleaner for the caurusel element.
  React.useEffect(() => {
    caru.current?.addEventListener("mousemove", (e) => {
      moveCaru(e);
    });
    return caru.current?.removeEventListener("mousemove", (e) => {
      moveCaru(e);
    });
  }, []);
  //initial carusel offset left
  React.useEffect(() => {
    console.log(props.tabs);
    if (props.tabs.length > 0) {
      if (initialRender.current && lefTabs && lefTabs.current) {
        setX(-lefTabs.current.getBoundingClientRect().width);
      }
      initialRender.current = false;
    }
  });
  //RETURN-------------------------------------------------------------------
  return (
    <div
      className="carousel"
      ref={caru}
      style={{
        left: `${x}px`,
      }}
      onMouseDown={(e) => handleBeginDrag(e)}
      onMouseUp={(e) => handleEndDrag(e)}
    >
      <div className="Tabs" ref={lefTabs}>
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
