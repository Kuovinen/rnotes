import "./Main.css";
import Notes from "./Notes";
import Input from "./Input";
import Note from "../features/notes/Note";

interface props {
  notes: string[];
}
function Main(props: props) {
  return (
    <main className="main">
      <Notes notes={props.notes} />
      <Input />
    </main>
  );
}
export default Main;
