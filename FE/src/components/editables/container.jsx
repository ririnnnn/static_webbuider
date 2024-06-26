import { useNode } from "@craftjs/core";

export function Container(props) {
  const {
    connectors: { connect },
  } = useNode();
  return <div ref={connect} {...props} className="min-h-10 w-full h-fit"></div>;
}
