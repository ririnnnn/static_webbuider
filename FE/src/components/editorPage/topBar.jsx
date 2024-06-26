import { useEditor } from "@craftjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="w-8 h-8 hover:bg-stone-400"
      title={props.text}
    >
      <i className={props.icon}></i>
    </button>
  );
}
function EditorTopBar(props) {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <div className="h-8 bg-stone-600 inline-block text-white text-center">
      <span>{props.text}</span>
      <div className="w-fit float-end items-center h-full justify-center flex">
        <IconButton icon={"fa-regular fa-eye"} text="View page" />
        <IconButton icon={"fa-solid fa-print"} text="export to pdf" />
        <IconButton icon={"fa-solid fa-download"} text="download" />
        <IconButton icon={"fa-regular fa-floppy-disk"} text="Save" />
      </div>
    </div>
  );
}
export default EditorTopBar;
