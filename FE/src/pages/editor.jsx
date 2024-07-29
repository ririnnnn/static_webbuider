import EditorCanvas from "../components/editorPage/canvas";
import EditorSideBar from "../components/editorPage/sideBar";
import EditorTopBar from "../components/editorPage/topBar";

import { Editor, Frame, Element } from "@craftjs/core";
import { Fragment, createContext, useEffect, useRef, useState } from "react";
import RightSideMenu from "../components/editorPage/rightSideMenu";

import * as editable from "../components/editables";
import Wrapper from "../components/editorPage/wrapper";
import { json, useLocation } from "react-router-dom";
import { sendRequest } from "../apiHandler";
import { decodeData } from "../common";
import CustomInput from "../components/editorPage/customInput";

export const editorContext = createContext();

function EditorPages() {
  const location = useLocation();
  const [siteId, setSiteId] = useState(location.state.siteId);
  const [pageId, setPageId] = useState("");
  const [site, setSite] = useState({});
  const [pages, setPages] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [htmlRef, setHtmlRef] = useState(null);
  const ref = useRef(null);
  const [contextValue, setContextValue] = useState({
    selectedNode: selectedNode,
    setSelectedNode: setSelectedNode,
    isEditing: true,
    nodeChange: false,
  });
  useEffect(() => {
    setContextValue({
      ...contextValue,
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      isEditing: true,
    });
  }, [selectedNode]);
  function detectNodeChange() {
    setContextValue({
      ...contextValue,
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      isEditing: true,
    });
  }
  async function loadSite() {
    const response = await sendRequest("Sites/id/" + siteId, "GET");
    const siteData = await response.json();
    siteData.siteData = JSON.parse(decodeData(siteData.siteData));
    setSite(siteData);
  }
  async function loadPage() {
    const response = await sendRequest("Pages/" + pageId, "GET");
    const data = await response.json();
    data.pageData = data.pageData
      ? JSON.parse(decodeData(data.pageData))
      : null;
    setPage(JSON.parse(JSON.stringify(data)));
  }
  function UpdateContext() {
    setContextValue({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      isEditing: true,
      nodeChange: false,
    });
  }
  function saveHTML(ref, name) {
    const htmlContent = ref.current.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name + ".html";
    a.click();
  }
  useEffect(() => {
    loadSite();
  }, []);
  useEffect(() => {
    async function run() {
      await loadSite();
    }
    run();
  }, [siteId]);
  useEffect(() => {
    if (site.siteData) setPageId(site.siteData.path.index.page);
    UpdateContext();
  }, [site]);
  useEffect(() => {
    async function run() {
      await loadPage();
    }
    if (pageId) run();
  }, [pageId]);
  useEffect(() => {
    UpdateContext();
  }, [page]);
  useEffect(() => {
    if (ref.current) setHtmlRef(ref);
  }, [ref.current]);
  return (
    <editorContext.Provider value={contextValue}>
      <Editor
        resolver={{ ...editable, Wrapper }}
        onNodesChange={() => {
          detectNodeChange();
        }}
      >
        <div className="h-screen flex flex-col w-screen font-sans text-base">
          <EditorTopBar
            text="test Editor Top bar"
            page={page}
            saveHTML={saveHTML}
            htmlRef={htmlRef}
          ></EditorTopBar>
          <div className="flex-1 flex" style={{ height: "calc(100vh - 32px)" }}>
            <EditorSideBar />
            <EditorCanvas page={page} site={site} ref={ref} />
            <RightSideMenu site={site} loadSite={loadSite} />
          </div>
        </div>
      </Editor>
    </editorContext.Provider>
  );
}
export default EditorPages;
