import EditorCanvas from "../components/editorPage/canvas";
import EditorSideBar from "../components/editorPage/sideBar";
import EditorTopBar from "../components/editorPage/topBar";

import Text from "../components/editables/text";
import Section from "../components/editables/section";
import EditorEditPanel from "../components/editorPage/editPanel";

import { Editor, Frame, Element } from "@craftjs/core";
import { createContext, useState } from "react";

export const editorContext = createContext();

function EditorPages() {
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <editorContext.Provider
      value={{ selectedItem: selectedItem, setSelectedItem: setSelectedItem }}
    >
      <Editor resolver={{ Text, Section }}>
        <div className="h-screen flex flex-col">
          <EditorTopBar text="test Editor Top bar"></EditorTopBar>
          <div className="flex-1 flex">
            <EditorSideBar></EditorSideBar>
            <EditorCanvas></EditorCanvas>
            <EditorEditPanel></EditorEditPanel>
          </div>
        </div>
      </Editor>
    </editorContext.Provider>
  );
}
export default EditorPages;
