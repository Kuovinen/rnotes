import React from "react";
import "./Menu.css";
function Menu() {
  console.log("render MENU");
  const [tabName, setTabName] = React.useState<string>("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTabName(e.target.value);
  }
  /*____________________________________________________________________________
  __________________________________________________________________ FUNCTIONS*/
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
  /*____________________________________________________________________________
  _____________________________________________________________________ RETURN*/
  return (
    <form
      className="menu"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        type="text"
        placeholder="Input new category"
        className="Tabtext"
        value={tabName}
        onChange={(e) => handleInput(e)}
      />
      <button className="makeTabBtn">MAKE TAB</button>
    </form>
  );
}
export default Menu;
