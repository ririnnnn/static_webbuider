import { useContext, useEffect, useState } from "react";
import EditorEditPanel from "./editPanel";
import { editorContext } from "../../pages/editor";
import NodeTreePanel from "./nodeTreePanel";
import PagesPanel from "./pagesPanel";

function RightSideMenu(props) {
  const [activated, setActivated] = useState("");
  const context = useContext(editorContext);
  function handleMenuClick(e) {
    if (e.target.value === activated) setActivated("");
    else setActivated(e.target.value);
  }
  const menuList = {
    Properties: <EditorEditPanel></EditorEditPanel>,
    NodeTree: <NodeTreePanel></NodeTreePanel>,
    Pages: (
      <PagesPanel
        data={props.site.siteData ? props.site.siteData.path : null}
        site={props.site}
        loadSite={props.loadSite}
        setPageId={props.setPageId}
      ></PagesPanel>
    ),
    "": <></>,
  };
  useEffect(() => {
    if (context.selectedNode) setActivated("Properties");
  }, [context.selectedNode]);
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
        {activated === "NodeTree" ? (
          <button
            className="[writing-mode:vertical-lr] w-full text-sm py-2 bg-stone-100"
            value={"NodeTree"}
            onClick={(e) => {
              handleMenuClick(e);
            }}
          >
            Node tree
          </button>
        ) : (
          <button
            className="[writing-mode:vertical-lr] w-full text-sm py-2 hover:bg-stone-100"
            value={"NodeTree"}
            onClick={(e) => {
              handleMenuClick(e);
            }}
          >
            Node tree
          </button>
        )}
        {activated === "Pages" ? (
          <button
            className="[writing-mode:vertical-lr] w-full text-sm py-2 bg-stone-100"
            value={"Pages"}
            onClick={(e) => {
              handleMenuClick(e);
            }}
          >
            Pages
          </button>
        ) : (
          <button
            className="[writing-mode:vertical-lr] w-full text-sm py-2 hover:bg-stone-100"
            value={"Pages"}
            onClick={(e) => {
              handleMenuClick(e);
            }}
          >
            Pages
          </button>
        )}
      </div>
    </div>
  );
}
export default RightSideMenu;
