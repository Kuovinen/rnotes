import "./Main.css";
import Notes from "./Notes";
import Input from "./Input";
import Note from "../features/notes/Note";
function Main() {
  return (
    <main className="main">
      <Notes />
      <Note />
      <Input />
    </main>
  );
}
export default Main;
