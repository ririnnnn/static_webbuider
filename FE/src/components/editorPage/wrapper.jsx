import { useEditor, useNode } from "@craftjs/core";
import { useContext, useEffect, useState } from "react";
import { editorContext } from "../../pages/editor";
import { editorCfg } from "./editorCfg";

function Wrapper({ Element_, className, cfg, children, ...props }) {
  const check = /(flex|grid|top|inline|block|float|w-\d\/\d)/;
  const context = useContext(editorContext);
  const node = useNode((node) => ({
    events: node.events,
    data: node.data,
  }));
  const editor = useEditor();
  const [SCString, setSCString] = useState(
    classes2String(className.split(" ").filter((item) => check.test(item)))
  );
  const [nonSCString, setNonSCString] = useState(
    classes2String(className.split(" ").filter((item) => !check.test(item)))
  );
  useEffect(() => {
    if (className) {
      setSCString(
        classes2String(className.split(" ").filter((item) => check.test(item)))
      );
      setNonSCString(
        classes2String(className.split(" ").filter((item) => !check.test(item)))
      );
    }
  }, [className]);
  function classes2String(arr) {
    let str = "";
    arr.forEach((item) => {
      str += item + " ";
    });
    return str;
  }
  return (
    <div
      className={
        (node.events.selected ? "border-2 border-stone-900 " : "") + SCString
      }
      ref={(ref) => {
        node.connectors.connect(ref);
      }}
    >
      <div
        className={
          "h-7 w-fit absolute translate-y-[-100%] bg-blue-700 flex " +
          (!node.events.selected && "invisible")
        }
      >
        <div
          className="h-7 w-7 justify-center items-center flex hover:bg-blue-300 "
          ref={(ref) => {
            node.connectors.drag(ref);
          }}
        >
          <i className="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center hover:bg-blue-300"
          onClick={() => {
            editor.actions.selectNode(node.data.parent);
          }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center hover:bg-blue-300"
          onClick={() => {
            context.setSelectedNode(node.id);
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center hover:bg-blue-300 "
          onClick={() => {
            editor.actions.delete(node.id);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <Element_ {...props} className={nonSCString}>
        {children}
      </Element_>
    </div>
  );
}
export default Wrapper;
