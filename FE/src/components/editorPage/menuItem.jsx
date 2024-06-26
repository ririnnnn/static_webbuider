import { useEditor } from "@craftjs/core";
function EditorMenuItem(props) {
  const { connectors, query } = useEditor();
  return (
    <li
      ref={(ref) => connectors.create(ref, props.component)}
      className="hover:bg-brown-300 h-8 flex items-center space-x-2 mb-1 rounded"
    >
      <div className="w-8 h-8 flex justify-center items-center">
        <i className={props.icon + " h-fit"}></i>
      </div>
      <span>{props.text}</span>
    </li>
  );
}
export default EditorMenuItem;
