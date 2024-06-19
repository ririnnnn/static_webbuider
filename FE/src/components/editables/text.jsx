import { useNode } from "@craftjs/core";
import { useContext, useEffect, useState } from "react";
import { editorContext } from "../../pages/editor";
function Text(props) {
  const context = useContext(editorContext);
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));
  const editData = [
    {
      text: "text",
      value: props.text,
      setter: (value) => {
        setProp(
          (props) => (props.text = value.replace(/<\/?[^>]+(>|$)/g, "")),
          500
        );
      },
    },
    {
      text: "text color",
      value: props.textColor,
      setter: (value) => {
        setProp((props) => (props.textColor = value), 500);
      },
    },
  ];
  useEffect(() => {
    if (props.text == null) setProp((props) => (props.text = "Text"), 500);
    if (props.textColor == null)
      setProp((props) => (props.textColor = "#000000"), 500);
  }, []);

  return (
    <p
      ref={(ref) => connect(drag(ref))}
      className="w-fit"
      onClick={() => {
        context.setSelectedItem(editData);
      }}
      style={{ color: props.textColor }}
    >
      {props.text}
    </p>
  );
}
Text.craft = {
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
};
export default Text;
