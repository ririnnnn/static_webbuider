import { useState } from "react";
import EditorEditPanel from "./propertiesPanel";

function RightSideMenu() {
  const [activated, setActivated] = useState("");
  function handleMenuClick(e) {
    if (e.target.value === activated) setActivated("");
    else setActivated(e.target.value);
  }
  const menuList = {
    Properties: <EditorEditPanel></EditorEditPanel>,
    "": <></>,
  };
  return (
    <div className="w-fit h-full flex flex-row">
      {menuList[activated]}
      <div className="w-6 h-full bg-stone-300">
        {activated === "Properties" ? (
          <button
            className="[writing-mode:vertical-lr] w-full text-sm py-2 bg-stone-100"
            value={"Properties"}
            onClick={(e) => {
              handleMenuClick(e);
            }}
          >
            Properties
          </button>
        ) : (
          <button
            className="[writing-mode:vertical-lr] w-full text-sm py-2 hover:bg-stone-100"
            value={"Properties"}
            onClick={(e) => {
              handleMenuClick(e);
            }}
          >
            Properties
          </button>
        )}
      </div>
    </div>
  );
}
export default RightSideMenu;
