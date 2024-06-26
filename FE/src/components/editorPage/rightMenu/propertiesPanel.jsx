import { useContext } from "react";
import { editorContext } from "../../pages/editor";
import EditListGroup from "./editListGroup";
import { useEditor } from "@craftjs/core";
function PropertiesEditPanel() {
  const {} = useEditor();
  const context = useContext(editorContext);
  function handleChange(element, value) {
    element.setter(value);
    const tempData = [...context.selectedItem];
    tempData.forEach((item) => {
      if (item.text === element.text) {
        element.setter(value);
        element.value = value;
      }
    });
    context.setSelectedItem(tempData);
  }
  function prepareEditList(selectedItem, title) {
    const editlistTemp = [];
    selectedItem.forEach((element) => {
      if (element.child)
        editlistTemp.push(prepareEditList(element.child), element.text);
      else
        editlistTemp.push(
          <div key={element.text} className="w-fit mb-2">
            <div className="w-32 inline-block">{element.text}</div>
            <input
              className="h-6 w-32 rounded border border-stone-300"
              value={element.value}
              onChange={(event) => {
                handleChange(element, event.target.value);
              }}
            ></input>
          </div>
        );
    });
    if (title)
      return <EditListGroup title={title}>{editlistTemp}</EditListGroup>;
    else return editlistTemp;
  }
  let editList = null;
  if (context.selectedItem) {
    editList = prepareEditList(context.selectedItem, "text");
  } else editList = <span className="m-2">no item selected</span>;
  return (
    <div className="h-full w-fit min-w-64 bg-stone-100 border-l border-stone-300">
      {editList}
      <input type="color"></input>
    </div>
  );
}
export default PropertiesEditPanel;
