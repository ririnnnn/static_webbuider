import { Editor, Frame, useEditor } from "@craftjs/core";
import PageSection from "../components/editables/section";
import Text from "../components/editables/text";
function TestPage() {
  return (
    <Editor resolver={(Text, PageSection)}>
      <Frame></Frame>
    </Editor>
  );
}
export default TestPage;
