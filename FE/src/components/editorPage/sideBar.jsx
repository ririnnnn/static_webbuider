import EditorMenuItem from "./menuItem";
import { Element } from "@craftjs/core";

import * as ediable from "../editables";
import Wrapper from "./wrapper";

function EditorSideBar() {
  return (
    <div className="w-48 h-full bg-stone-100 border-r border-stone-200">
      <ul className="p-1">
        <EditorMenuItem
          text={"div"}
          component={
            <Element
              componentName={"div"}
              is={Wrapper}
              className="w-full min-h-60 bg-gray-100"
              cfg="div"
              canvas
            ></Element>
          }
          icon="fa-solid fa-font"
        ></EditorMenuItem>
        <EditorMenuItem
          text={"button"}
          component={
            <Wrapper
              componentName={"button"}
              text="button"
              cfg="button"
              className="w-fit inline-block py-1 px-2 bg-green-300 hover:bg-green-200 rounded"
            ></Wrapper>
          }
          icon="fa-solid fa-font"
        ></EditorMenuItem>
      </ul>
    </div>
  );
}
export default EditorSideBar;
