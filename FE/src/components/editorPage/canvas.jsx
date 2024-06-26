import { Editor, Frame, Element } from "@craftjs/core";

import Viewport from "./viewport";
import { useState } from "react";

import { Container } from "../editables";

function EditorCanvas({ props, children }) {
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
        <Frame>
          <Element is={Container} canvas></Element>
        </Frame>
      </Viewport>
    </div>
  );
}
export default EditorCanvas;
