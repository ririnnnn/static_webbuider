import { useEditor } from "@craftjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { editorContext } from "../../pages/editor";
import { sendRequest } from "../../apiHandler";

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
  const context = useContext(editorContext);
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  async function SavePage(data) {
    const tempPageData = JSON.parse(JSON.stringify(props.page));
    const test = await sendRequest("Pages/SaveChange", "PUT", data, {
      Id: tempPageData.id,
    });
  }
  return (
    <div className="h-8 bg-stone-600 inline-block text-white text-center">
      <span>{props.text}</span>
      <div className="w-fit float-end items-center h-full justify-center flex">
        <IconButton
          icon={"fa-regular fa-eye"}
          text="View page"
          onClick={() => {
            actions.deserialize(
              '{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{},"displayName":"Container","custom":{},"hidden":false,"nodes":["EOLBihGe7c","erm1UtCJ6A"],"linkedNodes":{}},"erm1UtCJ6A":{"type":{"resolvedName":"Wrapper"},"isCanvas":true,"props":{"componentName":"div","className":"w-full min-h-60 bg-gray-100","cfg":"div"},"displayName":"Wrapper","custom":{},"parent":"ROOT","hidden":false,"nodes":["US7O8_kY4n"],"linkedNodes":{}},"US7O8_kY4n":{"type":{"resolvedName":"Wrapper"},"isCanvas":false,"props":{"componentName":"button","text":"button","cfg":"button","className":"w-fit inline-block py-1 px-2 bg-green-300 hover:bg-green-200 rounded"},"displayName":"Wrapper","custom":{},"parent":"erm1UtCJ6A","hidden":false,"nodes":[],"linkedNodes":{}},"EOLBihGe7c":{"type":{"resolvedName":"Wrapper"},"isCanvas":true,"props":{"componentName":"div","className":"w-full min-h-60 bg-gray-100","cfg":"div"},"displayName":"Wrapper","custom":{},"parent":"ROOT","hidden":false,"nodes":["xJZw8RXcNT","lDrOU2goh7","TH8LBttufx"],"linkedNodes":{}},"xJZw8RXcNT":{"type":{"resolvedName":"Wrapper"},"isCanvas":false,"props":{"componentName":"button","text":"button","cfg":"button","className":"w-fit inline-block py-1 px-2 bg-green-300 hover:bg-green-200 rounded"},"displayName":"Wrapper","custom":{},"parent":"EOLBihGe7c","hidden":false,"nodes":[],"linkedNodes":{}},"lDrOU2goh7":{"type":{"resolvedName":"Wrapper"},"isCanvas":false,"props":{"componentName":"button","text":"button","cfg":"button","className":"w-fit inline-block py-1 px-2 bg-green-300 hover:bg-green-200 rounded"},"displayName":"Wrapper","custom":{},"parent":"EOLBihGe7c","hidden":false,"nodes":[],"linkedNodes":{}},"TH8LBttufx":{"type":{"resolvedName":"Wrapper"},"isCanvas":false,"props":{"componentName":"button","text":"button","cfg":"button","className":"w-fit inline-block py-1 px-2 bg-green-300 hover:bg-green-200 rounded"},"displayName":"Wrapper","custom":{},"parent":"EOLBihGe7c","hidden":false,"nodes":[],"linkedNodes":{}}}'
            );
          }}
        />
        <IconButton icon={"fa-solid fa-print"} text="export to pdf" />
        <IconButton
          icon={"fa-solid fa-download"}
          text="download"
          onClick={() => {
            props.saveHTML(props.htmlRef, "test");
          }}
        />
        <IconButton
          icon={"fa-regular fa-floppy-disk"}
          text="Save"
          onClick={() => {
            SavePage(query.serialize());
          }}
        />
      </div>
    </div>
  );
}
export default EditorTopBar;
