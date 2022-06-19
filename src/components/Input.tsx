import React from "react";
import "./Input.css";
interface ref {
  current: string;
}
interface props {
  currentTab: ref;
}

function Input(props: props) {
  const [note, setNote] = React.useState<string>("");
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNote(e.target.value);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/addnote", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: note, tab: props.currentTab.current }),
    });
    const data = await response.text();
    console.log(data);
  }
  return (
    <form
      className="Noteinput"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <input
        className="Notetext"
        type="text"
        value={note}
        onChange={(e) => handleInput(e)}
      />
      <button type="submit" className="makeNoteBtn">
        MAKE NOTE
      </button>
    </form>
  );
}
export default Input;
