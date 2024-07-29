import { useEffect, useState } from "react";
import { sendRequest } from "../../apiHandler";
import { Modal } from "antd";

function NodeDisplay(props) {
  const [isOpened, setIsOpened] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <div
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        className="flex items-center"
      >
        <div className="py-[2px] px-2 rounded bg-stone-200 border border-stone-300 w-fit inline-block">
          {props.name}
        </div>
        {isHovered ? (
          <div className="flex w-fit">
            <div className="w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-200">
              <i className="fa-regular fa-pen-to-square"></i>
            </div>
            <div
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-200"
              onClick={() => {
                props.onAdd(props.path);
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="pl-2">{props.children}</div>
    </div>
  );
}
function PagesPanel(props) {
  const [nodeTree, setNodeTree] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const [addPath, setAddPath] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePath, setDeletePath] = useState("");
  // add page form state;
  const [path, setPath] = useState("");
  const [pageName, setPageName] = useState("");
  function renderNode(data, parentPath) {
    return Object.keys(data).map((path) => {
      if (Object.keys(data[path].children).length > 0)
        return (
          <NodeDisplay
            keys={data[path].page}
            name={path}
            path={parentPath + path + "/"}
            onAdd={async (path) => {
              setAddPath(path);
              setShowAddModal(true);
            }}
          >
            {renderNode(data[path].children, parentPath + path + "/")}
          </NodeDisplay>
        );
      else
        return (
          <NodeDisplay
            keys={data[path].page}
            name={path}
            path={parentPath + path + "/"}
            onAdd={async (path) => {
              setAddPath(path);
              setShowAddModal(true);
            }}
          />
        );
    });
  }
  useEffect(() => {
    if (props.data) setNodeTree(renderNode(props.data, ""));
    console.log(props.data);
  }, [props.data]);
  async function addPage(addPath) {
    const response = await sendRequest("Sites/addPage", "POST", {
      Id: props.site.id,
      ParentPath: addPath,
      Path: path,
      Name: pageName,
    });
    if (response.ok) props.loadSite();
  }
  return (
    <div className="h-full w-60 bg-stone-100 border-l border-stone-300 px-1 overflow-y-auto text-xs">
      {nodeTree}
      <Modal
        open={showAddModal}
        onCancel={() => {
          setShowAddModal(false);
        }}
        footer={
          <>
            <button
              className="px-2 py-1 bg-gray-200 rounded shadow"
              onClick={() => {
                setShowAddModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-green-300 rounded shadow mx-2"
              onClick={async () => {
                await addPage(addPath);
                setShowAddModal(false);
              }}
            >
              Create
            </button>
          </>
        }
      >
        <label>Path</label>
        <input
          value={path}
          onChange={(e) => {
            setPath(e.target.value);
          }}
        ></input>
        <label>Name</label>
        <input
          value={pageName}
          onChange={(e) => {
            setPageName(e.target.value);
          }}
        ></input>
      </Modal>
    </div>
  );
}
export default PagesPanel;
