import { useEditor } from "@craftjs/core";
import { useContext, useEffect, useState } from "react";
import { editorContext } from "../../pages/editor";
function NodeDisplay(props) {
  const [isOpened, setIsOpened] = useState(true);
  const name = props.node.data.props.cfg;
  return (
    <div>
      <div className="py-[2px] px-2 rounded bg-stone-200 border border-stone-300 w-fit">
        {name ? name : "ROOT"}
      </div>
      <div className="pl-2">{props.children}</div>
    </div>
  );
}
function NodeTreePanel(props) {
  const {
    query: { node },
  } = useEditor();
  const nodeTree = node("ROOT").toNodeTree();
  function processNodeTree(nodeTree, nodeId) {
    const node = nodeTree.nodes[nodeId];
    let child = [];
    const returnValue = [];
    if (node.data.nodes.length >= 0) {
      child = node.data.nodes.map((item) => processNodeTree(nodeTree, item));
      returnValue.push(
        <NodeDisplay node={node} key={nodeId}>
          {child}
        </NodeDisplay>
      );
      return returnValue;
    } else
      returnValue.push(<NodeDisplay node={node} key={nodeId}></NodeDisplay>);
    return returnValue;
  }
  const [displayList, setDisplayList] = useState(
    processNodeTree(nodeTree, "ROOT")
  );

  const context = useContext(editorContext);
  useEffect(() => {
    setDisplayList(processNodeTree(nodeTree, "ROOT"));
  }, [context]);
  return (
    <div className="h-full w-60 bg-stone-100 border-l border-stone-300 px-1 overflow-y-auto text-xs">
      {displayList}
    </div>
  );
}
export default NodeTreePanel;
