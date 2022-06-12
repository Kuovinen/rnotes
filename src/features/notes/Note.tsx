import { useSelector, useDispatch } from "react-redux";
import { change, schange } from "./notesSlice";
import { IRootState } from "../../store/store";

function Note() {
  const note = useSelector((state: IRootState) => state.notes.value);
  const dispatch = useDispatch();
  function test() {
    console.log("+");
    dispatch(change());
  }

  return (
    <div>
      <p>{note}</p>
      <button onClick={() => test()}>+</button>
      <button onClick={() => dispatch(schange())}>-</button>
    </div>
  );
}
export default Note;
