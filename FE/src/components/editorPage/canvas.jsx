import { Editor, Frame, Element } from "@craftjs/core";

import Text from "../editables/text";
import PageSection from "../editables/section";

function EditorCanvas({ props, children }) {
  return (
    <div className="flex-1">
      <Frame>
        <Element is="div" canvas>
          <Text text="text1"></Text>
          <Text text="text2"></Text>
          <Text text="text3"></Text>
          <Element is={PageSection} canvas>
            <Text text="aaa"></Text>
            <Text text="bbb"></Text>
          </Element>
        </Element>
      </Frame>
    </div>
  );
}
export default EditorCanvas;
