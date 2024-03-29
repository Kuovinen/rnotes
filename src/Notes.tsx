import React from "react";
import "./Notes.css";
interface props1 {
  key: string;
  id: string;
  txt: string;
  cur: { current: string };
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
}
interface note {
  _id: string;
  payload: string;
}
/*______________________________________________________________________________
__________________________________________________________________ SINGLE NOTE*/
function Note(props: props1) {
  async function handleDelete(id: string) {
    console.log("Should delete: " + id + "from" + props.cur.current);
    const response = await fetch(
      `http://localhost:4000/removenote/${props.cur.current}/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.text();
    console.log(data);
    await getList();
  }
  //used in handle submit to get data and rerender the new notes list
  async function getList() {
    const response = await fetch("http://localhost:4000/getnotes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload: props.cur.current }),
    });
    const data = await response.text();
    const parsedData = JSON.parse(data);
    console.log("got new notes");
    console.log(parsedData);
    props.setNotes(() => [...parsedData]);
  }
  /*______________________________________________________________________________
__________________________________________________________________ NOTE RETURN*/
  return (
    <div className="note">
      <div className="nTxt">{props.txt}</div>
      <div className="nX">
        <button className="deleteNote" onClick={() => handleDelete(props.id)}>
          X
        </button>
      </div>
    </div>
  );
}
interface props2 {
  notes: note[];
  currentTab: { current: string };
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
}

/*______________________________________________________________________________
______________________________________________________________ NOTES COMPONENT*/

function Notes(props: props2) {
  return (
    <div className="Notes">
      {props.notes.map((element: note) => {
        return (
          <Note
            key={element._id}
            id={element._id}
            txt={element.payload}
            cur={props.currentTab}
            setNotes={props.setNotes}
          />
        );
      })}
    </div>
  );
}
export default Notes;
