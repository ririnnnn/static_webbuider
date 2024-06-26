import { Frame } from "@craftjs/core";
import * as editable from "../components/editables";
function View() {
  return (
    <Editor resolver={{ ...editable }}>
      <Frame></Frame>
    </Editor>
  );
}
export default View;
