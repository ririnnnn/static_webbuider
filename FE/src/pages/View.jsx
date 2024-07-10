import { Frame, useEditor, Editor } from "@craftjs/core";
import * as editable from "../components/editables";
import Wrapper from "../components/editorPage/wrapper";
function View_() {
  const { actions } = useEditor();
  actions.deserialize(
    '{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{},"displayName":"Container","custom":{},"hidden":false,"nodes":["VmKJrYB5Er","glfJzj0dqO"],"linkedNodes":{}},"VmKJrYB5Er":{"type":{"resolvedName":"Wrapper"},"isCanvas":true,"props":{"componentName":"div","className":"w-full h-screen bg-blue-600 ","cfg":"div"},"displayName":"Wrapper","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"glfJzj0dqO":{"type":{"resolvedName":"Wrapper"},"isCanvas":true,"props":{"componentName":"div","className":"w-full bg-gray-100 h-screen bg-orange-500 ","cfg":"div"},"displayName":"Wrapper","custom":{},"parent":"ROOT","hidden":false,"nodes":["gJe723Idbg"],"linkedNodes":{}},"gJe723Idbg":{"type":{"resolvedName":"Wrapper"},"isCanvas":true,"props":{"componentName":"div","className":"min-h-60 bg-gray-100 w-1/2 ","cfg":"div"},"displayName":"Wrapper","custom":{},"parent":"glfJzj0dqO","hidden":false,"nodes":[],"linkedNodes":{}}}'
  );
}
function View() {
  return (
    <Editor resolver={{ ...editable, Wrapper, View_ }} enabled={false}>
      <Frame>
        <View_></View_>
      </Frame>
    </Editor>
  );
}
export default View;
