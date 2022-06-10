import "./Notes.css";
interface props1 {
  txt: string;
}
function Note(props: props1) {
  return (
    <div className="note">
      <div className="nTxt">{props.txt}</div>
      <div className="nX">
        <button className="deleteNote">X</button>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="Notes">
      <Note txt={"My text"} />
      <Note txt={"My text2"} />
    </div>
  );
}
export default Input;
