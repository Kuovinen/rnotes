import React from "react";
import "./App.css";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Tabs from "./components/Tabs";
function App() {
  const [notes, setNotes] = React.useState<string[]>([]);
  const [tabs, setTabs] = React.useState<string[]>([]);

  async function getDBdata() {
    const response = await fetch("http://localhost:4000/");
    const data = await response.text();
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    setNotes((notes) => [
      ...notes,
      ...parsedData.map(
        (element: { _id: any; payload: string }) => element.payload
      ),
    ]);
  }
  React.useEffect(() => {
    getDBdata();
  }, []);

  return (
    <div className="App">
      <Menu />
      <Tabs />
      <Main notes={notes} />
    </div>
  );
}

export default App;
