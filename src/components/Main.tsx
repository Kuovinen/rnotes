import "./Main.css";
import Notes from "./Notes";
import Input from "./Input";
import Note from "../features/notes/Note";
interface ref {
  current: string;
}

interface props {
  notes: { _id: string; payload: string }[];
  currentTab: ref;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
}
function Main(props: props) {
  console.log("render -------MAIN");
  return (
    <main className="main">
      <Notes notes={props.notes} currentTab={props.currentTab} />
      <Input currentTab={props.currentTab} setNotes={props.setNotes} />
    </main>
  );
}
export default Main;
