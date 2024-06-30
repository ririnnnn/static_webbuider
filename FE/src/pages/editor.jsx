import EditorCanvas from "../components/editorPage/canvas";
import EditorSideBar from "../components/editorPage/sideBar";
import EditorTopBar from "../components/editorPage/topBar";

import { Editor, Frame, Element } from "@craftjs/core";
import { Fragment, createContext, useEffect, useState } from "react";
import RightSideMenu from "../components/editorPage/rightSideMenu";

import * as editable from "../components/editables";
import Wrapper from "../components/editorPage/wrapper";

export const editorContext = createContext();

function EditorPages() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextValue, setContextValue] = useState({
    selectedNode: selectedNode,
    setSelectedNode: setSelectedNode,
    isEditing: true,
    nodeChange: false,
  });
  useEffect(() => {
    setContextValue({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      isEditing: true,
    });
  }, [selectedNode]);
  function detectNodeChange() {
    setContextValue({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      isEditing: true,
    });
  }
  return (
    <editorContext.Provider value={contextValue}>
      <Editor
        resolver={{ ...editable, Wrapper }}
        onNodesChange={() => {
          detectNodeChange();
        }}
      >
        <div className="h-screen flex flex-col w-screen font-sans text-base">
          <EditorTopBar text="test Editor Top bar"></EditorTopBar>
          <div className="flex-1 flex" style={{ height: "calc(100vh - 32px)" }}>
            <EditorSideBar></EditorSideBar>
            <EditorCanvas></EditorCanvas>
            <RightSideMenu></RightSideMenu>
          </div>
        </div>
      </Editor>
    </editorContext.Provider>
  );
}
export default EditorPages;
