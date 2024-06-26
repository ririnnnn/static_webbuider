import EditorCanvas from "../components/editorPage/canvas";
import EditorSideBar from "../components/editorPage/sideBar";
import EditorTopBar from "../components/editorPage/topBar";

import { Editor, Frame, Element } from "@craftjs/core";
import { Fragment, createContext, useEffect, useState } from "react";
import RightSideMenu from "../components/editorPage/rightSideMenu";

import * as editable from "../components/editables";
import SelectedWrapper from "../components/editorPage/selectedWrapper";
import Wrapper from "../components/editorPage/wrapper";

export const editorContext = createContext();

function EditorPages() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [contextValue, setContextValue] = useState({
    selectedNode: selectedNode,
    setSelectedNode: setSelectedNode,
    isEditing: true,
  });
  useEffect(() => {
    setContextValue({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      isEditing: true,
    });
  }, [selectedNode]);
  return (
    <editorContext.Provider value={contextValue}>
      <Editor resolver={{ ...editable, Wrapper }}>
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
