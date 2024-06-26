import { useEditor, useNode } from "@craftjs/core";
import { editorContext } from "../../pages/editor";
import { useContext } from "react";

function SelectedWrapper(props) {
  const context = useContext(editorContext);
  const {
    actions,
    query: { node },
  } = useEditor();
  return (
    <div>
      <div
        className="h-7 w-fit absolute translate-y-[-100%] bg-blue-700 flex"
        ref={(ref) => {
          props.connect(ref);
        }}
      >
        <div
          className="h-7 w-7 justify-center items-center flex hover:bg-blue-300 "
          ref={(ref) => {
            props.drag(ref);
          }}
        >
          <i className="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center hover:bg-blue-300"
          onClick={() => {
            actions.selectNode(props.parent);
          }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center hover:bg-blue-300"
          onClick={() => {
            context.setSelectedNode(props.id);
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center hover:bg-blue-300"
          onClick={() => {
            actions.delete(props.id);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      {props.children}
    </div>
  );
}
export default SelectedWrapper;
