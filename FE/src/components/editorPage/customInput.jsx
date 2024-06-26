import { useEffect, useState } from "react";
import { TailwindClasses } from "./tailwindClasses";

function TextInput(props) {
  const [stateValue, setStateValue] = useState(props.value);
  return (
    <input
      className="h-7 w-full rounded border border-stone-300"
      value={stateValue}
      onChange={(event) => {
        props.handleChange(event.target.value);
        setStateValue(event.target.value);
      }}
    ></input>
  );
}
function NumberInput(props) {
  return (
    <input
      className="h-6 w-32 rounded border border-stone-300"
      value={props.value}
      onChange={(event) => {
        props.handleChange(event);
      }}
      type="number"
    ></input>
  );
}
function ColorInput(props) {
  return (
    <input
      className="h-6 w-6 rounded border border-stone-300"
      value={props.value}
      onChange={(event) => {
        props.handleChange(event);
      }}
      type="color"
    ></input>
  );
}
export function ClassInput(props) {
  const [classes, setClasses] = useState(props.value.split(" "));
  const [searchString, setSearchString] = useState("");
  const [tailwindClasses, setTailwindClasses] = useState(TailwindClasses());
  useEffect(() => {
    setClasses(props.value.split(" "));
  }, [props.value]);
  function toString(arr) {
    let strValue = "";
    for (let i = 0; i < arr.length; i++) {
      strValue += arr[i] + " ";
    }
    return strValue;
  }
  function handleUpdate(arr) {
    props.handleChange(toString(arr));
  }
  function remove(value) {
    const tempClass = classes.filter((item) => item !== value);
    setClasses(tempClass);
    handleUpdate(tempClass);
  }
  function add(value) {
    const tempClass = [...classes];
    tempClass.push(value);
    setClasses(tempClass);
    handleUpdate(tempClass);
  }
  let searchResult;
  let SearchDisplay;
  if (searchString) {
    searchResult = tailwindClasses.filter((item) =>
      item.includes(searchString)
    );
    SearchDisplay = searchResult.map((item) => (
      <div
        key={item}
        className="w-full h-8 rounded hover:bg-stone-400"
        onClick={() => {
          add(item);
          setSearchString("");
        }}
      >
        {item}
      </div>
    ));
  }
  const classesDisplay = classes.map((item) => (
    <div
      key={item}
      className="w-fit h-7 p-1 rounded shadow m-1 items-center flex"
    >
      <span>{item}</span>
      <div
        className="w-5 h-5 flex mx-2 rounded justify-center items-center  hover:bg-stone-700 hover:text-white"
        onClick={() => {
          remove(item);
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  ));
  return (
    <div className={props.className}>
      <div className="w-full min-h-9 h-fit border rounded border-stone-500 bg-stone-100 flex p-1 flex-wrap">
        {classesDisplay}
      </div>
      <div>
        <input
          type="text"
          className="w-full h-7 rounded border-stone-500 border mt-1"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
        {searchString ? (
          <div className="w-full max-h-96 overflow-y-auto float-end">
            {SearchDisplay}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
function CustomInput(props) {
  if (props.type === "text")
    return (
      <TextInput
        value={props.value ? props.value : ""}
        handleChange={props.handleChange}
      ></TextInput>
    );
  else if (props.type === "number")
    return (
      <NumberInput
        value={props.value ? props.value : ""}
        handleChange={props.handleChange}
      ></NumberInput>
    );
  else if (props.type === "color")
    return (
      <ColorInput
        value={props.value ? props.value : ""}
        handleChange={props.handleChange}
      ></ColorInput>
    );
  else if (props.type === "class") {
    return (
      <ClassInput
        value={props.value ? props.value : ""}
        handleChange={props.handleChange}
      ></ClassInput>
    );
  }
}
export default CustomInput;
