import React from "react";
import "./Notes.css";
interface noteProps {
  url: string;
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
function Note(props: noteProps) {
  async function handleDelete(id: string) {
    console.log("Should delete: " + id + "from" + props.cur.current);
    const response = await fetch(
      `${props.url}/removenote/${props.cur.current}/${id}`,
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
    const response = await fetch(`${props.url}/getnotes`, {
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
interface notesProps {
  url: string;
  notes: note[];
  currentTab: { current: string };
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
}

/*______________________________________________________________________________
______________________________________________________________ NOTES COMPONENT*/

function Notes(props: notesProps) {
  return (
    <div className="Notes">
      {props.notes.map((element: note) => {
        return (
          <Note
            url={props.url}
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
