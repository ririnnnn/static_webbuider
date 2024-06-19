import { useContext } from "react";
import { editorContext } from "../../pages/editor";
function EditorEditPanel() {
  const context = useContext(editorContext);
  const editList = [];
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
  if (context.selectedItem) {
    context.selectedItem.forEach((element) => {
      editList.push(
        <div key={element.text} className="w-fit">
          <input
            className="h-10"
            value={element.value}
            onChange={(event) => {
              handleChange(element, event.target.value);
            }}
          ></input>
        </div>
      );
    });
  }
  return <div className="h-full w-fit bg-stone-100">{editList}</div>;
}
export default EditorEditPanel;
