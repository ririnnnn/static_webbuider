import { useState } from "react";

function EditListGroup(props) {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <div className="">
      <div
        className="w-full h-6 flex items-center"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="h-6 w-6 hover:bg-stone-300 items-center justify-center flex">
          {isOpen ? (
            <i className="fa-solid fa-caret-down"></i>
          ) : (
            <i className="fa-solid fa-caret-right"></i>
          )}
        </div>
        <span>{props.title}</span>
      </div>
      {isOpen ? <div className="m-1 w-fit">{props.children}</div> : ""}
    </div>
  );
}
export default EditListGroup;
