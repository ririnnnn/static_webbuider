import { Editor, Frame, Element, useEditor } from "@craftjs/core";

import Viewport from "./viewport";
import React, { useEffect, useState, useRef } from "react";

import { Container } from "../editables";

const EditorCanvas = React.forwardRef(({ props, children, page }, ref) => {
  const editor = useEditor();
  // viewport information
  const [viewportHeight, setViewportHeight] = useState(1080);
  const [viewportWidth, setViewportWidth] = useState(1920);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1.0);
  // handle interraction
  //   handle move viewport
  const [isDragging, setIsDragging] = useState(false);
  function handleMouseDown(e) {
    if (e.button == 2) setIsDragging(true);
  }
  function handleMouseUp(e) {
    if (e.button == 2) setIsDragging(false);
  }
  function handleMouseMove(e) {
    if (isDragging) {
      const newXOffset = offset.x + e.movementX;
      const newYOffset = offset.y + e.movementY;
      setOffset({ x: newXOffset, y: newYOffset });
    }
  }
  // handle change scale
  function handleMouseScroll(e) {
    let newScale = scale - e.deltaY * 0.0002;
    if (newScale < 0.05) newScale = 0.05;
    else if (newScale > 10.0) newScale = 10.0;
    setScale(newScale);
  }
  useEffect(() => {
    if (page.pageData) editor.actions.deserialize(page.pageData);
    else
      editor.actions.deserialize(
        '{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{},"displayName":"Container","custom":{},"hidden":false,"nodes":[],"linkedNodes":{}}}'
      );
  }, [page]);
  return (
    <div
      className="flex-1 overflow-hidden h-full"
      onMouseDown={(e) => {
        handleMouseDown(e);
      }}
      onMouseUp={(e) => {
        handleMouseUp(e);
      }}
      onMouseMove={(e) => {
        handleMouseMove(e);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onWheel={(e) => {
        handleMouseScroll(e);
      }}
    >
      <Viewport
        width={viewportWidth + "px"}
        height={"fit-content"}
        x_offset={offset.x}
        y_offset={offset.y}
        scale={scale}
      >
        <div ref={ref}>
          <Frame>
            <Element is={Container} canvas></Element>
          </Frame>
        </div>
      </Viewport>
    </div>
  );
});
export default EditorCanvas;
