import React from "react";
import "./Menu.css";
interface menuProps {
  url: string;
  getDBdata: () => Promise<void>;
}

function Menu(props: menuProps) {
  const [tabName, setTabName] = React.useState<string>("");
  /*____________________________________________________________________________
  __________________________________________________________________ FUNCTIONS*/
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTabName(e.target.value);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`${props.url}/addtab`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: tabName }),
    });
    props.getDBdata();
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
      <button className="makeTabBtn">CREATE</button>
    </form>
  );
}
export default Menu;
