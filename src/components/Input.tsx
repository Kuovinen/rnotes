import "./Input.css";
function Input() {
  return (
    <form className="Noteinput">
      <input className="Notetext" type="text" />
      <button type="submit" className="makeNoteBtn">
        MAKE NOTE
      </button>
    </form>
  );
}
export default Input;
