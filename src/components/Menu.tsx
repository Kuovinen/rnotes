import React from "react";
import "./Menu.css";
interface menuProps {
  url: string;
}

function Menu(props: menuProps) {
  console.log("render MENU");
  const [tabName, setTabName] = React.useState<string>("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTabName(e.target.value);
  }
  /*____________________________________________________________________________
  __________________________________________________________________ FUNCTIONS*/
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`${props.url}addtab`, {
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
