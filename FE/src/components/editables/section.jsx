import { useNode, Element } from "@craftjs/core";
import Text from "./text";
function PageSection({ children }) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref) => connect(drag(ref))}
      className="w-full min-h-20 h-fit hover: border-gray-800"
    >
      {children}
    </div>
  );
}
export default PageSection;
PageSection.craft = {
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
};
