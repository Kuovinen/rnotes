import React from "react";
import "./Menu.css";
function Menu() {
  const [note, setNote] = React.useState<string>("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNote(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(note);
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
        value={note}
        onChange={(e) => handleInput(e)}
      />
      <button className="makeTabBtn">NEW TAB</button>
    </form>
  );
}
export default Menu;
