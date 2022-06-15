import React from "react";
import "./Notes.css";
interface props1 {
  key: number;
  txt: string;
}
function Note(props: props1) {
  const id: string = "1";

  async function handleDelete(id: string) {
    console.log("Should delete:" + id);
    const response = await fetch("http://localhost:4000/removenote");
    const data = await response.text();
    console.log(data);
  }
  return (
    <div className="note">
      <div className="nTxt">{props.txt}</div>
      <div className="nX">
        <button className="deleteNote" onClick={() => handleDelete(id)}>
          X
        </button>
      </div>
    </div>
  );
}
interface props2 {
  notes: string[];
}
function Notes(props: props2) {
  //temp notes should be the App's prop or maybe even move the whole future fetch request into this element.

  return (
    <div className="Notes">
      {props.notes.map((element, index) => {
        return <Note key={index} txt={element} />;
      })}
    </div>
  );
}
export default Notes;
