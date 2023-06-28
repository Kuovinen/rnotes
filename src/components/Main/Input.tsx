import React from "react";
import "./Input.css";
interface ref {
  current: string;
}
interface props {
  url: string;
  currentTab: ref;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
}

function Input(props: props) {
  const [note, setNote] = React.useState<string>("");
  /*____________________________________________________________________________
  __________________________________________________________________ FUNCTIONS*/
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setNote(e.target.value);
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(`${props.url}/addnote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: note, tab: props.currentTab.current }),
    });
    const data = await response.text();
    console.log(data);
    await getList();
  }

  //used in handle submit to get data and rerender the new notes list
  async function getList() {
    const response = await fetch(`${props.url}/getnotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: props.currentTab.current }),
    });
    const data = await response.text();
    const parsedData = JSON.parse(data);
    console.log("got new notes");
    console.log(parsedData);
    props.setNotes(() => [...parsedData]);
  }
  /*____________________________________________________________________________
  _____________________________________________________________________ RETURN*/
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
        placeholder="Write new note here"
        value={note}
        onChange={(e) => handleInput(e)}
      />
      <button type="submit" className="makeNoteBtn">
        SAVE
      </button>
    </form>
  );
}
export default Input;
