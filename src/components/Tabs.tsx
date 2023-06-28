import "./Tabs.css";
import React from "react";
//props for the tabs container
interface tabsProps {
  url: string;
  tabs: string[];
  setTabs: React.Dispatch<React.SetStateAction<string[]>>;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
  currentTab: { current: string };
}
//Props for singular tab component
interface tabProps {
  url: string;
  title: string;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
  currentTab: { current: string };
}

/*______________________________________________________________________________
________________________________________________________________ TAB COMPONENT*/
function Tab(props: tabProps) {
  async function getList() {
    props.currentTab.current = props.title;
    const response = await fetch(`${props.url}/getnotes`, {
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
      {props.title.toUpperCase()}
    </div>
  );
}
/*______________________________________________________________________________
_____________________________________________________ TABS CONTAINER COMPONENT*/
function Tabs(props: tabsProps) {
  let displayTabs: string[] = [];
  if (props.tabs.length > 1) {
    displayTabs = props.tabs.slice(0, 2);
  } else displayTabs = props.tabs;
  //Cycle the TAB array to display the next or previous category in the view
  function changeDisplayedTabs(direction: string) {
    props.setTabs((original: string[]) => {
      if (direction === "R") {
        return [...original.slice(1), original[0]];
      } else if (direction === "L") {
        return [original[original.length - 1], ...original.slice(0, -1)];
      } else return original;
    });
  }

  /*____________________________________________________________________________
  _____________________________________________________________________ RETURN*/
  return (
    <div className="carousel">
      <button onClick={() => changeDisplayedTabs("R")}>{"<"}</button>
      <div className="Tabs">
        {displayTabs.map((element, index) => (
          <Tab
            url={props.url}
            key={index + 2}
            title={element}
            setNotes={props.setNotes}
            currentTab={props.currentTab}
          />
        ))}
      </div>
      <button onClick={() => changeDisplayedTabs("L")}>{">"}</button>
    </div>
  );
}
export default Tabs;
