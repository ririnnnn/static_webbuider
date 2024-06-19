import EditorMenuItem from "./menuItem";
import Text from "../editables/text";

function EditorSideBar() {
  return (
    <div className="w-48 h-full bg-stone-100">
      <ul className="p-1">
        <EditorMenuItem
          text="Text"
          component={<Text text="new!!!"></Text>}
        ></EditorMenuItem>
        <EditorMenuItem text="item 2"></EditorMenuItem>
        <EditorMenuItem text="item 3"></EditorMenuItem>
        <EditorMenuItem text="item 4"></EditorMenuItem>
      </ul>
    </div>
  );
}
export default EditorSideBar;
