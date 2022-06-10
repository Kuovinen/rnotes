import React from "react";
import "./Input.css";
function Input() {
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
