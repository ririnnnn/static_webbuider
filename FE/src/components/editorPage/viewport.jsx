function Viewport(props) {
  const scaleStyle = "scale(" + props.scale + ")";
  return (
    <div
      style={{
        top: props.y_offset,
        left: props.x_offset,
        width: props.width,
        height: props.height,
        transform: scaleStyle,
      }}
      className="border-2 border-stone-400 border-dashed relative min-h-10"
    >
      {props.children}
    </div>
  );
}
export default Viewport;
