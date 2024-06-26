import { useContext, useEffect, useReducer, useState } from "react";
import { editorContext } from "../../pages/editor";
import EditListGroup from "./editListGroup";
import { useEditor } from "@craftjs/core";
import CustomInput, { ClassInput } from "./customInput";
import { editorCfg } from "./editorCfg";
function EditorEditPanel() {
  const context = useContext(editorContext);
  const [editList, setEditList] = useState();
  const {
    query: { node },
    actions: { setProp },
    events,
  } = useEditor((editor) => ({ events: editor.events }));
  useEffect(() => {
    const nodeId = events.selected.values().next().value;
    if (nodeId && nodeId !== "ROOT") {
      const nodeProps = node(nodeId).get().data.props;
      const nodeEdiable = editorCfg[node(nodeId).get().data.props.cfg];
      setEditList(prepareEditList(nodeEdiable, nodeProps));
    } else setEditList(<span className="m-2">no item selected</span>);
  }, [events.selected.values().next().value]);
  function prepareEditList(nodeEdiable, nodeProps, title) {
    const keys = Object.keys(nodeEdiable);
    const editlistTemp = keys.map((key) => {
      if (typeof nodeEdiable[key] !== "object")
        return (
          <div key={key}>
            <label>{key}</label>
            <CustomInput
              type={nodeEdiable[key]}
              value={nodeProps[key]}
              handleChange={(value) => {
                setProp(context.selectedNode, (props) => {
                  props[key] = value;
                });
              }}
            ></CustomInput>
          </div>
        );
      else return prepareEditList(nodeEdiable[key], nodeProps, key);
    });
    if (title)
      return <EditListGroup title={title}>{editlistTemp}</EditListGroup>;
    else return editlistTemp;
  }
  return (
    <div className="h-full w-60 bg-stone-100 border-l border-stone-300 px-1">
      {editList}
    </div>
  );
}
export default EditorEditPanel;
