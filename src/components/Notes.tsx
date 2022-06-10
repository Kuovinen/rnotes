import React from "react";
import "./Notes.css";
interface props1 {
  key: number;
  txt: string;
}
function Note(props: props1) {
  const id: string = "1";

  function handleDelete(id: string) {
    console.log("Should delete:" + id);
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

function Input() {
  //temp notes should be the App's prop or maybe even move the whole future fetch request into this element.
  const [tempNotes, setTempNotes] = React.useState<string[]>(["one", "two"]);
  return (
    <div className="Notes">
      {tempNotes.map((element, index) => {
        return <Note key={index} txt={"My text " + element} />;
      })}
    </div>
  );
}
export default Input;
