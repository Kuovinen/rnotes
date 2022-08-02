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
  const listenerX = React.useRef<number>(0); //same value as above to keep track
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
    //console.log(caruselX);
    //if initial click position isn't 0, then I clicked
    if (caruselIsMovable.current) {
      const currentX: number = (window as any).event.clientX; //cursor positoon
      const deltaX = currentX - initialX.current; //amount mouse traveled
      const speed = 7; //pixels per render
      setCaruselX((caruselX) => {
        return deltaX > 0 ? caruselX + speed : caruselX - speed;
      });
      listenerX.current =
        deltaX > 0 ? listenerX.current + speed : listenerX.current - speed;
      console.log(listenerX.current + "/" + windowWidth);
      if (listenerX.current >= 0) {
        if (lefTabs && lefTabs.current) {
          //move carusles left X amount (equal to left section width)
          setCaruselX(-lefTabs.current.getBoundingClientRect().width);
          listenerX.current = -lefTabs.current.getBoundingClientRect().width;
        }
      }
      if (lefTabs && lefTabs.current) {
        if (
          listenerX.current <=
          -lefTabs.current.getBoundingClientRect().width * 2
        ) {
          //move carusles left X amount (equal to left section width)
          setCaruselX(-lefTabs.current.getBoundingClientRect().width);
          listenerX.current = -lefTabs.current.getBoundingClientRect().width;
        }
      }
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
        listenerX.current = -lefTabs.current.getBoundingClientRect().width;
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
  //use effect EventListener and cleaner for window pointerUp.
  React.useEffect(() => {
    window.addEventListener("pointerup", () => {
      caruselIsMovable.current = false;
      console.log(caruselIsMovable.current);
    });
    return () =>
      window.removeEventListener("pointerup", () => {
        caruselIsMovable.current = false;
        console.log(caruselIsMovable.current);
      });
  }, []);
  //use effect EventListener and cleaner for the caurusel element movement mouse.
  React.useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      moveCarusel(e);
    });
    return () =>
      window.removeEventListener("mousemove", (e) => {
        moveCarusel(e);
      });
  }, []);
  //use effect EventListener and cleaner for the caurusel element movement finger.
  React.useEffect(() => {
    window.addEventListener("pointermove", (e) => {
      moveCarusel(e);
    });
    return () =>
      window.removeEventListener("pointermove", (e) => {
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
      onPointerDown={(e) => handleBeginDrag(e)}
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
