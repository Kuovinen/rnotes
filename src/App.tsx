import React from "react";
import "./App.css";
import Menu from "./components/Menu";
import Main from "./components/Main";
import Tabs from "./components/Tabs";
function App() {
  const [notes, setNotes] = React.useState<string[]>([]);
  const [tabs, setTabs] = React.useState<string[]>([]);
  return (
    <div className="App">
      <Menu />
      <Tabs />
      <Main />
    </div>
  );
}

export default App;
