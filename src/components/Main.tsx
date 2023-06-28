import "./Main.css";
import Notes from "./Main/Notes";
import Input from "./Main/Input";
interface ref {
  current: string;
}

interface mainProps {
  url: string;
  notes: { _id: string; payload: string }[];
  currentTab: ref;
  setNotes: React.Dispatch<
    React.SetStateAction<{ _id: string; payload: string }[]>
  >;
}
function Main(props: mainProps) {
  console.log("render -------MAIN");
  return (
    <main className="main">
      {/*List of notes inside currently selected category*/}
      <Notes
        url={props.url}
        notes={props.notes}
        currentTab={props.currentTab}
        setNotes={props.setNotes}
      />
      {/*INput and button for adding another note*/}
      <Input
        url={props.url}
        currentTab={props.currentTab}
        setNotes={props.setNotes}
      />
    </main>
  );
}
export default Main;
