import React from "react";
import "./App.css";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Tabs from "./components/Tabs";
function App() {
  console.log("render APP!----------------");
  /*______________________________________________________________________________
________________________________________________________________________ STATE*/
  const [notes, setNotes] = React.useState<{ _id: string; payload: string }[]>(
    []
  );
  const [tabs, setTabs] = React.useState<string[]>([]);
  const currentTab = React.useRef("notes");
  const initialRender = React.useRef(true);
  const baseURL =
    "http://nodejsserverrnotes-env.eba-rvuegut3.us-east-1.elasticbeanstalk.com";
  const baseURLdev = "http://localhost:4000";
  /*______________________________________________________________________________
____________________________________________________________________ FUNCTIONS*/
  //set tabs
  async function getDBdata() {
    const response = await fetch(`${baseURL}/`);
    const data = await response.text();
    const parsedData = JSON.parse(data);
    console.log("got initial data:");
    console.log(parsedData);

    setTabs(() => [...parsedData]);
    //if the tabs list came non empy, use first value to request it's notes
    if (parsedData.length > 0) {
      currentTab.current = parsedData[0];
      getList(parsedData[0]);
    }
  }
  //now set notes
  async function getList(value: string) {
    console.log("asking for data on the" + value);
    const response = await fetch(`${baseURL}/getnotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: value }),
    });
    const data = await response.text();
    console.log(`got back ${data}`);
    const parsedData = JSON.parse(data);
    console.log("got new notes");
    console.log(parsedData);
    setNotes(() => [...parsedData]);
  }
  /*______________________________________________________________________________
______________________________________________________________________ EFFECTS*/
  //Get inital data for page load
  React.useEffect(() => {
    if (initialRender.current) {
      getDBdata();
      initialRender.current = false;
    }
  }, []);

  /*______________________________________________________________________________
_______________________________________________________________________ RETURN*/
  return (
    <div className="App">
      <Menu url={baseURL} />
      <Tabs
        url={baseURL}
        tabs={tabs}
        setNotes={setNotes}
        currentTab={currentTab}
      />
      <Main
        url={baseURL}
        notes={notes}
        currentTab={currentTab}
        setNotes={setNotes}
      />
    </div>
  );
}

export default App;
