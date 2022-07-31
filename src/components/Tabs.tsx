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

/*______________________________________________________________________________
________________________________________________________________ TAB COMPONENT*/
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
/*______________________________________________________________________________
_____________________________________________________ TABS CONTAINER COMPONENT*/
function Tabs(props: props) {
  const initialX = React.useRef<number>(0); //starting x position of carusel
  //starting x position of carusel
  const caruselIsMovable = React.useRef<boolean>(false);
  //the curesel container DOM Elem
  const caru = React.useRef<HTMLDivElement>(null);
  const initialRender = React.useRef<boolean>(true); //trigger for useEffect
  const lefTabs = React.useRef<HTMLDivElement>(null);
  //current carusel X position
  const [caruselX, setCaruselX] = React.useState<number>(0);
  const windowWidth = (window as any).innerWidth; //device width

  /*____________________________________________________________________________
  __________________________________________________________________ FUNCTIONS*/
  //on click down define init X and thus alow movement defined in handler
  function handleBeginDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    initialX.current = (window as any).event.clientX;
    caruselIsMovable.current = true;
  }

  //handler callback function, look below for the handler in the useEffect
  function moveCarusel(e: MouseEvent) {
    e.stopPropagation();
    //if initial click position isn't 0, then I clicked
    if (caruselIsMovable.current) {
      const currentX: number = (window as any).event.clientX; //cursor positoon
      const deltaX = currentX - initialX.current; //amount mouse traveled
      setCaruselX((caruselX) => {
        return deltaX > 0 ? caruselX + 1 : caruselX - 1;
      });
      /*if (caruselX < -windowWidth) {
        console.log("X is less than WIDTH!!!");
        setX(0);
        listenerX.current = 0;
      }*/
    }
  }
  /*____________________________________________________________________________
  ____________________________________________________________________ EFFECTS*/
  //initial carusel offset left
  React.useEffect(() => {
    if (props.tabs.length > 0) {
      if (initialRender.current && lefTabs && lefTabs.current) {
        //move carusles left X amount (equal to left section width)
        setCaruselX(-lefTabs.current.getBoundingClientRect().width);
      }
      initialRender.current = false;
    }
  });
  //use effect EventListener and cleaner for window mouseUp.
  React.useEffect(() => {
    window.addEventListener("mouseup", () => {
      caruselIsMovable.current = false;
      console.log(caruselIsMovable.current);
    });
    return () =>
      window.removeEventListener("mouseup", () => {
        caruselIsMovable.current = false;
        console.log(caruselIsMovable.current);
      });
  }, []);
  //use effect EventListener and cleaner for the caurusel element movement.
  React.useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      moveCarusel(e);
    });
    return () =>
      window.removeEventListener("mousemove", (e) => {
        moveCarusel(e);
      });
  }, []);

  /*____________________________________________________________________________
  _____________________________________________________________________ RETURN*/
  return (
    <div
      className="carousel"
      ref={caru}
      style={{
        left: `${caruselX}px`,
      }}
      onMouseDown={(e) => handleBeginDrag(e)}
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
