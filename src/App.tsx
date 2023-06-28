import React from "react";
import "./App.css";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Tabs from "./components/Tabs";
function App() {
  /*____________________________________________________________________________
________________________________________________________________________ STATE*/
  const [notes, setNotes] = React.useState<{ _id: string; payload: string }[]>(
    []
  );
  const [tabs, setTabs] = React.useState<string[]>([]);
  const currentTab = React.useRef("notes");
  const initialRender = React.useRef(true);
  const baseURL = "https://rnotesserver.in";
  //const baseURLdev = "http://localhost:4000";
  /*____________________________________________________________________________
____________________________________________________________________ FUNCTIONS*/
  //Get TAB titbles from Database as an array of strings
  const getDBdata = React.useCallback(async () => {
    const response = await fetch(`${baseURL}/`);
    const data = await response.text();
    const parsedData = JSON.parse(data);

    setTabs(() => [...parsedData]);
    //if the tabs list came non empy, use first value to request it's notes
    //and assign their value to the state thus displaying them on rerender
    if (parsedData.length > 0) {
      currentTab.current = parsedData[0];
      getList(parsedData[0]);
    }
  }, [currentTab]);
  //The function used above, utilises first string in the DBdata array for query
  async function getList(value: string) {
    const response = await fetch(`${baseURL}/getnotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: value }),
    });
    const data = await response.text();
    const parsedData = JSON.parse(data);
    //parsedData is an Array of Mongo objects in the style of
    //{id:x,payload:noteText,tab:categoryName}
    setNotes(() => [...parsedData]);
  }
  /*____________________________________________________________________________
______________________________________________________________________ EFFECTS*/
  //Get inital data for page load, empty dependency array, so it happens once
  React.useEffect(() => {
    if (initialRender.current) {
      getDBdata();
      initialRender.current = false;
    }
  }, [getDBdata]);

  /*____________________________________________________________________________
_______________________________________________________________________ RETURN*/
  return (
    <div className="App">
      {/*TOP INPUT SECTION*/}
      <Menu url={baseURL} />
      {/*THE CATEGORY TABS*/}
      <Tabs
        url={baseURL}
        tabs={tabs}
        setTabs={setTabs}
        setNotes={setNotes}
        currentTab={currentTab}
      />
      {/*THE NOTES AND THEIR INPUT AT THE BOTTOM*/}
      <Main
        url={baseURL}
        notes={notes}
        currentTab={currentTab}
        setNotes={setNotes}
      />
      <footer>You currently have {tabs.length} tabs</footer>
    </div>
  );
}

export default App;
