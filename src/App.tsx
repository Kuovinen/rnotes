import React from "react";
import "./App.css";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Tabs from "./components/Tabs";
function App() {
  const [notes, setNotes] = React.useState<string[]>([]);
  const [tabs, setTabs] = React.useState<string[]>([]);
  const currentTab = React.useRef("notes");
  async function getDBdata() {
    const response = await fetch("http://localhost:4000/");
    const data = await response.text();
    const parsedData = JSON.parse(data);
    console.log("got initial data:");
    console.log(parsedData);

    setTabs(() => [...parsedData]);
  }
  React.useEffect(() => {
    getDBdata();
  }, []);

  return (
    <div className="App">
      <Menu />
      <Tabs tabs={tabs} setNotes={setNotes} currentTab={currentTab} />
      <Main notes={notes} currentTab={currentTab} />
    </div>
  );
}

export default App;
