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
function PagesPanel(props) {
  function renderNode(data) {}
  return (
    <div className="h-full w-60 bg-stone-100 border-l border-stone-300 px-1 overflow-y-auto text-xs">
      {displayList}
    </div>
  );
}
export default PagesPanel;
