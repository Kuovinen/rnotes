import React from "react";
import "./Menu.css";
function Menu() {
  const [tabName, setTabName] = React.useState<string>("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTabName(e.target.value);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/addtab", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: tabName }),
    });
    const data = await response.text();
    console.log(data);
  }
  return (
    <form
      className="menu"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        className="Tabtext"
        value={tabName}
        onChange={(e) => handleInput(e)}
      />
      <button className="makeTabBtn">NEW TAB</button>
    </form>
  );
}
export default Menu;
